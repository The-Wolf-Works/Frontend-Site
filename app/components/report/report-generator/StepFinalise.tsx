'use client'

import { useState } from "react"
import { ReportFormData, ReportStructuredData } from "@/lib/types"
import { ActionStatus } from './types'

interface Props {
    formData: ReportFormData
    reportData: ReportStructuredData
    onBack: () => void
    onReset: () => void
}

interface ActionState {
    save: ActionStatus
    email: ActionStatus
    pdf: ActionStatus
}

const statusConfig: Record<ActionStatus, { icon: string; class: string }> = {
    idle: {
        icon: '○',
        class: 'text-white/30'
    },
    loading: {
        icon: '◌',
        class: 'text-white/50 animate-pulse'
    },
    success: {
        icon: '✓',
        class: 'text-brand-primary'
    },
    error: {
        icon: '✕',
        class: 'text-red-500'
    }
}

const StepFinalise = ({ formData, reportData, onBack, onReset }: Props) => {
    const [sendEmail, setSendEmail] = useState(true)
    const [generatePDF, setGeneratePDF] = useState(true)
    const [actions, setActions] = useState<ActionState>({
        save: 'idle',
        email: 'idle',
        pdf: 'idle'
    })

    const handleFinalise = async () => {
        setActions({ save: 'loading', email: 'idle', pdf: generatePDF ? 'loading' : 'idle' })

        try {
            const res = await fetch('/api/report/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    reportData,
                    clientName: formData.clientName,
                    clientEmail: formData.clientEmail,
                    clientDomain: formData.clientDomain,
                    uuid: formData.uuid,
                    promptId: formData.promptId,
                    promptTitle: formData.promptTitle,
                    generatePDF
                })
            })

            if (!res.ok) {
                setActions(prev => ({ ...prev, save: 'error', pdf: generatePDF ? 'error' : 'idle' }))
                return
            }

            setActions(prev => ({ ...prev, save: 'success', pdf: generatePDF ? 'success' : 'idle' }))

            if (sendEmail) {
                setActions(prev => ({ ...prev, email: 'loading' }))

                const emailRes = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        formType: 'report',
                        name: formData.clientName,
                        email: formData.clientEmail,
                        client_name: formData.clientName,
                        client_email: formData.clientEmail,
                        client_domain: formData.clientDomain,
                        prompt_title: formData.promptTitle,
                    })
                })

                setActions(prev => ({ ...prev, email: emailRes.ok ? 'success' : 'error' }))
            }

        } catch (error) {
            setActions(prev => ({ ...prev, save: 'error'}))
        }
    }

    return (
        <>
            {actions.save === 'success' ? (
                <div className="max-w-lg mx-auto text-center flex flex-col items-center gap-6">
                    <div className="w-16 h-16 rounded-full bg-brand-primary/10 flex items-center justify-center">
                        <span className="text-brand-primary text-2xl">✓</span>
                    </div>
                    <div>
                        <h1 className="text-2xl font-extrabold text-white mb-2">Report sent</h1>
                        <p className="text-white/50 text-sm">The report for
                            <strong className="text-white"> {formData.clientName} </strong>
                            at
                            <strong className="text-white"> {formData.clientDomain} </strong>
                            has been saved successfully.
                        </p>
                        <div className="bg-white/5 border border-white/10 rounded-lg p-4 flex flex-col gap-2 w-full mt-4">
                            {generatePDF && (
                                <div className="flex items-center gap-2">
                                    <span className="text-brand-primary text-sm">✓</span>
                                    <span className="text-white/70 text-sm">PDF generated</span>
                                </div>
                            )}
                            {sendEmail && (
                                <div className="flex items-center gap-2">
                                    <span className={`text-sm ${(actions.email === 'success' || actions.email === 'loading') ? 'text-brand-primary' : 'text-red-400'}`}>
                                        {(actions.email === 'success' || actions.email === 'loading') ? '✓' : '✕'}
                                </span>
                                <span className="text-white/70 text-sm">
                                    {actions.email === 'success' ? 'Email sent to client' : 'Email failed'}
                                </span>
                            </div>
                        )}
                        </div>
                        <button
                            onClick={onReset}
                            className="w-full bg-brand-primary text-brand-secondary font-bold py-3 rounded-lg text-sm hover:opacity-90 transition-opacity"
                        >
                            New Report
                        </button>
                    </div>
                </div>
            ) : (
                <div className="max-w-lg mx-auto">
                    <h1 className="text-2xl font-extrabold text-white mb-1">Finalise report</h1>
                    <p className="text-white/50 text-sm mb-8">Review the details below before sending</p>

                    {/* Toggles */}
                    <div className="flex flex-col gap-3 mb-6">
                        <label className="flex items-center justify-between bg-white/5 border border-white/10 rounded-lg px-5 py-4 cursor-pointer">
                            <span className="text-white text-sm">Generate PDF</span>
                            <input
                                type="checkbox"
                                checked={generatePDF}
                                onChange={e => setGeneratePDF(e.target.checked)}
                                className="accent-brand-primary w-4 h-4"
                            />
                        </label>
                        <label className="flex items-center justify-between bg-white/5 border border-white/10 rounded-lg px-5 py-4 cursor-pointer">
                            <span className="text-white text-sm">Send email to client</span>
                            <input
                                type="checkbox"
                                checked={sendEmail}
                                onChange={e => setSendEmail(e.target.checked)}
                                className="accent-brand-primary w-4 h-4"
                            />
                        </label>
                    </div>

                    {/* Client Summary */}
                    <div className="bg-white/5 border border-white/10 rounded-lg p-5 mb-6 flex flex-col gap-2">
                        <p className="text-white text-sm">
                            <span className="text-white/40">Client: </span>
                            {formData.clientName}
                        </p>
                        <p className="text-white text-sm">
                            <span className="text-white/40">Email: </span>
                            {formData.clientEmail}
                        </p>
                        <p className="text-white text-sm">
                            <span className="text-white/40">Domain: </span>
                            {formData.clientDomain}
                        </p>
                        <p className="text-white text-sm">
                            <span className="text-white/40">Report: </span>
                            {formData.promptTitle}
                        </p>
                    </div>

                    {/* Status Indicators */}
                    <div className="flex justify-center gap-5 mb-6">
                        <div className="flex items-center gap-3">
                            <span className={`text-lg ${statusConfig[actions.save].class}`}>{statusConfig[actions.save].icon}</span>
                            <span className="text-white/50 text-sm">Saving report</span>
                        </div>
                        {generatePDF && (
                            <div className="flex items-center gap-3">
                                <span className={`text-lg ${statusConfig[actions.pdf].class}`}>{statusConfig[actions.pdf].icon}</span>
                                <span className="text-white/50 text-sm">Generating PDF</span>
                            </div>
                        )}
                        {sendEmail && (
                            <div className="flex items-center gap-3">
                                <span className={`text-lg ${statusConfig[actions.email].class}`}>{statusConfig[actions.email].icon}</span>
                                <span className="text-white/50 text-sm">Sending email</span>
                            </div>
                        )}
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3">
                        <button
                            onClick={onBack}
                            disabled={actions.save === 'loading' || actions.email === 'loading'}
                            className="flex-1 border border-white/20 text-white/60 font-medium py-3 rounded-lg text-sm hover:border-white/40 transition-colors disabled:opacity-50"
                        >
                            Back
                        </button>
                        <button
                            onClick={handleFinalise}
                            disabled={actions.save === 'loading' || actions.email === 'loading'}
                            className="flex-1 bg-brand-primary text-brand-secondary font-bold py-3 rounded-lg text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
                        >
                            Finalise
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}

export default StepFinalise
