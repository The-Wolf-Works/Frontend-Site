import { NextRequest, NextResponse } from "next/server"
import { wpFetch } from '@/lib/wp'

/**
 * Unlocks a public_free report by writing the lead's name and email
 * and flipping report_type to public_unlocked in WordPress.
 * @param req - { uuid, clientName, clientEmail }
 * @returns { success: true }
 */
export const POST = async (req: NextRequest) => {
    try {
        const { uuid, clientName, clientEmail } = await req.json()

        if (!uuid || !clientName || !clientEmail) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
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

        return NextResponse.json({ success: true })

    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Failed to unlock report' },
            { status: 500 }
        )
    }
}
