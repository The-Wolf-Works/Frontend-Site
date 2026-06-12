/**
 * Verifies a reCAPTCHA v3 token via Google's siteverify API.
 * Returns true in development to avoid requiring a real token locally.
 */
export const verifyRecaptcha = async (token: string): Promise<boolean> => {
    if (process.env.NODE_ENV === 'development') return true

    const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
    })
    const data = await res.json()
    return data.success && data.score >= 0.5
}
