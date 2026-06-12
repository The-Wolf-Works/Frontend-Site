'use client'

import SectionLabel from './SectionLabel'
import DotGrid from '@/app/components/common/DotGrid'

interface SectionMeta {
    label: string
    title: string
    teaser: string
}

const SECTION_META: Record<string, SectionMeta> = {
    wolf_score: {
        label: 'Your Wolf Score',
        title: 'Performance Score & Summary',
        teaser: 'Your overall performance score with a written breakdown of what it means for your business.',
    },
    executive_summary: {
        label: 'Executive Summary',
        title: 'Full Written Analysis',
        teaser: 'A detailed written summary of your site\'s strengths, weaknesses, and strategic opportunities.',
    },
    conversion: {
        label: 'Conversion Readiness',
        title: 'Conversion Readiness Breakdown',
        teaser: 'How well your site converts visitors across four scored dimensions.',
    },
    pillars: {
        label: 'Three Pillars',
        title: 'Accessibility, Client Experience & Revenue',
        teaser: 'Three strategic views of your website performance examined in depth.',
    },
    red_flags: {
        label: 'Red Flags',
        title: 'Critical Issues Identified',
        teaser: 'The specific problems holding your site back from performing at its best.',
    },
    quick_win: {
        label: 'Quick Win',
        title: 'Your #1 Improvement',
        teaser: 'One high-impact change you can make right now to see measurable results.',
    },
    ai_edge: {
        label: 'AI Edge',
        title: 'AI-Powered Opportunity Analysis',
        teaser: 'How AI tools could save you time, cut costs, and accelerate your results.',
    },
    next_steps: {
        label: 'Next Steps',
        title: 'Tailored Action Plan',
        teaser: 'Specific recommendations and service options based on your report findings.',
    },
}

interface Props {
    sectionKey: string
    id?: string
}

/**
 * Placeholder rendered in place of a locked report section.
 * No section data is passed to this component — gating is enforced server-side.
 * Clicking the CTA dispatches a custom event that the UnlockOverlay listens for.
 */
const LockedSection = ({ sectionKey, id }: Props) => {
    const meta = SECTION_META[sectionKey] ?? {
        label: 'Locked Section',
        title: 'This section is locked',
        teaser: 'Unlock your full report to see this content.',
    }

    const handleUnlock = () => {
        window.dispatchEvent(new CustomEvent('open-unlock-form'))
    }

    return (
        <section id={id} className="min-h-screen flex flex-col justify-center border-t border-white/10 px-10 md:px-16 py-20 relative overflow-hidden">

            <DotGrid />

            {/* Subtle glow */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(94,252,141,0.04) 0%, transparent 60%)' }}
            />

            <div className="relative flex flex-col gap-12 max-w-5xl mx-auto w-full">

                {/* Header */}
                <div className="flex flex-col gap-3">
                    <SectionLabel label={meta.label} />
                </div>

                {/* Redacted preview bars */}
                <div className="flex flex-col gap-4 opacity-20 pointer-events-none select-none" aria-hidden="true">
                    <div className="h-3 bg-white/20 rounded-full w-3/4" />
                    <div className="h-3 bg-white/20 rounded-full w-full" />
                    <div className="h-3 bg-white/20 rounded-full w-5/6" />
                    <div className="h-3 bg-white/20 rounded-full w-2/3 mt-2" />
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="h-24 bg-white/10 rounded-xl" />
                        <div className="h-24 bg-white/10 rounded-xl" />
                    </div>
                    <div className="h-3 bg-white/20 rounded-full w-4/5 mt-2" />
                    <div className="h-3 bg-white/20 rounded-full w-full" />
                </div>

                {/* Lock card */}
                <div
                    className="rounded-2xl border border-white/10 p-10 flex flex-col items-center text-center gap-6"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                    {/* Lock icon */}
                    <div
                        className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center"
                        style={{ background: 'rgba(255,255,255,0.04)' }}
                    >
                        <svg className="w-6 h-6 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                        </svg>
                    </div>

                    <div className="flex flex-col gap-2">
                        <h3 className="text-white font-bold text-xl">{meta.title}</h3>
                        <p className="text-white/40 text-sm max-w-sm leading-relaxed">{meta.teaser}</p>
                    </div>

                    <button
                        onClick={handleUnlock}
                        className="bg-brand-primary text-brand-secondary font-bold px-8 py-3 rounded-lg text-sm hover:opacity-90 transition-opacity cursor-pointer"
                    >
                        Unlock your full report →
                    </button>
                </div>
            </div>
        </section>
    )
}

export default LockedSection
