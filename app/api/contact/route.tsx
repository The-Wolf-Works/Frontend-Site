import { NextRequest, NextResponse } from 'next/server'
import { verifyRecaptcha } from '@/app/utils/recaptcha'
import { sendEmails } from '@/app/utils/sendEmails'

// Send email using Postmark
export const POST = async (req: NextRequest) => {
  try {
    const { formType, requiredFields, recaptchaToken, name, email, ...rest } = await req.json()

    const formData = {
        ...rest,
        sender_name: name ?? '',
        sender_email: email ?? '',
    }

    if (!formType) {
        return NextResponse.json({ error: 'Missing form type.' }, { status: 400 })
    }

    // Skip reCAPTCHA for internal form types (server-to-server calls)
    const internalFormTypes = ['report', 'public-report']
    if (!internalFormTypes.includes(formType)) {
        const isHuman = await verifyRecaptcha(recaptchaToken)
        if (!isHuman) {
            return NextResponse.json({ error: 'Failed spam check.' }, { status: 400 })
        }
    }

    if (requiredFields?.length) {
        const missingFields = requiredFields.filter((field: string) => !formData[field])
        if (missingFields.length) {
            return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 })
        }
    }

    await sendEmails({ formType, name: name ?? '', email: email ?? '', extraVars: rest })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[contact]', err)
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 })
  }
}
