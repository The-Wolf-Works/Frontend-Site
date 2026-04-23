import { client } from '@/lib/client'
import { GET_AI_REPORT_PROMPTS } from '@/lib/queries'
import { GetAiReportPromptsResponse } from '@/lib/types'
import ReportWizard from '@/app/components/report/report-generator/ReportWizard'

/**
 * Report page component
 * @returns Report page
 */
const ReportPage = async () => {

    try {
        const data = await client.request<GetAiReportPromptsResponse>(GET_AI_REPORT_PROMPTS)
        const prompts = data.aIReportPrompts?.nodes ?? []

        return (
            <div className="flex-1 flex flex-col items-center justify-center px-6">
                <div className="w-full max-w-3xl">
                    <ReportWizard prompts={prompts} />
                </div>
            </div>
        )
    } catch {
        return (
            <div className="flex-1 flex items-center justify-center">
                <p className="text-white/50 text-sm">Failed to load report prompts. Please try again.</p>
            </div>
        )
    }
}

export default ReportPage
