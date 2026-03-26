import EmailLayout from './layouts/EmailLayout'

interface WPEmailTemplateProps {
    bodyContent: string
    previewText?: string
}

export default function WPEmailTemplate({ bodyContent, previewText }: WPEmailTemplateProps) {
    return (
        <EmailLayout previewText={previewText}>
            <div dangerouslySetInnerHTML={{ __html: bodyContent }} />
        </EmailLayout>
    )
}
