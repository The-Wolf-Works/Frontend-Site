'use client'

import { useEffect, useState } from 'react'

interface Props {
    score: number
    scoreGlow: string
}

const circumference = 2 * Math.PI * 40

const getScoreColor = (s: number) => {
    const hue = s < 50 ? (s / 50) * 30 : 30 + ((s - 50) / 50) * 110
    return `hsl(${hue}, 85%, 60%)`
}

const ScoreRing = ({ score, scoreGlow }: Props) => {
    const [current, setCurrent] = useState(0)

    useEffect(() => {
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
    }, [score])

    const color = getScoreColor(current)
    const dashOffset = circumference - (current / 100) * circumference

    return (
        <div className="relative shrink-0 w-32 h-32">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="5" />
                <circle
                    cx="50" cy="50" r="40" fill="none"
                    stroke={color} strokeWidth="5"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={dashOffset}
                    style={{ filter: `drop-shadow(0 0 4px ${scoreGlow})` }}
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-extrabold leading-none" style={{ color }}>{current}</span>
                <span className="text-xs text-white/35 leading-none mt-1.5">/ 100</span>
            </div>
        </div>
    )
}

export default ScoreRing
