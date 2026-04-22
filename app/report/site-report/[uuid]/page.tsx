import { notFound } from 'next/navigation'
import { wpFetch } from '@/lib/wp'
import { SiteReportResponse } from '@/lib/types'
import {
    ExclamationTriangleIcon,
    SparklesIcon,
    BeakerIcon,
    ArrowPathIcon,
} from '@heroicons/react/24/outline'
import ScoreRing from '@/app/components/report/site-report/ScoreRing'
import ConversionBars from '@/app/components/report/site-report/ConversionBars'
import ExpandableText from '@/app/components/report/site-report/ExpandableText'
import PillarsSection from '@/app/components/report/site-report/PillarsSection'
import NextSteps from '@/app/components/report/site-report/NextSteps'

interface Props {
    params: Promise<{ uuid: string }>
}


const resolveColor = (color: string) =>
    color === 'brand-primary' ? '#5EFC8D'
    : color === 'brand-accent' ? '#00cfe0'
    : color === 'red' ? '#f87171'
    : color === 'amber' ? '#f59e0b'
    : color

const SectionLabel = ({ label, color = 'brand-primary' }: { label: string; color?: string }) => {
    const c = resolveColor(color)
    return (
        <div className="flex items-center gap-2.5">
            <div className="h-3.5 w-0.5 rounded-full shrink-0" style={{ backgroundColor: c }} />
            <p className="text-xs font-semibold tracking-widest uppercase leading-none" style={{ color: c }}>
                {label}
            </p>
        </div>
    )
}

const SiteReportPage = async ({ params }: Props) => {
    const { uuid } = await params

    const res = await wpFetch(`/reports/by-uuid/${uuid}`)

    if (!res.ok) notFound()

    const report: SiteReportResponse = await res.json()

    const score = report.wolf_score?.score ?? 0

    const scoreHue = score < 50
        ? (score / 50) * 30
        : 30 + ((score - 50) / 50) * 110
    const scoreColor = `hsl(${scoreHue}, 85%, 60%)`
    const scoreGlow = `hsla(${scoreHue}, 85%, 60%, 0.15)`

    return (
        <div className="min-h-screen bg-brand-secondary p-2">
            <div
                className="min-h-[calc(100vh-16px)] border border-white/10 rounded-2xl overflow-hidden flex flex-col"
                style={{ background: 'linear-gradient(135deg, #263038 0%, #1e272e 60%, #1a2328 100%)' }}
            >
                {/* ── HEADER ───────────────────────────────────────────── */}
                <header className="relative border-b border-white/10 px-6 py-5">
                    {/* Radial glow behind score ring */}
                    <div
                        className="absolute left-0 top-0 w-64 h-full pointer-events-none"
                        style={{ background: `radial-gradient(ellipse at 60px 50%, ${scoreGlow} 0%, transparent 70%)` }}
                    />

                    <div className="relative flex items-center gap-7">
                        {/* Score ring */}
                        <ScoreRing score={score} scoreGlow={scoreGlow} />

                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold tracking-widest uppercase text-brand-primary mb-1">Site Report</p>
                            <h1 className="text-3xl font-extrabold text-white leading-tight mb-1">{report.client_name}</h1>
                            <p className="text-white/35 text-sm mb-3">{report.client_domain}</p>
                            {report.executive_summary && (
                                <ExpandableText
                                    text={report.executive_summary}
                                    lines={2}
                                    className="text-white/55 text-sm leading-relaxed"
                                />
                            )}
                        </div>
                    </div>
                </header>

                {/* ── MAIN GRID ────────────────────────────────────────── */}
                <div className="flex-1 grid grid-cols-3 gap-3 p-3 min-h-0">

                    {/* ── COL 1: Quick win + Red flags ─────────────────── */}
                    <div className="flex flex-col gap-3">

                        {report.quick_win && (
                            <div className="rounded-xl border border-white/10 p-6" style={{ background: 'linear-gradient(135deg, rgba(94,252,141,0.05) 0%, transparent 55%)' }}>
                                <div className="flex items-center gap-2.5 mb-4">
                                    <SparklesIcon className="w-4 h-4 text-brand-primary shrink-0" />
                                    <SectionLabel label="Quick Win" color="brand-primary" />
                                </div>
                                <h3 className="text-white font-bold text-lg leading-snug mb-2">{report.quick_win.title}</h3>
                                <p className="text-white/65 text-sm leading-relaxed">{report.quick_win.description}</p>
                            </div>
                        )}

                        {report.wolf_score?.red_flags && report.wolf_score.red_flags.length > 0 && (
                            <div className="rounded-xl border border-white/10 p-6 flex-1" style={{ background: 'rgba(255,255,255,0.02)' }}>
                                <div className="flex items-center gap-2.5 mb-4">
                                    <ExclamationTriangleIcon className="w-4 h-4 text-red-400 shrink-0" />
                                    <SectionLabel label="Red Flags" color="red" />
                                </div>
                                <ul className="flex flex-col gap-2">
                                    {report.wolf_score.red_flags.map((flag, i) => (
                                        <li key={i} className="flex items-start gap-2.5 bg-red-500/[0.07] border border-red-500/15 rounded-lg px-3 py-2.5">
                                            <span className="text-red-400 shrink-0 mt-0.5 text-sm">✕</span>
                                            <span className="text-white/70 text-sm leading-relaxed">{flag}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* ── COL 2: Conversion + Leaky bucket + Recommendation */}
                    <div className="flex flex-col gap-3">

                        {report.conversion_readiness && (
                            <div className="rounded-xl border border-white/10 p-6" style={{ background: 'rgba(255,255,255,0.02)' }}>
                                <div className="flex items-center gap-2.5 mb-4">
                                    <BeakerIcon className="w-4 h-4 text-brand-primary shrink-0" />
                                    <SectionLabel label="Conversion Readiness" color="brand-primary" />
                                </div>
                                <ConversionBars data={report.conversion_readiness} />
                            </div>
                        )}

                        {report.wolf_score?.leaky_bucket && (
                            <div className="rounded-xl border border-white/10 p-6" style={{ background: 'rgba(255,255,255,0.02)' }}>
                                <div className="mb-4">
                                    <SectionLabel label="Leaky Bucket" color="#6b7280" />
                                </div>
                                <p className="text-white/65 text-sm leading-relaxed">{report.wolf_score.leaky_bucket}</p>
                            </div>
                        )}

                        {report.wolf_score?.recommendation && (
                            <div className="rounded-xl border border-white/10 p-6 flex-1" style={{ background: 'linear-gradient(135deg, rgba(94,252,141,0.04) 0%, transparent 65%)' }}>
                                <div className="mb-4">
                                    <SectionLabel label="Recommendation" color="brand-primary" />
                                </div>
                                <p className="text-white/70 text-sm leading-relaxed">{report.wolf_score.recommendation}</p>
                            </div>
                        )}
                    </div>

                    {/* ── COL 3: Three pillars ─────────────────────────── */}
                    {report.accessibility_view && report.client_view && report.revenue_view && (
                        <PillarsSection
                            accessibilityView={report.accessibility_view}
                            clientView={report.client_view}
                            revenueView={report.revenue_view}
                        />
                    )}
                </div>

                {/* ── NEXT STEPS ───────────────────────────────────────── */}
                <NextSteps />

                {/* ── FOOTER ───────────────────────────────────────────── */}
                {report.wolf_score?.strategic_pivot && (
                    <footer className="border-t border-white/10 px-6 py-3 flex items-center gap-3">
                        <ArrowPathIcon className="w-3.5 h-3.5 text-white/25 shrink-0" />
                        <p className="text-xs font-semibold tracking-widest uppercase text-white/25 shrink-0">Strategic Pivot</p>
                        <p className="text-white/40 text-xs leading-relaxed line-clamp-1 flex-1">{report.wolf_score.strategic_pivot}</p>
                    </footer>
                )}
            </div>
        </div>
    )
}

export default SiteReportPage
