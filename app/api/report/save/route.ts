import { NextRequest, NextResponse } from "next/server"
import { wpFetch } from '@/lib/wp'
import { ReportStructuredData } from '@/lib/types'

interface SaveReportPayload {
    reportData: ReportStructuredData
    clientName: string
    clientEmail: string
    clientDomain: string
    uuid: string
    promptId: number
    promptTitle: string
    generatePDF: boolean
    reportType?: 'internal' | 'public_free' | 'public_unlocked'
    freeSectionsConfig?: string[] | null
}

/**
  * Saves a generated report to WordPress
  * @param req - { reportData, clientName, clientEmail, clientDomain, uuid, promptId, generatePDF }
  * @returns { post_id, pdf_base64? }
 */
export const POST = async (req: NextRequest) => {
    try {
        const {
            reportData, clientName, clientEmail, clientDomain, uuid, promptId, promptTitle, generatePDF,
            reportType = 'internal', freeSectionsConfig = null
        }: SaveReportPayload = await req.json()

        if (!reportData || !clientName || !clientEmail || !clientDomain || !uuid || !promptId) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
        }

        const res = await wpFetch('/reports/save', {
            method: 'POST',
            body: JSON.stringify({
                report_data: reportData,
                client_name: clientName,
                client_email: clientEmail,
                client_domain: clientDomain,
                uuid,
                prompt_id: promptId,
                prompt_title: promptTitle,
                generate_pdf: generatePDF,
                report_type: reportType,
                free_sections_config: freeSectionsConfig ? JSON.stringify(freeSectionsConfig) : null
            })
        })

        if (!res.ok) {
            const errorData = await res.json().catch(() => null)
            return NextResponse.json({ error: errorData?.message ?? 'Failed to save report' }, { status: 500 })
        }

        const data = await res.json()
        return NextResponse.json(data)

    } catch  (error) {
        return NextResponse.json({ error: error instanceof Error ? error.message : 'Failed to save report' }, { status: 500 })
    }
}
