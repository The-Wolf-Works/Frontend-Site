import {
    Html,
    Head,
    Body,
    Container,
    Section,
    Img,
    Text,
    Link,
    Hr,
    Font,
} from '@react-email/components'

interface EmailLayoutProps {
    children: React.ReactNode
    previewText?: string
}

const siteUrl = process.env.WP_SITE_URL ?? 'https://thewolf.works'
const logoUrl = process.env.LOGO_URL ?? 'https://mtcreative.dev/testing-site/wp-content/uploads/2026/03/logo.png'

export default function EmailLayout({ children, previewText }: EmailLayoutProps) {
    return (
        <Html lang="en">
            <Head>
                {previewText && (
                    <Font
                        fontFamily="Inter"
                        fallbackFontFamily="Arial"
                        webFont={{
                            url: 'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2',
                            format: 'woff2',
                        }}
                        fontWeight={400}
                        fontStyle="normal"
                    />
                )}
            </Head>
            <Body style={body}>

                {/* Wrapper */}
                <Container style={container}>

                    {/* Header */}
                    <Section style={header}>
                        <Img
                            src={logoUrl}
                            alt="The Wolf Works"
                            height={36}
                            style={logo}
                        />
                    </Section>

                    {/* Accent line */}
                    <Section style={accentLine} />

                    {/* Content */}
                    <Section style={content}>
                        {children}
                    </Section>

                    {/* Footer */}
                    <Hr style={divider} />
                    <Section style={footer}>
                        <Text style={footerText}>
                            The Wolf Works &mdash;{' '}
                            <Link href={siteUrl} style={footerLink}>
                                {siteUrl}
                            </Link>
                        </Text>
                        <Text style={footerMuted}>
                            You are receiving this email because you submitted a form on our website.
                        </Text>
                    </Section>

                </Container>
            </Body>
        </Html>
    )
}

// Styles
const body: React.CSSProperties = {
    backgroundColor: '#1a2228',
    fontFamily: 'Inter, Arial, sans-serif',
    margin: 0,
    padding: '40px 0',
}

const container: React.CSSProperties = {
    backgroundColor: '#263038',
    borderRadius: '12px',
    maxWidth: '560px',
    margin: '0 auto',
    overflow: 'hidden',
    border: '1px solid rgba(255,255,255,0.08)',
}

const header: React.CSSProperties = {
    padding: '28px 40px',
    backgroundColor: '#263038',
}

const logo: React.CSSProperties = {
    display: 'block',
}

const accentLine: React.CSSProperties = {
    height: '2px',
    background: 'linear-gradient(to right, transparent, #5EFC8D, transparent)',
    margin: 0,
    padding: 0,
}

const content: React.CSSProperties = {
    padding: '36px 40px',
    color: 'rgba(255,255,255,0.7)',
    fontSize: '15px',
    lineHeight: '1.6',
}

const divider: React.CSSProperties = {
    borderColor: 'rgba(255,255,255,0.08)',
    margin: '0 40px',
}

const footer: React.CSSProperties = {
    padding: '20px 40px 28px',
}

const footerText: React.CSSProperties = {
    color: 'rgba(255,255,255,0.4)',
    fontSize: '13px',
    margin: '0 0 4px',
}

const footerLink: React.CSSProperties = {
    color: '#5EFC8D',
    textDecoration: 'none',
}

const footerMuted: React.CSSProperties = {
    color: 'rgba(255,255,255,0.25)',
    fontSize: '12px',
    margin: 0,
}
