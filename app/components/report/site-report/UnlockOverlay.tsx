'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface Props {
    uuid: string
}

type Status = 'idle' | 'loading' | 'error'

/**
 * Fixed overlay triggered by the 'open-unlock-form' custom event.
 * Collects name and email, calls /api/report/unlock, then refreshes
 * the page so the server re-renders with report_type: public_unlocked.
 */
const UnlockOverlay = ({ uuid }: Props) => {
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [status, setStatus] = useState<Status>('idle')
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const handler = () => setOpen(true)
        window.addEventListener('open-unlock-form', handler)
        return () => window.removeEventListener('open-unlock-form', handler)
    }, [])

    if (!open) return null

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError(null)
        setStatus('loading')

        try {
            const res = await fetch('/api/report/unlock', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ uuid, clientName: name, clientEmail: email }),
            })

            const data = await res.json()
            if (!res.ok) throw new Error(data.error ?? 'Failed to unlock report')

            router.refresh()

        } catch (err) {
            setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
            setStatus('error')
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)' }}>
            <div
                className="w-full max-w-md rounded-2xl border border-white/10 p-8 flex flex-col gap-6 relative"
                style={{ background: 'rgba(16,20,24,0.97)' }}
            >
                {/* Close */}
                <button
                    onClick={() => setOpen(false)}
                    className="absolute top-4 right-4 text-white/30 hover:text-white/60 transition-colors cursor-pointer"
                    aria-label="Close"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Header */}
                <div className="flex flex-col gap-2 pr-6">
                    <h2 className="text-white font-extrabold text-xl">Unlock your full report</h2>
                    <p className="text-white/40 text-sm leading-relaxed">
                        Enter your name and email to unlock all sections — free, no strings attached.
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Your name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                        disabled={status === 'loading'}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-brand-primary disabled:opacity-50"
                    />
                    <input
                        type="email"
                        placeholder="Your email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        disabled={status === 'loading'}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-brand-primary disabled:opacity-50"
                    />

                    {status === 'error' && error && (
                        <p className="text-red-400 text-sm">{error}</p>
                    )}

                    <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="w-full bg-brand-primary text-brand-secondary font-bold py-3 rounded-lg text-sm hover:opacity-90 transition-opacity disabled:opacity-50 cursor-pointer"
                    >
                        {status === 'loading' ? 'Unlocking...' : 'Unlock my report →'}
                    </button>

                    <p className="text-white/25 text-xs text-center">
                        We'll only use your email to follow up on your report.
                    </p>
                </form>
            </div>
        </div>
    )
}

export default UnlockOverlay
