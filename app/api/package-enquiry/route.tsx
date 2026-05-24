import { NextRequest, NextResponse } from 'next/server'
import { ServerClient } from 'postmark'
import { render } from '@react-email/render'
import { client } from '@/lib/client'
import { GET_EMAIL_TEMPLATES } from '@/lib/queries'
import WPEmailTemplate from '@/app/emails/WPEmailTemplate'
import { replacePlaceholders } from '@/app/utils/stringReplacement'
import { wpFetch } from '@/lib/wp'

interface EmailTemplates {
    slug: string
    emailTemplates: {
        subject: string
        bodyContent: string
        formType: string[]
        emailType: string[]
    }
}

interface EmailTemplateResponse {
    emailTemplates: {
        nodes: EmailTemplates[]
    }
}

export const POST = async (req: NextRequest) => {
  try {
    const postmark = new ServerClient(process.env.POSTMARK_API_KEY!)
    const {
        packageTitle,
        packagePrice,
        billingType,
        ctaBehaviour,
        reportUuid,
        packageId,
        clientName,
        clientEmail,
        clientDomain,
        phone,
        comments,
    } = await req.json()

    if (!packageTitle || !ctaBehaviour || !clientEmail) {
        return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 })
    }

    const formType = `package-enquiry-${ctaBehaviour}`

    const reportUrl = reportUuid
        ? `${process.env.NEXT_PUBLIC_SITE_URL}/report/site-report/${reportUuid}`
        : ''

    const vars: Record<string, string> = {
        package_name:    packageTitle,
        package_price:   packagePrice ? `${packagePrice}` : 'Free',
        billing_type:    billingType ?? '',
        client_name:     clientName ?? '',
        client_email:    clientEmail,
        client_domain:   clientDomain ?? '',
        phone:           phone ?? '',
        comments:        comments ?? '',
        report_url:      reportUrl,
        report_link:     reportUrl ? `<a href="${reportUrl}">View Report</a>` : '',
        site_name:       process.env.WP_SITE_NAME!,
        site_url:        process.env.WP_SITE_URL!,
        admin_email:     process.env.POSTMARK_ADMIN_EMAIL!,
    }

    const streamMap: Record<string, { stream: string; from: string }> = {
        confirmation: {
            stream: process.env.POSTMARK_STREAM_GENERAL!,
            from: process.env.POSTMARK_FROM_GENERAL!,
        },
        admin: {
            stream: process.env.POSTMARK_STREAM_ENQUIRIES!,
            from: process.env.POSTMARK_FROM_ADMIN!,
        },
        report: {
            stream: process.env.POSTMARK_STREAM_REPORTS!,
            from: process.env.POSTMARK_FROM_REPORTS!,
        },
    }

    // Try to fetch the report PDF — non-blocking, skipped if unavailable
    let pdfAttachment: { Name: string; Content: string; ContentType: string; ContentID: string } | null = null
    if (reportUuid) {
        try {
            const pdfRes = await wpFetch(`/reports/pdf-by-uuid/${reportUuid}`)
            if (pdfRes.ok) {
                const pdfData = await pdfRes.json()
                if (pdfData.pdf_base64) {
                    pdfAttachment = {
                        Name: pdfData.filename ?? 'site-report.pdf',
                        Content: pdfData.pdf_base64,
                        ContentType: 'application/pdf',
                        ContentID: '',
                    }
                }
            }
        } catch {
            // No PDF available — continue without attachment
        }
    }

    const data = await client.request<EmailTemplateResponse>(GET_EMAIL_TEMPLATES)
    const formTemplates = data.emailTemplates.nodes.filter(
        t => t.emailTemplates.formType.includes(formType)
    )

    if (!formTemplates.length) {
        return NextResponse.json({ error: 'No email template found for this enquiry type.' }, { status: 500 })
    }

    await Promise.all(
        formTemplates.map(async tpl => {
            const emailType = tpl.emailTemplates.emailType[0]
            const { stream, from } = streamMap[emailType]
            const to = emailType === 'admin' ? process.env.POSTMARK_ADMIN_EMAIL! : clientEmail
            const body = replacePlaceholders(tpl.emailTemplates.bodyContent, vars)
            const subject = replacePlaceholders(tpl.emailTemplates.subject, vars)
            const html = await render(<WPEmailTemplate bodyContent={body} previewText={subject} />)
            console.log('[package-enquiry] sending email', { emailType, from, to, stream })
            return postmark.sendEmail({
                From: from,
                To: to,
                Subject: subject,
                HtmlBody: html,
                MessageStream: stream,
            })
        })
    )

    // Record the action against the report — non-blocking
    if (reportUuid && packageId) {
        wpFetch('/reports/action-package', {
            method: 'POST',
            body: JSON.stringify({ uuid: reportUuid, package_id: Number(packageId) }),
        }).catch(() => {})
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[package-enquiry]', err)
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 })
  }
}
