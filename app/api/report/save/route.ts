import { NextRequest, NextResponse } from "next/server"
import { wpFetch } from '@/lib/wp'

interface SaveReportPayload {
    html: string
    clientName: string
    clientEmail: string
    clientDomain: string
    uuid: string
    promptId: number
    generatePDF: boolean
}

/**
  * Saves a generated report to WordPress
  * @param req - { html, clientName, clientEmail, clientDomain, uuid, promptId, generatePDF }
  * @returns { post_id, pdf_base64? }
 */
export const POST = async (req: NextRequest) => {
    try {
        const {
            html, clientName, clientEmail, clientDomain, uuid, promptId, generatePDF }: SaveReportPayload = await req.json()

        if (!html || !clientName || !clientEmail || !clientDomain || !uuid || !promptId) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
        }

        const res = await wpFetch('/reports/save', {
            method: 'POST',
            body: JSON.stringify({
                html,
                client_name: clientName,
                client_email: clientEmail,
                client_domain: clientDomain,
                uuid,
                prompt_id: promptId,
                generate_pdf: generatePDF
            })
        })

        if (!res.ok) {
            const errorData = await res.json().catch(() => null)
            console.log('WP save error:', errorData)
            return NextResponse.json({ error: errorData?.message ?? 'Failed to save report' }, { status: 500 })
        }

        const data = await res.json()
        return NextResponse.json(data)

    } catch  (error) {
        return NextResponse.json({ error: error instanceof Error ? error.message : 'Failed to save report' }, { status: 500 })
    }
}
