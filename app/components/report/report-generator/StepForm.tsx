'use client'

import { useState } from 'react'
import { AiReportPrompt, ReportFormData } from '@/lib/types'

interface Props {
    prompts: AiReportPrompt[]
    initialData: ReportFormData | null
    onSubmit: (data: Omit<ReportFormData, 'uuid'>) => void
}

// Domain status configuration type
type DomainStatus = 'idle' | 'checking' | 'exists' | 'clear'

// Domain status configuration object mapping status to border and message classes
const domainStatusConfig: Record<DomainStatus, {
    border: string,
    message: string | null;
    messageClass: string
}> = {
    idle: {
        border: 'border-white/20',
        message: null,
        messageClass: ''
    },
    checking: {
        border: 'border-white/20',
        message: 'Checking domain...',
        messageClass: 'text-white/50'
    },
    exists: {
        border: 'border-red-500',
        message: 'Domain already exists',
        messageClass: 'text-red-500'
    },
    clear: {
        border: 'border-green-500',
        message: 'Domain is available',
        messageClass: 'text-green-500'
    }
}

/**
 * Domain field component with status indicators
 * @param value The current domain value
 * @param onChange Handler for input changes
 * @param onBlur Handler for input blur
 * @param status The current domain status
 * @returns input
 */
const DomainField = ({ value, onChange, onBlur, status }: {
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onBlur: () => void
    status: DomainStatus
}) => {
    const config = domainStatusConfig[status]
    return (
        <div>
            <input
                type="text"
                name="clientDomain"
                placeholder="Client domain"
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                required
                className={`w-full bg-white/5 border ${config.border} rounded-lg px-4 py-3 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-brand-primary`}
            />
            {config.message && <p className={`text-xs mt-1.5 ml-1 ${config.messageClass}`}>{config.message}</p>}
        </div>
    )
}

/**
 * Step 1: Report form (client details, prompt selection)
 * @param prompts Available prompts to choose from
 * @param initialData Initial form data
 * @param onSubmit Handler for form submission
 * @returns
 */
const StepForm = ({ prompts, initialData, onSubmit }: Props) => {
    const [form, setForm] = useState({
        clientName: initialData?.clientName ?? '',
        clientEmail: initialData?.clientEmail ?? '',
        clientDomain: initialData?.clientDomain ?? '',
        promptId: initialData?.promptId ?? (prompts[0]?.databaseId ?? 0),
        promptTitle: initialData?.promptTitle ?? (prompts[0]?.title ?? ''),
    })

    const [domainStatus, setDomainStatus] = useState<DomainStatus>('idle')
    const [submitting, setSubmitting] = useState(false)

    /**
     * Handle changes to form fields
     * @param e The change event
     */
    const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target

        switch (name) {
            case 'promptId':
                const prompt = prompts.find(p => p.databaseId === parseInt(value))
                setForm(prev => ({ ...prev, promptId: parseInt(value), promptTitle: prompt?.title ?? '' }))
                break
            case 'clientDomain':
                setDomainStatus('idle')
                setForm(prev => ({ ...prev, [name]: value }))
                break
            default:
                setForm(prev => ({ ...prev, [name]: value }))
                break
        }
    }

    /**
     * Check domain availability when domain field loses focus
     */
    const handleDomainBlur = async () => {
        if (!form.clientDomain) return

        setDomainStatus('checking')

        try {
            const res = await fetch(`/api/report/check-domain?domain=${encodeURIComponent(form.clientDomain)}`)
            const data = await res.json()
            setDomainStatus(data.exists ? 'exists' : 'clear')
        } catch {
            setDomainStatus('idle')
        }
    }

    /**
     * Handle form submission
     * @param e The submit event
     */
    const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSubmitting(true)
        onSubmit(form)
    }

    return (
        <div>
            <h1 className="text-2xl font-extrabold text-white mb-1">Generate a report</h1>
            <p className="text-white/50 text-sm mb-8">Enter the client details below to get started.</p>

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>

                {/* Client Name */}
                <input
                    type="text"
                    name="clientName"
                    placeholder="Client name"
                    value={form.clientName}
                    onChange={handleFieldChange}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-brand-primary"
                />

                {/* Client Email */}
                <input
                    type="email"
                    name="clientEmail"
                    placeholder="Client email"
                    value={form.clientEmail}
                    onChange={handleFieldChange}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-brand-primary"
                />

                {/* Client Domain */}
                <DomainField
                    value={form.clientDomain}
                    onChange={handleFieldChange}
                    onBlur={handleDomainBlur}
                    status={domainStatus}
                />

                {/* Report Type */}
                <div>
                    <label className="block text-white/40 text-xs mb-1.5 ml-1">Report Type</label>
                    <select
                        name="promptId"
                        value={form.promptId}
                        onChange={handleFieldChange}
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-primary appearance-none"
                    >
                        {prompts.map((prompt) => (
                            <option
                                key={prompt.databaseId}
                                value={prompt.databaseId}
                                className="bg-brand-secondary"
                            >
                                {prompt.title}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={submitting || domainStatus === 'exists'}
                    className="w-full bg-brand-primary text-brand-secondary font-bold py-3 rounded-lg text-sm hover:opacity-90 transition-opacity disabled:opacity-50 cursor-pointer mt-2"
                >
                    {submitting ? 'Starting...' : 'Generate Report ->'}
                </button>
            </form>
        </div>
    )
}

export default StepForm
