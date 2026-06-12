import { NextRequest, NextResponse } from "next/server"
import { wpFetch } from '@/lib/wp'
import { verifyRecaptcha } from '@/app/utils/recaptcha'
import { sendEmails } from '@/app/utils/sendEmails'

/**
 * Unlocks a public_free report by writing the lead's name and email
 * and flipping report_type to public_unlocked in WordPress.
 * On success, fires confirmation + admin emails via /api/contact.
 * @param req - { uuid, clientName, clientEmail, clientDomain }
 * @returns { success: true }
 */
export const POST = async (req: NextRequest) => {
    try {
        const { uuid, clientName, clientEmail, clientDomain, recaptchaToken } = await req.json()

        if (!uuid || !clientName || !clientEmail) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
        }

        const isHuman = await verifyRecaptcha(recaptchaToken ?? '')
        if (!isHuman) {
            return NextResponse.json({ error: 'Failed spam check.' }, { status: 400 })
        }

        const res = await wpFetch('/reports/unlock-report', {
            method: 'POST',
            body: JSON.stringify({
                uuid,
                client_name: clientName,
                client_email: clientEmail,
            })
        })

        if (!res.ok) {
            const errorData = await res.json().catch(() => null)
            return NextResponse.json({ error: errorData?.message ?? 'Failed to unlock report' }, { status: 500 })
        }

        // Fire emails directly — no HTTP hop needed
        await sendEmails({
            formType: 'public-report',
            name: clientName,
            email: clientEmail,
            extraVars: {
                client_domain: clientDomain ?? '',
                report_uuid: uuid,
            },
        }).catch(err => console.error('[unlock] email send failed:', err))

        return NextResponse.json({ success: true })

    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Failed to unlock report' },
            { status: 500 }
        )
    }
}
