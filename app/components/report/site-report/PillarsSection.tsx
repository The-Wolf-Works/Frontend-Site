'use client'

import { useState } from 'react'
import { EyeIcon, UserIcon, ArrowTrendingUpIcon } from '@heroicons/react/24/outline'
import ExpandableText from './ExpandableText'

interface Props {
    accessibilityView: string
    clientView: string
    revenueView: string
}

const pillars = [
    {
        key: 'accessibility' as const,
        label: 'Accessibility',
        color: '#5EFC8D',
        iconBg: 'bg-brand-primary/10 border-brand-primary/20',
        Icon: EyeIcon,
        iconColor: 'text-brand-primary',
    },
    {
        key: 'client' as const,
        label: 'Client View',
        color: '#00cfe0',
        iconBg: 'bg-brand-accent/10 border-brand-accent/20',
        Icon: UserIcon,
        iconColor: 'text-brand-accent',
    },
    {
        key: 'revenue' as const,
        label: 'Revenue',
        color: '#f59e0b',
        iconBg: 'bg-amber-400/10 border-amber-400/20',
        Icon: ArrowTrendingUpIcon,
        iconColor: 'text-amber-400',
    },
]

const PillarsSection = ({ accessibilityView, clientView, revenueView }: Props) => {
    const [active, setActive] = useState<string | null>(null)

    const textMap: Record<string, string> = {
        accessibility: accessibilityView,
        client: clientView,
        revenue: revenueView,
    }

    return (
        <div className="flex flex-col gap-3">
            {pillars.map(({ key, label, color, iconBg, Icon, iconColor }) => (
                <div key={key} className="rounded-xl border border-white/10 p-6 flex-1" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <div className="flex items-center gap-3 mb-4">
                        <div className={`w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 ${iconBg}`}>
                            <Icon className={`w-4 h-4 ${iconColor}`} />
                        </div>
                        <div className="flex items-center gap-2.5">
                            <div className="h-3.5 w-0.5 rounded-full shrink-0" style={{ backgroundColor: color }} />
                            <p className="text-xs font-semibold tracking-widest uppercase leading-none" style={{ color }}>
                                {label}
                            </p>
                        </div>
                    </div>
                    <ExpandableText
                        text={textMap[key]}
                        className="text-white/65 text-sm leading-relaxed"
                        expanded={active === key}
                        onToggle={() => setActive(prev => prev === key ? null : key)}
                    />
                </div>
            ))}
        </div>
    )
}

export default PillarsSection
