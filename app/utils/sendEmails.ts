import { ServerClient } from 'postmark'
import { render } from '@react-email/render'
import { client } from '@/lib/client'
import { GET_EMAIL_TEMPLATES } from '@/lib/queries'
import WPEmailTemplate from '@/app/emails/WPEmailTemplate'
import { replacePlaceholders } from '@/app/utils/stringReplacement'
import React from 'react'

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

interface SendEmailsOptions {
    formType: string
    name: string
    email: string
    extraVars?: Record<string, string>
}

export const sendEmails = async ({ formType, name, email, extraVars = {} }: SendEmailsOptions): Promise<void> => {
    const postmark = new ServerClient(process.env.POSTMARK_API_KEY!)

    const formData = {
        ...extraVars,
        sender_name: name,
        sender_email: email,
    }

    const vars: Record<string, string> = {
        ...formData,
        site_name: process.env.WP_SITE_NAME!,
        site_url: process.env.WP_SITE_URL!,
        admin_email: process.env.POSTMARK_ADMIN_EMAIL!,
        site_report_link: extraVars.report_uuid
            ? `<a href="${process.env.NEXT_PUBLIC_SITE_URL}/report/site-report/${extraVars.report_uuid}">View your report</a>`
            : '',
    }

    const data = await client.request<EmailTemplateResponse>(GET_EMAIL_TEMPLATES)
    const formTemplates = data.emailTemplates.nodes.filter(
        t => t.emailTemplates.formType.includes(formType)
    )

    if (!formTemplates.length) {
        throw new Error(`No email templates found for form type: ${formType}`)
    }

    await Promise.all(
        formTemplates.map(async tpl => {
            const emailType = tpl.emailTemplates.emailType[0]
            const { stream, from } = streamMap[emailType]
            const to = emailType === 'admin' ? process.env.POSTMARK_ADMIN_EMAIL! : formData.sender_email
            const body = replacePlaceholders(tpl.emailTemplates.bodyContent, vars)
            const subject = replacePlaceholders(tpl.emailTemplates.subject, vars)
            const html = await render(React.createElement(WPEmailTemplate, { bodyContent: body, previewText: subject }))
            return postmark.sendEmail({
                From: from,
                To: to,
                Subject: subject,
                HtmlBody: html,
                MessageStream: stream,
            })
        })
    )
}
