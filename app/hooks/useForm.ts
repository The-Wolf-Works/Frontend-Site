import { useState } from "react"
import { useGoogleReCaptcha } from "react-google-recaptcha-v3"

// Status types for form submission
type Status = 'idle' | 'loading' | 'success' | 'error'

// Interface for form options
interface UseFormOptions {
    initialValues: Record<string, string>
    formType: string
    extraData?: Record<string, string>
    requiredFields?: string[]
}

// Hook to handle form state and submission
export const useForm = ({ initialValues, formType, extraData, requiredFields }: UseFormOptions) => {
    const { executeRecaptcha } = useGoogleReCaptcha()
    const [form, setForm] = useState(initialValues)
    const [status, setStatus] = useState<Status>('idle')
    const [error, setError] = useState<string | null>(null)

    // Handle form input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setStatus('loading')
        setError(null)
        try {
            if (!executeRecaptcha) throw new Error('reCAPTCHA not ready')
            const recaptchaToken = await executeRecaptcha(formType)

            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...form,
                    ...extraData,
                    formType,
                    requiredFields,
                    recaptchaToken
                })
            })
            if (!res.ok) {
                const data = await res.json()
                throw new Error(data.error ?? 'Failed to submit form')
            }
            setStatus('success')
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred')
            setStatus('error')
        }
    }

    return {
        form,
        status,
        error,
        handleChange,
        handleSubmit
    }
}
