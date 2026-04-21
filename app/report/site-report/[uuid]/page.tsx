import { notFound } from 'next/navigation'
import { wpFetch } from '@/lib/wp'
import { SiteReportResponse } from '@/lib/types'
import WolfScoreHero from '@/app/components/report/site-report/WolfScoreHero'
import WolfScoreDetails from '@/app/components/report/site-report/WolfScoreDetails'
import ExecutiveSummary from '@/app/components/report/site-report/ExecutiveSummary'
import QuickWin from '@/app/components/report/site-report/QuickWin'
import ConversionReadiness from '@/app/components/report/site-report/ConversionReadiness'
import SectionView from '@/app/components/report/site-report/SectionView'
import GetInTouch from '@/app/components/report/site-report/GetInTouch'

interface Props {
    params: Promise<{ uuid: string }>
}

const SiteReportPage = async ({ params }: Props) => {
    const { uuid } = await params

    const res = await wpFetch(`/reports/by-uuid/${uuid}`)

    if (!res.ok) {
        notFound()
    }

    const report: SiteReportResponse = await res.json()

    return (
        <div className="max-w-5xl mx-auto w-full px-6 py-10 flex flex-col gap-6">

            {/* Hero — wolf score + client info */}
            {report.wolf_score && (
                <WolfScoreHero
                    wolfScore={report.wolf_score}
                    clientName={report.client_name}
                    clientDomain={report.client_domain}
                />
            )}

            {/* Executive summary */}
            {report.executive_summary && (
                <ExecutiveSummary summary={report.executive_summary} />
            )}

            {/* Quick win + wolf score details side by side */}
            <div className="grid md:grid-cols-2 gap-6">
                {report.quick_win && (
                    <QuickWin quickWin={report.quick_win} />
                )}
                {report.wolf_score && (
                    <WolfScoreDetails wolfScore={report.wolf_score} />
                )}
            </div>

            {/* Conversion readiness */}
            {report.conversion_readiness && (
                <ConversionReadiness conversionReadiness={report.conversion_readiness} />
            )}

            {/* Section views */}
            <div className="grid md:grid-cols-3 gap-6">
                {report.accessibility_view && (
                    <SectionView label="Accessibility" content={report.accessibility_view} />
                )}
                {report.client_view && (
                    <SectionView label="Client View" content={report.client_view} />
                )}
                {report.revenue_view && (
                    <SectionView label="Revenue" content={report.revenue_view} />
                )}
            </div>

            {/* CTA */}
            <GetInTouch />
        </div>
    )
}

export default SiteReportPage
