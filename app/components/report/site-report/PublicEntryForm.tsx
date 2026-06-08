'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ReportStructuredData } from '@/lib/types'

type Status = 'idle' | 'generating' | 'saving' | 'error'
type DomainCheckStatus = 'idle' | 'checking' | 'exists' | 'clear'

const domainStatusConfig: Record<DomainCheckStatus, { border: string; message: string | null; messageClass: string }> = {
    idle:     { border: 'border-white/20', message: null, messageClass: '' },
    checking: { border: 'border-white/20', message: 'Checking domain...', messageClass: 'text-white/50' },
    exists:   { border: 'border-amber-500', message: 'A report already exists for this domain — redirecting...', messageClass: 'text-amber-400' },
    clear:    { border: 'border-green-500', message: 'Domain is available', messageClass: 'text-green-500' },
}

const PublicEntryForm = () => {
    const router = useRouter()
    const [domain, setDomain] = useState('')
    const [domainCheck, setDomainCheck] = useState<DomainCheckStatus>('idle')
    const [status, setStatus] = useState<Status>('idle')
    const [error, setError] = useState<string | null>(null)

    const handleDomainBlur = async () => {
        if (!domain) return

        setDomainCheck('checking')

        try {
            const res = await fetch(`/api/report/check-domain?domain=${encodeURIComponent(domain)}`)
            const data = await res.json()

            if (data.exists && data.uuid) {
                setDomainCheck('exists')
                setTimeout(() => router.push(`/report/site-report/${data.uuid}`), 1500)
            } else {
                setDomainCheck(data.exists ? 'idle' : 'clear')
            }
        } catch {
            setDomainCheck('idle')
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError(null)

        try {
            setStatus('generating')

            const generateRes = await fetch('/api/report/generate-public', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ domain }),
            })

            const generateData = await generateRes.json()
            if (!generateRes.ok) throw new Error(generateData.error ?? 'Failed to generate report')

            const reportData: ReportStructuredData = generateData

            setStatus('saving')

            const saveRes = await fetch('/api/report/save-public', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ domain, reportData }),
            })

            const saveData = await saveRes.json()
            if (!saveRes.ok) throw new Error(saveData.error ?? 'Failed to save report')

            router.push(`/report/site-report/${saveData.uuid}`)

        } catch (err) {
            setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
            setStatus('error')
        }
    }

    const isLoading = status === 'generating' || status === 'saving'
    const domainConfig = domainStatusConfig[domainCheck]

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            <div>
                <input
                    type="text"
                    placeholder="yourwebsite.com"
                    value={domain}
                    onChange={e => { setDomain(e.target.value); setDomainCheck('idle') }}
                    onBlur={handleDomainBlur}
                    required
                    disabled={isLoading}
                    className={`w-full bg-white/5 border ${domainConfig.border} rounded-lg px-4 py-3 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-brand-primary disabled:opacity-50`}
                />
                {domainConfig.message && (
                    <p className={`text-xs mt-1.5 ml-1 ${domainConfig.messageClass}`}>{domainConfig.message}</p>
                )}
            </div>

            {isLoading && (
                <div className="flex items-center gap-3 py-2">
                    <div className="w-4 h-4 rounded-full border-2 border-brand-primary border-t-transparent animate-spin flex-shrink-0" />
                    <p className="text-white/50 text-sm">
                        {status === 'generating'
                            ? 'Analysing your website — this takes around 30 seconds...'
                            : 'Saving your report...'}
                    </p>
                </div>
            )}

            {status === 'error' && error && (
                <p className="text-red-400 text-sm">{error}</p>
            )}

            <button
                type="submit"
                disabled={isLoading || domainCheck === 'exists'}
                className="w-full bg-brand-primary text-brand-secondary font-bold py-3 rounded-lg text-sm hover:opacity-90 transition-opacity disabled:opacity-50 cursor-pointer"
            >
                {isLoading ? 'Generating...' : 'Get My Free Report →'}
            </button>

            <p className="text-white/30 text-xs text-center">
                No sign-up required. Takes around 30 seconds.
            </p>
        </form>
    )
}

export default PublicEntryForm
