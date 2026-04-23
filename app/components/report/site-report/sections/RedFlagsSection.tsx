'use client'

import { icons } from '@/app/components/icons/Icons'
import SectionLabel, { DotGrid } from '../SectionLabel'
import useScrollInView from '@/app/hooks/useScrollInView'

interface Props {
    redFlags: string[]
    leakyBucket: string
}

/**
 * Two-column section highlighting critical issues and revenue leakage.
 * Left column lists each red flag as a staggered slide-in row with a flag icon.
 * Right column renders the "Leaky Bucket" card — where the site is losing money.
 *
 * @param redFlags    - Array of plain-text issue strings, each rendered as a flag row.
 * @param leakyBucket - Plain-text description of the primary revenue leak.
 */
const RedFlagsSection = ({ redFlags, leakyBucket }: Props) => {
    const { ref, inView, fadeUp } = useScrollInView()

    return (
        <section ref={ref} id="red-flags" className="min-h-screen flex flex-col border-t border-white/10 px-10 md:px-16 py-24 relative overflow-hidden" style={{ background: 'rgba(0,0,0,0.15)' }}>

            {/* Background */}
            <DotGrid />
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 100% 0%, rgba(248,113,113,0.12) 0%, transparent 50%)' }} />
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 0% 50%, rgba(248,113,113,0.07) 0%, transparent 50%)' }} />

            <div className="relative flex flex-col justify-between flex-1 gap-16 max-w-5xl mx-auto w-full">

                {/* Header */}
                <div className="flex flex-col gap-3" style={fadeUp(0)}>
                    <SectionLabel label="Red Flags" color="red" />
                    <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
                        What needs fixing<br />right now.
                    </h2>
                    <p className="text-white/40 text-sm font-light tracking-wide max-w-md">
                        These issues are costing you visitors and conversions today — not tomorrow.
                    </p>
                </div>

                {/* Two columns — flags left, leaky bucket right */}
                <div className="flex flex-col md:flex-row gap-8 md:gap-16 flex-1 md:items-center">

                    {/* Left — flags */}
                    {redFlags.length > 0 && (
                        <div className="flex flex-col flex-1">
                            {redFlags.map((flag, i) => (
                                <div
                                    key={i}
                                    className="flex items-start gap-6 py-8 border-t border-white/[0.06]"
                                    style={{
                                        opacity: inView ? 1 : 0,
                                        transform: inView ? 'translateX(0)' : 'translateX(-16px)',
                                        transition: `opacity 0.5s ease ${i * 100}ms, transform 0.5s ease ${i * 100}ms`,
                                    }}
                                >
                                    <div className="w-1 self-stretch rounded-full shrink-0" style={{ background: 'linear-gradient(to bottom, rgba(248,113,113,0.8), rgba(248,113,113,0.1))' }} />
                                    <div className="flex flex-col gap-2 flex-1">
                                        <div className="flex items-center gap-2">
                                            <icons.flag className="w-3 h-3 text-red-400" />
                                            <span className="text-red-400/70 text-xs font-semibold tracking-widest uppercase">Fix required</span>
                                        </div>
                                        <p className="text-white/80 text-lg leading-relaxed font-light">{flag}</p>
                                    </div>
                                </div>
                            ))}
                            <div className="border-t border-white/[0.06]" />
                        </div>
                    )}

                    {/* Right — leaky bucket */}
                    {leakyBucket && (
                        <div
                            className="md:w-80 shrink-0 relative rounded-2xl border border-amber-500/20 p-7 flex flex-col gap-5 overflow-hidden"
                            style={{ background: 'rgba(245,158,11,0.03)', ...fadeUp(100 + redFlags.length * 100) }}
                        >
                            <div className="absolute top-0 left-8 right-8 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(245,158,11,0.4), transparent)' }} />
                            <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(245,158,11,0.06) 0%, transparent 60%)' }} />

                            <div className="relative flex flex-col gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                                        <icons.arrowTrendingDown className="w-4 h-4 text-amber-400" />
                                    </div>
                                    <SectionLabel label="The Leaky Bucket" color="amber" />
                                </div>
                                <p className="text-xs font-semibold tracking-[0.2em] uppercase text-white/25">Where you&apos;re losing money</p>
                                <p className="text-white/60 text-sm leading-relaxed">{leakyBucket}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}

export default RedFlagsSection
