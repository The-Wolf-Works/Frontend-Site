'use client'

import { useEffect, useState } from 'react'
import { ConversionReadiness } from '@/lib/types'

const metrics: { key: keyof ConversionReadiness; label: string }[] = [
    { key: 'clarity',              label: 'Clarity' },
    { key: 'trust_signals',        label: 'Trust' },
    { key: 'mobile_experience',    label: 'Mobile' },
    { key: 'conversion_structure', label: 'Conversion' },
    { key: 'overall',              label: 'Overall' },
]

interface Props {
    data: ConversionReadiness
}

const ConversionBars = ({ data }: Props) => {
    const [animated, setAnimated] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => setAnimated(true), 120)
        return () => clearTimeout(timer)
    }, [])

    return (
        <div className="flex flex-col gap-3.5">
            {metrics.map(({ key, label }, i) => {
                const value = data[key] ?? 0
                return (
                    <div key={key}>
                        <div className="flex justify-between mb-1.5">
                            <span className="text-white/60 text-xs">{label}</span>
                            <span className="text-white text-xs font-bold tabular-nums">
                                {value}<span className="text-white/25 font-normal">/10</span>
                            </span>
                        </div>
                        <div className="h-2 bg-white/[0.06] rounded-full overflow-hidden">
                            <div
                                className="h-full rounded-full"
                                style={{
                                    width: animated ? `${value * 10}%` : '0%',
                                    background: 'linear-gradient(90deg, #5EFC8D, #00cfe0)',
                                    boxShadow: '0 0 5px rgba(94,252,141,0.35)',
                                    transition: `width 1s cubic-bezier(0.4, 0, 0.2, 1) ${i * 80}ms`,
                                }}
                            />
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default ConversionBars
