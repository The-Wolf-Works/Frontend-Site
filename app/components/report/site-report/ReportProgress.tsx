'use client'

import { useEffect, useState } from 'react'

const sections = [
    { id: 'hero',                 label: 'Overview' },
    { id: 'wolf-score',           label: 'Wolf Score' },
    { id: 'conversion-readiness', label: 'Conversion' },
    { id: 'pillars',              label: 'Pillars' },
    { id: 'red-flags',            label: 'Red Flags' },
    { id: 'quick-win',            label: 'Quick Win' },
    { id: 'ai-edge',              label: 'AI Edge' },
    { id: 'next-steps',           label: 'Next Steps' },
    { id: 'testimonials',         label: 'Testimonials' },
]

/**
 * Fixed right-side dot navigation for the site report page.
 * Tracks scroll position to highlight the active section, shows a section label
 * on hover and while active, and smooth-scrolls to a section on click.
 * Hidden on screens below the `lg` breakpoint.
 * Must be rendered outside any `overflow: clip` ancestor — see site-report layout.tsx.
 */
const ReportProgress = () => {
    const [active, setActive]   = useState('hero')
    const [hovered, setHovered] = useState<string | null>(null)

    useEffect(() => {
        const handleScroll = () => {
            for (const { id } of [...sections].reverse()) {
                const el = document.getElementById(id)
                if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.6) {
                    setActive(id)
                    break
                }
            }
        }
        handleScroll()
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <div id="report-progress" className="hidden lg:flex flex-col gap-3" style={{ position: 'fixed', right: '24px', top: '50%', transform: 'translateY(-50%)', zIndex: 9999 }}>
            {sections.map(({ id, label }) => {
                const isActive  = active === id
                const isHovered = hovered === id
                const showLabel = isActive || isHovered

                return (
                    <div
                        key={id}
                        role="button"
                        tabIndex={0}
                        data-clickable
                        onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
                        onMouseEnter={() => setHovered(id)}
                        onMouseLeave={() => setHovered(null)}
                        className="flex items-center gap-3 justify-end"
                        style={{ cursor: 'pointer' }}
                    >
                        {/* Label */}
                        <span
                            className="text-xs font-medium whitespace-nowrap"
                            style={{
                                color: isActive ? '#5EFC8D' : 'rgba(255,255,255,0.45)',
                                opacity: showLabel ? 1 : 0,
                                transform: showLabel ? 'translateX(0)' : 'translateX(6px)',
                                transition: 'opacity 0.2s ease, transform 0.2s ease, color 0.2s ease',
                            }}
                        >
                            {label}
                        </span>

                        {/* Dot */}
                        <div
                            style={{
                                width:      isActive ? '8px' : isHovered ? '7px' : '5px',
                                height:     isActive ? '8px' : isHovered ? '7px' : '5px',
                                borderRadius: '50%',
                                flexShrink: 0,
                                background: isActive ? '#5EFC8D' : isHovered ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.2)',
                                boxShadow:  isActive ? '0 0 10px rgba(94,252,141,0.5)' : 'none',
                                transition: 'all 0.2s ease',
                            }}
                        />
                    </div>
                )
            })}
        </div>
    )
}

export default ReportProgress
