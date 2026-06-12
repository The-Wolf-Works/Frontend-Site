'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ReportStructuredData } from '@/lib/types'
import { normaliseDomain } from '@/app/utils/domain'

type Status = 'idle' | 'checking' | 'generating' | 'saving' | 'redirecting' | 'error'

const statusMessage: Partial<Record<Status, string>> = {
    checking:    'Checking domain...',
    generating:  'Analysing your website. This takes around 30 seconds...',
    saving:      'Saving your report...',
    redirecting: 'Report found. Redirecting...',
}

const PublicEntryForm = () => {
    const router = useRouter()
    const [domain, setDomain] = useState('')
    const [status, setStatus] = useState<Status>('idle')
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)

        const normalisedDomain = normaliseDomain(domain)

        try {
            // Step 1: Check if a report already exists for this domain
            setStatus('checking')
            const checkRes = await fetch(`/api/report/check-domain?domain=${encodeURIComponent(normalisedDomain)}`)
            const checkData = await checkRes.json()

            if (checkData.exists && checkData.uuid) {
                setStatus('redirecting')
                router.push(`/report/site-report/${checkData.uuid}`)
                return
            }

            // Step 2: Generate the report
            setStatus('generating')
            const generateRes = await fetch('/api/report/generate-public', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ domain: normalisedDomain }),
            })

            const generateData = await generateRes.json()
            if (!generateRes.ok) throw new Error(generateData.error ?? 'Failed to generate report')

            const { free_sections: freeSectionsConfig, ...reportData } = generateData as ReportStructuredData & { free_sections: string[] | null }

            // Step 3: Save the report
            setStatus('saving')
            const saveRes = await fetch('/api/report/save-public', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ domain: normalisedDomain, reportData, freeSectionsConfig }),
            })

            const saveData = await saveRes.json()
            if (!saveRes.ok) throw new Error(saveData.error ?? 'Failed to save report')

            // Step 4: Redirect to the report
            setStatus('redirecting')
            router.push(`/report/site-report/${saveData.uuid}`)

        } catch (err) {
            setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
            setStatus('error')
        }
    }

    const isLoading = status !== 'idle' && status !== 'error'
    const message = statusMessage[status]

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
                type="text"
                placeholder="yourwebsite.com"
                value={domain}
                onChange={e => setDomain(e.target.value)}
                required
                disabled={isLoading}
                className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-brand-primary disabled:opacity-50"
            />

            {message && (
                <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full border-2 border-brand-primary border-t-transparent animate-spin flex-shrink-0" />
                    <p className="text-white/50 text-sm">{message}</p>
                </div>
            )}

            {status === 'error' && error && (
                <p className="text-red-400 text-sm">{error}</p>
            )}

            <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-brand-primary text-brand-secondary font-bold py-3 rounded-lg text-sm hover:opacity-90 transition-opacity disabled:opacity-50 cursor-pointer"
            >
                {isLoading ? 'Please wait...' : 'Get My Free Report →'}
            </button>

            <p className="text-white/30 text-xs text-center">
                No sign-up required. Takes around 30 seconds.
            </p>
        </form>
    )
}

export default PublicEntryForm
