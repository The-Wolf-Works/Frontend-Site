import { notFound } from 'next/navigation'
import { wpFetch } from '@/lib/wp'
import { client } from '@/lib/client'
import { GET_TESTIMONIALS, GET_SERVICE_PACKAGES } from '@/lib/queries'
import { SiteReportResponse, GetTestimonialsResponse, GetServicePackagesResponse } from '@/lib/types'
import HeroSection from '@/app/components/report/site-report/sections/HeroSection'
import WolfScoreSection from '@/app/components/report/site-report/sections/WolfScoreSection'
import ConversionSection from '@/app/components/report/site-report/sections/ConversionSection'
import PillarsSection from '@/app/components/report/site-report/sections/PillarsSection'
import RedFlagsSection from '@/app/components/report/site-report/sections/RedFlagsSection'
import QuickWinSection from '@/app/components/report/site-report/sections/QuickWinSection'
import NextSteps from '@/app/components/report/site-report/sections/NextSteps'
import TestimonialsSection from '@/app/components/report/site-report/sections/TestimonialsSection'
import ReportProgress from '@/app/components/report/site-report/ReportProgress'

interface Props {
    params: Promise<{ uuid: string }>
}

const SiteReportPage = async ({ params }: Props) => {
    const { uuid } = await params

    const [res, testimonialsData, packagesData] = await Promise.all([
        wpFetch(`/reports/by-uuid/${uuid}`),
        client.request<GetTestimonialsResponse>(GET_TESTIMONIALS).catch(() => null),
        client.request<GetServicePackagesResponse>(GET_SERVICE_PACKAGES).catch(() => null),
    ])

    if (!res.ok) notFound()

    const report: SiteReportResponse = await res.json()
    const testimonials = testimonialsData?.testimonials.nodes.map(n => n.testimonials) ?? []
    const packages = packagesData?.servicePackages.nodes ?? []

    const score = report.wolf_score?.score ?? 0

    return (
        <>
        <ReportProgress />
        <div className="bg-brand-secondary">
            <HeroSection
                clientName={report.client_name}
                clientDomain={report.client_domain}
                reportDate={report.report_generated_at}
                reportType={report.report_prompt_title}
            />

            <WolfScoreSection
                score={score}
                summary={report.wolf_score.summary}
                executiveSummary={report.executive_summary}
            />

            {report.conversion_readiness && (
                <ConversionSection data={report.conversion_readiness} />
            )}

            {report.accessibility_view && report.client_view && report.revenue_view && (
                <PillarsSection
                    accessibilityView={report.accessibility_view}
                    clientView={report.client_view}
                    revenueView={report.revenue_view}
                />
            )}

            {(report.wolf_score?.red_flags?.length || report.wolf_score?.leaky_bucket) && (
                <RedFlagsSection
                    redFlags={report.wolf_score.red_flags ?? []}
                    leakyBucket={report.wolf_score.leaky_bucket ?? ''}
                />
            )}

            {report.quick_win && report.wolf_score?.recommendation && (
                <QuickWinSection
                    quickWin={report.quick_win}
                    recommendation={report.wolf_score.recommendation}
                    strategicPivot={report.wolf_score.strategic_pivot}
                />
            )}

            <NextSteps packages={packages} />

            <TestimonialsSection testimonials={testimonials} />
        </div>
        </>
    )
}

export default SiteReportPage
