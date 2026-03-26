import { NextRequest, NextResponse } from 'next/server'
import { ServerClient } from 'postmark'
import { render } from '@react-email/render'
import { client } from '@/lib/client'
import { GET_EMAIL_TEMPLATES } from '@/lib/queries'
import WPEmailTemplate from '@/app/emails/WPEmailTemplate'

const postmark = new ServerClient(process.env.POSTMARK_API_KEY!)

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

// Replace placeholders in text with values from vars
const replacePlaceholders = (text: string, vars: Record<string, string>): string => {
    return Object.entries(vars).reduce(
        (str, [key, value]) => str.replaceAll(`{${key}}`, value),
        text
    )
}

// Verify reCAPTCHA token via Google's reCAPTCHA API
const verifyRecaptcha = async (token: string): Promise<boolean> => {

    // Skip verification in development
    if (process.env.NODE_ENV === 'development') return true

    const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`
    })
    const data = await res.json()
    return data.success && data.score >= 0.5
}

// Send email using Postmark
export const POST = async (req: NextRequest) => {
    const { formType, requiredFields, recaptchaToken, name, email, ...rest } = await req.json()

    const formData = {
        ...rest,
        sender_name: name ?? '',
        sender_email: email ?? '',
    }

    if (!formType) {
        return NextResponse.json({ error: 'Missing form type.' }, { status: 400 })
    }

    // Verify reCAPTCHA token
    const isHuman = await verifyRecaptcha(recaptchaToken)
    if (!isHuman) {
        return NextResponse.json({ error: 'Failed spam check.' }, { status: 400 })
    }

    if (requiredFields?.length) {
        const missingFields = requiredFields.filter((field: string) => !formData[field])
        if (missingFields.length) {
            return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 })
        }
    }

    // Prepare variables for email template replacement
    const vars: Record<string, string> = {
        ...formData,
        site_name: process.env.WP_SITE_NAME!,
        site_url: process.env.WP_SITE_URL!,
        admin_email: process.env.POSTMARK_ADMIN_EMAIL!
    }

    // Map email types to streams and from addresses
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

    // Get email templates from WordPress
    const data = await client.request<EmailTemplateResponse>(GET_EMAIL_TEMPLATES)
    const formTemplates = data.emailTemplates.nodes.filter(
        t => t.emailTemplates.formType.includes(formType)
    )

    // Check if any templates were found
    if(!formTemplates.length) {
        return NextResponse.json({ error: 'No email template found for this form type' }, { status: 500 })
    }

    // Send emails using Postmark
    await Promise.all(
        formTemplates.map(async tpl => {
            const emailType = tpl.emailTemplates.emailType[0]
            const { stream, from } = streamMap[emailType]
            const to = emailType === 'admin' ? process.env.POSTMARK_ADMIN_EMAIL! : formData.sender_email
            const body = replacePlaceholders(tpl.emailTemplates.bodyContent, vars)
            const subject = replacePlaceholders(tpl.emailTemplates.subject, vars)
            const html = await render(<WPEmailTemplate bodyContent={body} previewText={subject} />)
            return postmark.sendEmail({
                From: from,
                To: to,
                Subject: subject,
                HtmlBody: html,
                MessageStream: stream
            })
        })
    )

    // Return success response
    return NextResponse.json({ success: true })
}
