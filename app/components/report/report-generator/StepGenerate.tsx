'use client'

import { useEffect, useRef, useState } from 'react'
import { ReportFormData, ReportStructuredData } from '@/lib/types'
import ReportEditor from './ReportEditor'

interface Props {
    formData: ReportFormData
    initialReportData: ReportStructuredData | null
    onReportDataChange: (data: ReportStructuredData) => void
    onBack: () => void
    onNext: () => void
}

type GenerateStatus = 'loading' | 'ready' | 'error'

const statusConfig: Record<GenerateStatus, { message: string; messageClass: string }> = {
    loading: {
        message: 'Generating your report...',
        messageClass: 'text-white/50'
    },
    ready: {
        message: '',
        messageClass: ''
    },
    error: {
        message: 'Failed to generate report.',
        messageClass: 'text-red-400'
    }
}

const StepGenerate = ({ formData, initialReportData, onReportDataChange, onBack, onNext }: Props) => {
    const [status, setStatus] = useState<GenerateStatus>(initialReportData ? 'ready' : 'loading')
    const [error, setError] = useState<string | null>(null)
    const [reportData, setReportData] = useState<ReportStructuredData | null>(initialReportData)

    /**
     * Calls the generate API and loads the response into the editor
    */
    const generate = async () => {
        setStatus('loading')
        setError(null)

        try {
            const res = await fetch('/api/report/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    clientName: formData.clientName,
                    clientEmail: formData.clientEmail,
                    clientDomain: formData.clientDomain,
                    promptId: formData.promptId,
                })
            })

            const data = await res.json()

            if (!res.ok) throw new Error(data.error ?? 'Unknown error')

            setReportData(data)
            onReportDataChange(data)
            setStatus('ready')

        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to generate report')
            setStatus('error')
        }
    }

    const hasGenerated = useRef(false)

    /**
    * Auto-generates on mount, skipped if content already exists
    */
    useEffect(() => {
        if (!initialReportData && !hasGenerated.current) {
            hasGenerated.current = true
            generate()
        }
    }, [])

    const { message, messageClass } = statusConfig[status]

    return (
        <div>
            <h1 className="text-2xl font-extrabold text-white mb-1">Review your report</h1>
            <p className="text-white/50 text-sm mb-8">
            {status === 'ready' ? 'Edit the content below before finalising.' : 'This may take a moment.'}
            </p>

            {status === 'loading' && (
                <div className="flex items-center gap-3 py-12 justify-center">
                    <div className="w-4 h-4 rounded-full border-2 border-brand-primary border-t-transparent animate-spin" />
                    <p className="text-white/50 text-sm">{message}</p>
                </div>
            )}

            {status === 'error' && (
                <div className="flex flex-col gap-4">
                    <p className={`text-sm ${messageClass}`}>{error ?? message}</p>
                    <button onClick={generate} className="text-sm text-brand-primary underline underline-offset-2 text-left">
                          Try again
                    </button>
                </div>
            )}

            {status === 'ready' && reportData && (
                <div className="relative">
                    <ReportEditor
                        content={reportData.report_html}
                        onContentChange={(html) => {
                            const updated = { ...reportData, report_html: html }
                            setReportData(updated)
                            onReportDataChange(updated)
                        }}
                    />
                </div>
            )}

            <div className="flex gap-3 mt-4">
                <button
                    onClick={onBack}
                    className="flex-1 border border-white/20 text-white/60 font-medium py-3 rounded-lg text-sm hover:border-white/40 transition-colors"
                >
                    Back
                </button>
                <button
                    onClick={onNext}
                    disabled={status !== 'ready'}
                    className="flex-1 bg-brand-primary text-brand-secondary font-bold py-3 rounded-lg text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                    Finalise
                  </button>
              </div>
        </div>
    )
}

export default StepGenerate
