'use client'

import { useState } from 'react'
import { icons } from '@/app/components/icons/Icons'
import SectionLabel from '../SectionLabel'
import DotGrid from '@/app/components/common/DotGrid'
import useScrollInView from '@/app/hooks/useScrollInView'

interface Props {
    accessibilityView: string
    clientView: string
    revenueView: string
}

const pillars = [
    { key: 'accessibility' as const, label: 'Accessibility', heading: 'Can everyone use it?',      color: '#5EFC8D', glow: 'rgba(94,252,141,0.08)',  border: 'rgba(94,252,141,0.2)',  Icon: icons.eye },
    { key: 'client'        as const, label: 'Client View',   heading: 'What visitors experience.', color: '#00cfe0', glow: 'rgba(0,207,224,0.08)',   border: 'rgba(0,207,224,0.2)',   Icon: icons.user },
    { key: 'revenue'       as const, label: 'Revenue',        heading: 'Is it earning its keep?',  color: '#f59e0b', glow: 'rgba(245,158,11,0.08)',  border: 'rgba(245,158,11,0.2)',  Icon: icons.arrowTrendingUp },
]

// ── Section ───────────────────────────────────────────────────────────────────

/**
 * Tabbed section presenting the site through three evaluation lenses.
 * Switching tabs animates content in/out with a slide+fade transition.
 * The background glow colour transitions to match the active pillar's colour.
 *
 * @param accessibilityView - Analysis text for the Accessibility pillar (green).
 * @param clientView        - Analysis text for the Client View pillar (cyan).
 * @param revenueView       - Analysis text for the Revenue pillar (amber).
 */
const PillarsSection = ({ accessibilityView, clientView, revenueView }: Props) => {
    const { ref, inView, fadeUp } = useScrollInView()
    const [active, setActive] = useState(0)       // drives tab highlight + background
    const [displayed, setDisplayed] = useState(0) // drives content (lags during transition)
    const [direction, setDirection] = useState(1) // 1 = going right, -1 = going left
    const [contentIn, setContentIn] = useState(true)

    const texts: Record<string, string> = {
        accessibility: accessibilityView,
        client: clientView,
        revenue: revenueView,
    }

    const goTo = (i: number) => {
        if (i === active) return
        setDirection(i > active ? 1 : -1)
        setActive(i)
        setContentIn(false)
        setTimeout(() => {
            setDisplayed(i)
            requestAnimationFrame(() => requestAnimationFrame(() => setContentIn(true)))
        }, 220)
    }

    const activePillar   = pillars[active]
    const displayedPillar = pillars[displayed]

    return (
        <section ref={ref} id="pillars" className="min-h-screen flex flex-col justify-center border-t border-white/10 px-10 md:px-16 py-20 relative">

            {/* Background */}
            <DotGrid />
            <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse at 50% 100%, ${activePillar.glow} 0%, transparent 50%)`, transition: 'background 0.8s ease' }} />

            <div className="relative flex flex-col gap-6 max-w-5xl mx-auto w-full">

                {/* Header */}
                <div className="flex flex-col gap-3" style={fadeUp(0)}>
                    <SectionLabel label="Three Pillars" />
                    <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
                        Your site, seen from<br />three angles.
                    </h2>
                    <p className="text-white/40 text-sm font-light tracking-wide max-w-md">
                        Accessibility, experience, and revenue — the lenses we use to evaluate what&apos;s working and what&apos;s not.
                    </p>
                </div>

                {/* Tab bar */}
                <div className="flex gap-2 p-1 rounded-xl border border-white/10" style={{ background: 'rgba(255,255,255,0.02)', ...fadeUp(100) }}>
                    {pillars.map(({ key, label, color, glow, border, Icon }, i) => {
                        const isActive = active === i
                        return (
                            <button
                                key={key}
                                onClick={() => goTo(i)}
                                className="flex-1 flex items-center justify-center gap-2.5 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-300 cursor-pointer select-none"
                                style={{
                                    background: isActive ? glow : 'transparent',
                                    border: `1px solid ${isActive ? border : 'transparent'}`,
                                    color: isActive ? color : 'rgba(255,255,255,0.4)',
                                    cursor: 'pointer',
                                }}
                            >
                                <Icon className="w-4 h-4 shrink-0" />
                                <span className="hidden sm:block">{label}</span>
                            </button>
                        )
                    })}
                </div>

                {/* Content panel */}
                <div className="relative rounded-2xl border border-white/10 p-8 md:p-10 overflow-hidden" style={{ background: 'rgba(255,255,255,0.02)', ...fadeUp(200) }}>

                    {/* Colour accents — follow active tab */}
                    <div className="absolute top-0 left-12 right-12 h-px" style={{ background: `linear-gradient(90deg, transparent, ${activePillar.color}, transparent)`, transition: 'background 0.8s ease' }} />
                    <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse at 50% 0%, ${activePillar.glow} 0%, transparent 60%)`, transition: 'background 0.8s ease' }} />

                    {/* Content — slides + fades with displayed pillar */}
                    <div
                        className="relative flex flex-col gap-6"
                        style={{
                            opacity: contentIn ? 1 : 0,
                            transform: `translateX(${contentIn ? 0 : direction * -40}px)`,
                            transition: 'opacity 0.22s ease, transform 0.22s ease',
                        }}
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border" style={{ background: displayedPillar.glow, borderColor: displayedPillar.border }}>
                                <displayedPillar.Icon className="w-5 h-5" style={{ color: displayedPillar.color }} />
                            </div>
                            <SectionLabel label={displayedPillar.label} color={displayedPillar.color} />
                        </div>

                        <h3 className="text-white text-2xl md:text-3xl font-bold leading-snug">{displayedPillar.heading}</h3>

                        <div className="h-px bg-white/[0.06]" />

                        <p className="text-white/60 text-base leading-relaxed">{texts[displayedPillar.key]}</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PillarsSection
