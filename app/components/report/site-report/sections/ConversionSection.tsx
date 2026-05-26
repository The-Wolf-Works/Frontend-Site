'use client'

import { useEffect, useState } from 'react'
import useScrollInView from '@/app/hooks/useScrollInView'
import SectionLabel from '../SectionLabel'
import DotGrid from '@/app/components/common/DotGrid'
import { ConversionReadiness } from '@/lib/types'

interface Props {
    data: ConversionReadiness
}

type MetricKey = 'clarity' | 'trust_signals' | 'mobile_experience' | 'conversion_structure'

const metrics: { key: MetricKey; label: string; description: string }[] = [
    { key: 'clarity',              label: 'Clarity & Trust',      description: 'Does your site communicate clearly and build confidence?' },
    { key: 'trust_signals',        label: 'Trust Signals',        description: 'Reviews, accreditations, and social proof.' },
    { key: 'mobile_experience',    label: 'Mobile Experience',    description: 'Performance and usability for mobile visitors.' },
    { key: 'conversion_structure', label: 'Conversion Structure', description: 'CTAs, forms, and paths to action.' },
]

const getColor = (value: number) => {
    const pct = value / 10
    const hue = pct < 0.5 ? pct * 2 * 30 : 30 + (pct * 2 - 1) * 110
    return { solid: `hsl(${hue}, 85%, 60%)`, glow: `hsla(${hue}, 85%, 60%, 0.4)` }
}

// ── Sub-components ────────────────────────────────────────────────────────────

const ScoreBar = ({ value, ready, delay = 0 }: { value: number; ready: boolean; delay?: number }) => {
    const { solid, glow } = getColor(value)
    return (
        <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
            <div
                className="h-full rounded-full"
                style={{
                    width: ready ? `${value * 10}%` : '0%',
                    background: `linear-gradient(90deg, ${solid}, transparent)`,
                    boxShadow: `0 0 8px ${glow}`,
                    transition: `width 1s cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms`,
                    willChange: 'width',
                }}
            />
        </div>
    )
}

const MetricCard = ({ label, description, value, ready, delay }: {
    label: string; description: string; value: number; ready: boolean; delay: number
}) => {
    const { solid } = getColor(value)
    return (
        <div className="rounded-xl border border-white/10 p-6 flex flex-col gap-4" style={{ background: 'rgba(255,255,255,0.02)' }}>
            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="text-white/80 text-sm font-medium">{label}</p>
                    <p className="text-white/30 text-xs mt-1 leading-relaxed">{description}</p>
                </div>
                <span className="text-2xl font-extrabold flex-shrink-0 tabular-nums" style={{ color: solid }}>
                    {value}<span className="text-white/20 text-sm font-normal">/10</span>
                </span>
            </div>
            <ScoreBar value={value} ready={ready} delay={delay} />
        </div>
    )
}

// ── Section ───────────────────────────────────────────────────────────────────

/**
 * Displays the site's conversion readiness broken down across four metrics.
 * Renders an overall score banner with an animated counter, then a 2-column
 * grid of MetricCards each with an animated score bar.
 *
 * @param data                      - ConversionReadiness object from the report data.
 * @param data.overall              - Overall score out of 10.
 * @param data.clarity              - Clarity & Trust score out of 10.
 * @param data.trust_signals        - Trust Signals score out of 10.
 * @param data.mobile_experience    - Mobile Experience score out of 10.
 * @param data.conversion_structure - Conversion Structure score out of 10.
 */
const ConversionSection = ({ data }: Props) => {
    const { ref: sectionRef, inView: animated } = useScrollInView()
    const [barsReady, setBarsReady] = useState(false)
    const [current, setCurrent] = useState(0)

    useEffect(() => {
        if (!animated) return

        // Bars fire after card fade-in completes
        const timer = setTimeout(() => setBarsReady(true), 300)

        // Counter animates from 0 to overall score
        const target = data.overall ?? 0
        const duration = 1200
        const start = performance.now()
        let raf: number

        const tick = (now: number) => {
            const t = Math.min((now - start) / duration, 1)
            const eased = 1 - Math.pow(1 - t, 3)
            setCurrent(Math.round(eased * target * 10) / 10)
            if (t < 1) raf = requestAnimationFrame(tick)
        }

        raf = requestAnimationFrame(tick)
        return () => { clearTimeout(timer); cancelAnimationFrame(raf) }
    }, [animated, data.overall])

    const overall = data.overall ?? 0
    const { solid: overallColor, glow: overallGlow } = getColor(animated ? current : overall)

    return (
        <section ref={sectionRef} id="conversion-readiness" className="min-h-screen flex flex-col justify-center border-t border-white/10 px-10 md:px-16 py-20 relative" style={{ background: 'rgba(0,0,0,0.15)' }}>

            {/* Background */}
            <DotGrid />
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 0% 0%, rgba(94,252,141,0.06) 0%, transparent 50%)' }} />
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 100% 100%, rgba(0,207,224,0.06) 0%, transparent 50%)' }} />

            <div className="relative flex flex-col gap-12 max-w-5xl mx-auto w-full">

                {/* Header */}
                <div className="flex flex-col gap-3 animate-in fade-in-0 slide-in-from-bottom-4 duration-500 fill-mode-both">
                    <SectionLabel label="Conversion Readiness" />
                    <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
                        How ready is your site<br />to convert visitors?
                    </h2>
                    <p className="text-white/40 text-sm font-light tracking-wide max-w-md">
                        Five dimensions that determine whether visitors take action — or leave.
                    </p>
                </div>

                {/* Overall score banner */}
                <div
                    className="rounded-2xl border border-white/10 p-8 flex items-center gap-8 animate-in fade-in-0 slide-in-from-bottom-4 duration-500 delay-100 fill-mode-both"
                    style={{ background: `linear-gradient(135deg, ${overallGlow}40 0%, rgba(255,255,255,0.02) 100%)` }}
                >
                    <div className="flex-shrink-0 flex items-end gap-1.5 leading-none">
                        <span className="font-extrabold text-6xl md:text-7xl tabular-nums" style={{ color: overallColor, textShadow: `0 0 40px ${overallGlow}` }}>
                            {current.toFixed(1)}
                        </span>
                        <span className="text-white/25 text-2xl font-light pb-1">/10</span>
                    </div>
                    <div className="w-px self-stretch bg-white/10 hidden sm:block" />
                    <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                        <p className="text-xs font-semibold tracking-[0.25em] uppercase text-brand-primary">Overall Score</p>
                        <p className="text-white/60 text-sm leading-relaxed">
                            Your site&apos;s combined conversion readiness across all five dimensions.
                        </p>
                        <div className="mt-2 max-w-xs">
                            <ScoreBar value={overall} ready={barsReady} />
                        </div>
                    </div>
                </div>

                {/* Metric cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in fade-in-0 slide-in-from-bottom-4 duration-500 delay-200 fill-mode-both">
                    {metrics.map(({ key, label, description }, i) => (
                        <MetricCard
                            key={key}
                            label={label}
                            description={description}
                            value={data[key] ?? 0}
                            ready={barsReady}
                            delay={i * 100}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default ConversionSection
