'use client'

import { useState } from 'react'
import { AiReportPrompt, ReportFormData, ReportStructuredData } from '@/lib/types'
import StepForm from './StepForm'
import StepGenerate from './StepGenerate'
import StepFinalise from './StepFinalise'

interface Props {
    prompts: AiReportPrompt[]
}

const STEPS = [
    { number: 1, label: 'Details' },
    { number: 2, label: 'Preview' },
    { number: 3, label: 'Finalise' }
] as const

/**
 * Step indicator component
 * @param param current - Current step number
 * @returns Step indicator
 */
const StepIndicator = ({ current }: { current: 1 | 2 | 3 }) => (
    <div className="flex items-center gap-10">
        {STEPS.map(({ number, label }) => (
            <div key={number} className="flex items-center gap-10">
                <div className="flex flex-col items-center gap-1">
                    <div
                        className={
                            `w-12 h-12 rounded-full flex items-center justify-center text-md font-bold transition-colors ${current === number ? 'bg-brand-primary text-brand-secondary' : current > number ? 'bg-brand-primary/20 text-brand-primary' : 'bg-white/10 text-white/30'}`
                        }
                    >
                        {number}
                    </div>
                    <span className={
                        `text-sm transition-colors ${current === number ? 'text-white' : current > number ? 'text-white/40' : 'text-white/20'}`
                    }>
                        {label}
                    </span>
                </div>
                {number < STEPS.length && (
                    <div className={
                        `h-px w-12 mb-4 transition-colors ${current > number ? 'bg-brand-primary/40' : 'bg-white/10'}`
                    } />
                )}
            </div>
        ))}
    </div>
)


const ReportWizard = ({ prompts }: Props) => {
    const [step, setStep] = useState<1 | 2 | 3>(1)
    const [formData, setFormData] = useState<ReportFormData | null>(null)
    const [reportData, setReportData] = useState<ReportStructuredData | null>(null)

    const handleReset = () => {
        setFormData(null)
        setReportData(null)
        setStep(1)
    }

    const handleFormSubmit = (data: Omit<ReportFormData, 'uuid'>) => {
        setFormData({
            ...data,
            uuid: crypto.randomUUID()
        })
        setStep(2)
    }

    return (
        <div className="flex items-center flex-col gap-10">
            <div className="">
                <StepIndicator current={step} />
            </div>
            {step === 1 && (
                <div className="w-3/4">
                    <StepForm
                        prompts={prompts}
                        initialData={formData}
                        onSubmit={handleFormSubmit}
                    />
                </div>
            )}
            {step === 2 && formData && (
                <StepGenerate
                    formData={formData}
                    initialReportData={reportData}
                    onReportDataChange={setReportData}
                    onBack={() => setStep(1)}
                    onNext={() => setStep(3)}
                />
            )}
            {step === 3 && formData && reportData && (
                <div className="w-3/4">
                    <StepFinalise
                        formData={formData}
                        reportData={reportData}
                        onBack={() => setStep(2)}
                        onReset={handleReset}
                    />
                </div>
            )}
        </div>
    )
}

export default ReportWizard
