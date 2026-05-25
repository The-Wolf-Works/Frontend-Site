'use client'

import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'

// Provider for Google reCAPTCHA v3
export const RecaptchaProviderClient = ({ children }: { children: React.ReactNode }) => (
    <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}>
        {children}
    </GoogleReCaptchaProvider>
)

export default RecaptchaProviderClient
