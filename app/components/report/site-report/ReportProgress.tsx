'use client'

import { useEffect, useState } from 'react'
import { icons } from '@/app/components/icons/Icons'
import { ProgressSection } from '@/lib/types'

const LockClosedIcon = icons.lockClosed

interface Props {
    sections: ProgressSection[]
}

/**
 * Fixed right-side navigation for the site report page.
 * Sections are passed in dynamically from the page — no hardcoded list.
 * Locked sections display a lock icon. Active section is highlighted.
 * Must be rendered outside any `overflow: clip` ancestor — see site-report layout.tsx.
 */
const ReportProgress = ({ sections }: Props) => {
    const [active, setActive] = useState(sections[0]?.id ?? '')

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
    }, [sections])

    return (
        <div id="report-progress" className="hidden lg:flex flex-col gap-2" style={{ position: 'fixed', right: '24px', top: '50%', transform: 'translateY(-50%)', zIndex: 9999 }}>
            {sections.map(({ id, label, locked }) => {
                const isActive = active === id

                return (
                    <div
                        key={id}
                        role="button"
                        tabIndex={0}
                        data-clickable
                        onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
                        className="flex items-center gap-2.5 justify-end cursor-pointer"
                    >
                        <span
                            className="text-xs font-medium whitespace-nowrap flex items-center gap-1.5"
                            style={{
                                color: isActive ? '#5EFC8D' : 'rgba(255,255,255,0.35)',
                                transition: 'color 0.2s ease',
                            }}
                        >
                            {locked && <LockClosedIcon className="w-2.5 h-2.5 flex-shrink-0 opacity-60" />}
                            {label}
                        </span>

                        <div style={{
                            width:        isActive ? '8px' : '5px',
                            height:       isActive ? '8px' : '5px',
                            borderRadius: '50%',
                            flexShrink:   0,
                            background:   isActive ? '#5EFC8D' : locked ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.25)',
                            boxShadow:    isActive ? '0 0 10px rgba(94,252,141,0.5)' : 'none',
                            transition:   'all 0.2s ease',
                        }} />
                    </div>
                )
            })}
        </div>
    )
}

export default ReportProgress
