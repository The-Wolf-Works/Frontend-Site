'use client'

import { useEffect, useState } from 'react'
import SectionLabel from '../SectionLabel'
import ScoreRing, { getScoreColor } from '../ScoreRing'
import useScrollInView from '@/app/hooks/useScrollInView'

interface Props {
    score: number
    summary: string
    executiveSummary: string
}

const WolfScoreSection = ({ score, summary, executiveSummary }: Props) => {
    const { ref, inView } = useScrollInView()
    const [current, setCurrent] = useState(0)

    useEffect(() => {
        if (!inView) return
        const duration = 1400
        const start = performance.now()
        let raf: number

        const animate = (now: number) => {
            const t = Math.min((now - start) / duration, 1)
            const eased = 1 - Math.pow(1 - t, 3)
            setCurrent(Math.round(eased * score))
            if (t < 1) raf = requestAnimationFrame(animate)
        }

        raf = requestAnimationFrame(animate)
        return () => cancelAnimationFrame(raf)
    }, [inView, score])

    const scoreColor = getScoreColor(current)
    const scoreGlow = scoreColor.replace('hsl(', 'hsla(').replace(')', ', 0.2)')

    return (
        <section ref={ref} id="wolf-score" className="min-h-screen flex flex-col justify-center border-t border-white/10 px-10 md:px-16 py-20 relative">

            {/* Dot grid */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)',
                    backgroundSize: '32px 32px',
                }}
            />

            {/* Score glow — full section gradient, animates with score colour */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: `radial-gradient(ellipse at 25% 50%, ${scoreGlow} 0%, transparent 55%)` }}
            />

            {/* Accent glow — bottom right */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at 85% 80%, rgba(0,207,224,0.06) 0%, transparent 45%)' }}
            />

            {/* Watermark — animates alongside the counter */}
            <div
                className="absolute left-[6%] top-1/2 -translate-y-1/2 font-extrabold leading-none select-none pointer-events-none"
                style={{
                    fontSize: 'clamp(12rem, 25vw, 22rem)',
                    color: 'transparent',
                    WebkitTextStroke: '1px rgba(255,255,255,0.04)',
                    willChange: 'contents',
                }}
            >
                {current}
            </div>

            <div className="relative flex flex-col gap-16 max-w-5xl mx-auto w-full">

                {/* Header */}
                <div className="flex flex-col gap-3 animate-in fade-in-0 slide-in-from-bottom-4 duration-500 fill-mode-both">
                    <SectionLabel label="Your Wolf Score" />
                    <p className="text-white/40 text-sm font-light tracking-wide max-w-md">
                        A snapshot of your website&apos;s readiness to attract, engage &amp; convert visitors.
                    </p>
                </div>

                {/* Score ring + summary */}
                <div className="flex gap-12 md:gap-16 items-center max-md:flex-col animate-in fade-in-0 slide-in-from-bottom-4 duration-500 delay-100 fill-mode-both">
                    <div className="flex-shrink-0">
                        <ScoreRing
                            score={score}
                            current={current}
                            sizeClass="w-52 h-52"
                            numberClass="text-7xl"
                        />
                    </div>

                    <div className="hidden md:block w-px self-stretch bg-white/10" />

                    <div className="flex flex-col gap-4 flex-1">
                        <p className="text-xs font-semibold tracking-[0.25em] uppercase text-brand-primary">
                            What this means
                        </p>
                        <p className="text-white/70 text-lg md:text-xl leading-relaxed font-light">
                            {summary}
                        </p>
                    </div>
                </div>

                {/* Executive summary card */}
                {executiveSummary && (
                    <div
                        className="border border-white/10 rounded-2xl p-8 flex flex-col gap-4 animate-in fade-in-0 slide-in-from-bottom-4 duration-500 delay-200 fill-mode-both"
                        style={{ background: 'rgba(255,255,255,0.02)' }}
                    >
                        <p className="text-xs font-semibold tracking-[0.25em] uppercase text-white/30">
                            Executive Summary
                        </p>
                        <p className="text-white/60 text-base leading-relaxed font-light">
                            {executiveSummary}
                        </p>
                    </div>
                )}
            </div>
        </section>
    )
}

export default WolfScoreSection
