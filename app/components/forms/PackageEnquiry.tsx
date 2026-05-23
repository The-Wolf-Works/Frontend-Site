'use client'

import { useState } from 'react'
import { ModalContentProps } from '@/app/components/modal/Types'
import { icons } from '@/app/components/icons/Icons'

type Status = 'idle' | 'loading' | 'success' | 'error'

const inputClass = 'w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-brand-primary'

/**
 * Package enquiry modal — two modes driven by ctaBehaviour.
 *
 * confirm: email already sent on CTA click — renders confirmation message only.
 * enquire: pre-filled form (name, email, phone, comments) that POSTs to
 *          /api/package-enquiry on submit, then switches to a success state.
 *
 * @param data - ModalObject containing packageTitle, packagePrice, billingType,
 *               ctaBehaviour, reportUuid, clientName, clientEmail
 */
const PackageEnquiry = ({ data }: ModalContentProps) => {
    const {
        packageTitle = '',
        packagePrice = '',
        billingType,
        ctaBehaviour,
        ctaFormId,
        reportUuid,
        packageId,
        clientName,
        clientEmail,
        clientDomain,
    } = data

    const displayPrice = !packagePrice || packagePrice === '0' ? 'Free' : packagePrice

    const [form, setForm] = useState({ name: clientName ?? '', email: clientEmail ?? '', phone: '', comments: '' })
    const [status, setStatus] = useState<Status>('idle')
    const [error, setError] = useState<string | null>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setStatus('loading')
        setError(null)
        try {
            const res = await fetch('/api/package-enquiry', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    packageTitle,
                    packagePrice: displayPrice,
                    billingType,
                    ctaBehaviour,
                    reportUuid,
                    packageId,
                    clientName: form.name,
                    clientEmail: form.email,
                    clientDomain,
                    phone: form.phone,
                    comments: form.comments,
                }),
            })
            if (!res.ok) {
                const d = await res.json()
                throw new Error(d.error ?? 'Something went wrong')
            }
            setStatus('success')
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred')
            setStatus('error')
        }
    }

    // Confirm mode — email already sent on CTA click, show confirmation only
    // Enquire mode — success state after form submission
    if (ctaBehaviour === 'confirm' || status === 'success') {
        return (
            <div className="flex flex-col gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center mb-2">
                    <icons.check className="w-5 h-5 text-brand-primary" />
                </div>
                <h2 className="text-xl font-extrabold text-white">You&apos;re on the list</h2>
                <p className="text-white/60 text-sm leading-relaxed">
                    We&apos;ve received your interest in <span className="text-white font-medium">{packageTitle}</span> and will be in touch shortly.
                </p>
            </div>
        )
    }

    // Enquire mode — form
    return (
        <div>
            <h2 className="text-xl font-extrabold text-white mb-1">Tell us a bit more</h2>
            <p className="text-white/50 text-sm mb-6">We&apos;ll use this to get back to you about the right next step.</p>

            {/* Package badge */}
            <div className="flex items-center justify-between px-4 py-3 rounded-xl border border-white/10 bg-white/[0.03] mb-6">
                <span className="text-sm font-semibold text-white">{packageTitle}</span>
                <span className="text-sm text-brand-primary font-bold">
                    {displayPrice}{billingType && billingType !== 'free' ? ` / ${billingType}` : ''}
                </span>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="text"
                    name="name"
                    placeholder="Your name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className={inputClass}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Your email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className={inputClass}
                />
                <input
                    type="tel"
                    name="phone"
                    placeholder="Phone number (optional)"
                    value={form.phone}
                    onChange={handleChange}
                    className={inputClass}
                />
                <textarea
                    name="comments"
                    placeholder="Anything you'd like us to know?"
                    value={form.comments}
                    onChange={handleChange}
                    rows={4}
                    className={`${inputClass} resize-none`}
                />

                {error && <p className="text-red-400 text-sm">{error}</p>}

                <button
                    id={ctaFormId || undefined}
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full bg-brand-primary text-brand-secondary font-bold py-3 rounded-lg text-sm hover:opacity-90 transition-opacity disabled:opacity-50 cursor-pointer"
                >
                    {status === 'loading' ? 'Sending...' : 'Send enquiry'}
                </button>
            </form>
        </div>
    )
}

export default PackageEnquiry
