import { NextRequest, NextResponse } from "next/server"
import { wpFetch } from '@/lib/wp'
import { ReportStructuredData } from '@/lib/types'
import { normaliseDomain, ensureProtocol } from '@/app/utils/domain'

interface SavePublicReportPayload {
    domain: string
    reportData: ReportStructuredData
    freeSectionsConfig: string[] | null
}

/**
 * Saves a publicly-generated report to WordPress.
 * Stores the domain as the client identifier; name and email are
 * populated later when the visitor unlocks the full report.
 * @param req - { domain, reportData }
 * @returns { uuid }
 */
export const POST = async (req: NextRequest) => {
    try {
        const { domain, reportData, freeSectionsConfig }: SavePublicReportPayload = await req.json()

        if (!domain || !reportData) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
        }

        const clientName = normaliseDomain(domain)

        const uuid = crypto.randomUUID()

        const res = await wpFetch('/reports/save', {
            method: 'POST',
            body: JSON.stringify({
                report_data: reportData,
                client_name: clientName,
                client_email: '',
                client_domain: ensureProtocol(domain),
                uuid,
                prompt_id: 0,
                prompt_title: '',
                generate_pdf: false,
                report_type: 'public_free',
                free_sections_config: freeSectionsConfig ? JSON.stringify(freeSectionsConfig) : null,
            })
        })

        if (!res.ok) {
            const errorData = await res.json().catch(() => null)
            return NextResponse.json({ error: errorData?.message ?? 'Failed to save report' }, { status: 500 })
        }

        return NextResponse.json({ uuid })

    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Failed to save report' },
            { status: 500 }
        )
    }
}
