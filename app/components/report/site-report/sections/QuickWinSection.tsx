'use client'

import { icons } from '@/app/components/icons/Icons'
import SectionLabel from '../SectionLabel'
import DotGrid from '@/app/components/common/DotGrid'
import useScrollInView from '@/app/hooks/useScrollInView'

interface Props {
    quickWin: { title: string; description: string }
    recommendation: string
    strategicPivot?: string
}

/**
 * Two-column section presenting the single highest-impact action for the client.
 * Left column: the quick win card (title + description).
 * Right column: recommendation and optional strategic pivot stacked vertically.
 *
 * @param quickWin.title       - Short name of the recommended action.
 * @param quickWin.description - Explanation of what to do and why.
 * @param recommendation       - Broader strategic recommendation to accompany the quick win.
 * @param strategicPivot       - Optional longer-term pivot suggestion shown below the recommendation.
 */
const QuickWinSection = ({ quickWin, recommendation, strategicPivot }: Props) => {
    const { ref, fadeUp } = useScrollInView()

    return (
        <section ref={ref} id="quick-win" className="min-h-screen flex flex-col border-t border-white/10 px-10 md:px-16 py-16 relative">

            {/* Background */}
            <DotGrid />
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 0% 0%, rgba(94,252,141,0.08) 0%, transparent 55%)' }} />
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 100% 100%, rgba(0,207,224,0.06) 0%, transparent 50%)' }} />

            <div className="relative flex flex-col justify-between flex-1 gap-10 max-w-5xl mx-auto w-full">

                {/* Header */}
                <div className="flex flex-col gap-3" style={fadeUp(0)}>
                    <SectionLabel label="Quick Win" />
                    <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
                        One thing you can do<br />this week.
                    </h2>
                    <p className="text-white/40 text-sm font-light tracking-wide max-w-md">
                        The highest-impact change you can make right now — before anything else.
                    </p>
                </div>

                {/* Two column layout */}
                <div className="flex flex-col md:flex-row gap-8 md:gap-10 flex-1" style={fadeUp(100)}>

                    {/* Left — Quick win card */}
                    <div
                        className="relative rounded-2xl border border-brand-primary/20 p-6 md:p-8 overflow-hidden flex flex-col gap-5 md:flex-1"
                        style={{ background: 'rgba(94,252,141,0.03)' }}
                    >
                        <div className="absolute top-0 left-12 right-12 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(94,252,141,0.5), transparent)' }} />
                        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 0% 50%, rgba(94,252,141,0.06) 0%, transparent 60%)' }} />

                        <div className="relative flex flex-col gap-5">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center shrink-0">
                                    <icons.sparkles className="w-5 h-5 text-brand-primary" />
                                </div>
                                <SectionLabel label="Your Quick Win" />
                            </div>
                            <h3 className="text-white text-xl md:text-2xl font-bold leading-snug">{quickWin.title}</h3>
                            <p className="text-white/65 text-base leading-relaxed">{quickWin.description}</p>
                        </div>
                    </div>

                    {/* Right — Recommendation + Strategic Pivot stacked */}
                    <div className="flex flex-col gap-6 md:w-2/5 shrink-0">

                        {recommendation && (
                            <div className="flex gap-5 flex-1">
                                <div className="w-1 rounded-full shrink-0 self-stretch" style={{ background: 'linear-gradient(to bottom, rgba(94,252,141,0.6), transparent)' }} />
                                <div className="flex flex-col gap-3 py-1">
                                    <div className="flex items-center gap-2.5">
                                        <icons.lightBulb className="w-4 h-4 text-brand-primary/60 shrink-0" />
                                        <SectionLabel label="Recommendation" />
                                    </div>
                                    <p className="text-white/60 text-base leading-relaxed">{recommendation}</p>
                                </div>
                            </div>
                        )}

                        {strategicPivot && (
                            <div className="flex gap-5 flex-1">
                                <div className="w-1 rounded-full shrink-0 self-stretch" style={{ background: 'linear-gradient(to bottom, rgba(0,207,224,0.6), transparent)' }} />
                                <div className="flex flex-col gap-3 py-1">
                                    <div className="flex items-center gap-2.5">
                                        <icons.arrowPath className="w-4 h-4 text-brand-accent/60 shrink-0" />
                                        <SectionLabel label="Strategic Pivot" color="brand-accent" />
                                    </div>
                                    <p className="text-white/60 text-base leading-relaxed">{strategicPivot}</p>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </section>
    )
}

export default QuickWinSection
