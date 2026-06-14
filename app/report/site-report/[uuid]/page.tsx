import { notFound } from 'next/navigation'
import { wpFetch } from '@/lib/wp'
import { client } from '@/lib/client'
import { GET_TESTIMONIALS, GET_SERVICE_PACKAGES } from '@/lib/queries'
import { SiteReportResponse, GetTestimonialsResponse, GetServicePackagesResponse, ProgressSection } from '@/lib/types'
import HeroSection from '@/app/components/report/site-report/sections/HeroSection'
import WolfScoreSection from '@/app/components/report/site-report/sections/WolfScoreSection'
import ConversionSection from '@/app/components/report/site-report/sections/ConversionSection'
import PillarsSection from '@/app/components/report/site-report/sections/PillarsSection'
import RedFlagsSection from '@/app/components/report/site-report/sections/RedFlagsSection'
import QuickWinSection from '@/app/components/report/site-report/sections/QuickWinSection'
import AiEdgeSection from '@/app/components/report/site-report/sections/AiEdgeSection'
import NextSteps from '@/app/components/report/site-report/sections/NextSteps'
import TestimonialsSection from '@/app/components/report/site-report/sections/TestimonialsSection'
import ReportProgress from '@/app/components/report/site-report/ReportProgress'
import LockedSection from '@/app/components/report/site-report/LockedSection'
import UnlockOverlay from '@/app/components/report/site-report/UnlockOverlay'

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
    const testimonials = testimonialsData?.testimonials.nodes.map(n => ({
        clientName: n.title,
        photo: n.featuredImage ?? null,
        quote: n.testimonials.quote,
        businessType: n.testimonials.businessType ?? '',
        company: n.testimonials.company ?? '',
        reviewDate: n.testimonials.reviewDate ?? '',
    })) ?? []
    const packages = packagesData?.servicePackages.nodes ?? []

    const score = report.wolf_score?.score ?? 0

    // Gating — only applies to public_free reports.
    // For internal and public_unlocked, isFree always returns true so the page
    // renders identically to before this change.
    // Locked section data is never passed to render components — LockedSection
    // is a placeholder only and receives no report data.
    const isPublicFree = report.report_type === 'public_free'
    const freeSections = report.free_sections_config ?? []
    const isFree = (key: string) => !isPublicFree || freeSections.includes(key)

    // Keys present in SiteReportResponse that are NOT renderable sections.
    // executive_summary renders inside wolf_score; report_html is raw markup.
    // WP meta fields are excluded by being absent from ReportStructuredData.
    const NON_SECTION_KEYS = new Set(['executive_summary', 'report_html',
        'client_name', 'client_email', 'client_domain', 'report_generated_at',
        'report_prompt_title', 'actioned_packages', 'report_type', 'free_sections_config'])

    // Derive nav label from key: split on underscore, capitalise each word.
    // Handles common acronyms (AI, SEO, URL) correctly.
    const ACRONYMS = new Set(['ai', 'seo', 'url'])
    const toLabel = (key: string) =>
        key.split('_').map(w => ACRONYMS.has(w) ? w.toUpperCase() : w.charAt(0).toUpperCase() + w.slice(1)).join(' ')

    // Build progress nav from actual report keys — any key not in the exclusion list
    // and present in the data is treated as a section. next_steps is always appended
    // (UI-only, not an AI data key).
    const progressSections: ProgressSection[] = [
        ...Object.keys(report)
            .filter(key => !NON_SECTION_KEYS.has(key) && report[key as keyof SiteReportResponse] != null)
            .map(key => ({
                id:     key.replace(/_/g, '-'),
                label:  toLabel(key),
                locked: !isFree(key),
            })),
        { id: 'next-steps', label: 'Next Steps', locked: !isFree('next_steps') },
    ]

    return (
        <>
        <ReportProgress sections={progressSections} />
        <div className="bg-brand-secondary overflow-x-hidden">

            {/* HeroSection — always visible */}
            <HeroSection
                clientName={report.client_name || report.client_domain}
                clientDomain={report.client_domain}
                reportDate={report.report_generated_at}
                reportType={report.report_prompt_title}
            />

            {/* Wolf Score */}
            {isFree('wolf_score') ? (
                <WolfScoreSection
                    score={score}
                    summary={report.wolf_score.summary}
                    executiveSummary={isFree('executive_summary') ? report.executive_summary : null}
                />
            ) : (
                <LockedSection id="wolf-score" sectionKey="wolf_score" />
            )}

            {/* Executive Summary as standalone locked section —
                only shown when wolf_score is free but executive_summary is locked */}
            {isFree('wolf_score') && !isFree('executive_summary') && (
                <LockedSection sectionKey="executive_summary" />
            )}

            {/* Conversion Readiness */}
            {report.conversion_readiness && (
                isFree('conversion_readiness') ? (
                    <ConversionSection data={report.conversion_readiness} />
                ) : (
                    <LockedSection id="conversion-readiness" sectionKey="conversion" />
                )
            )}

            {/* Three Pillars */}
            {report.pillars && (
                isFree('pillars') ? (
                    <PillarsSection data={report.pillars} />
                ) : (
                    <LockedSection id="pillars" sectionKey="pillars" />
                )
            )}

            {/* Red Flags */}
            {report.red_flags && (
                isFree('red_flags') ? (
                    <RedFlagsSection data={report.red_flags} />
                ) : (
                    <LockedSection id="red-flags" sectionKey="red_flags" />
                )
            )}

            {/* Quick Win */}
            {report.quick_win && report.wolf_score?.recommendation && (
                isFree('quick_win') ? (
                    <QuickWinSection
                        quickWin={report.quick_win}
                        recommendation={report.wolf_score.recommendation}
                        strategicPivot={report.wolf_score.strategic_pivot}
                    />
                ) : (
                    <LockedSection id="quick-win" sectionKey="quick_win" />
                )
            )}

            {/* AI Edge */}
            {report.ai_edge && (
                isFree('ai_edge') ? (
                    <AiEdgeSection data={report.ai_edge} />
                ) : (
                    <LockedSection id="ai-edge" sectionKey="ai_edge" />
                )
            )}

            {/* Next Steps */}
            {isFree('next_steps') ? (
                <NextSteps
                    packages={packages}
                    reportUuid={uuid}
                    clientName={report.client_name}
                    clientEmail={report.client_email}
                    clientDomain={report.client_domain}
                    actionedPackages={report.actioned_packages ?? []}
                />
            ) : (
                <LockedSection id="next-steps" sectionKey="next_steps" />
            )}

            <TestimonialsSection testimonials={testimonials} />
        </div>

        {isPublicFree && <UnlockOverlay uuid={uuid} clientDomain={report.client_domain} />}
        </>
    )
}

export default SiteReportPage
