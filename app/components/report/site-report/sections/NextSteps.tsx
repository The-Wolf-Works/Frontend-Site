'use client'

import { useState, useEffect } from 'react'
import { icons } from '@/app/components/icons/Icons'
import useScrollInView from '@/app/hooks/useScrollInView'
import { DotGrid } from '@/app/components/report/site-report/SectionLabel'
import { useModal } from '@/app/hooks/useModal'
import { ServicePackage } from '@/lib/types'

interface Props {
    packages: ServicePackage[]
    reportUuid: string
    clientName: string
    clientEmail: string
    clientDomain: string
    actionedPackages: number[]
}

/**
 * Closing section presenting service packages fetched from WordPress.
 * Each card is driven by the service_package CPT — update packages in the WP admin.
 * Cards stack on mobile and spread into a 2- or 3-column grid on desktop.
 * The featured card is highlighted with a brand-primary gradient border.
 *
 * @param packages   - Array of service packages from the WP GraphQL API, sorted by order
 * @param reportUuid  - UUID of the current report, passed to the enquiry modal
 * @param clientName  - Client name from the report, used to pre-fill the enquiry form
 * @param clientEmail - Client email from the report, used to pre-fill the enquiry form
 */
const NextSteps = ({ packages, reportUuid, clientName, clientEmail, clientDomain, actionedPackages }: Props) => {
    const { ref, fadeUp } = useScrollInView()
    const { openModal } = useModal()
    const [loadingId, setLoadingId] = useState<number | null>(null)
    const [clickedIds, setClickedIds] = useState<number[]>(actionedPackages)

    useEffect(() => {
        const handler = (e: Event) => {
            const { packageId } = (e as CustomEvent<{ packageId: number }>).detail
            setClickedIds(prev => prev.includes(packageId) ? prev : [...prev, packageId])
        }
        window.addEventListener('package-actioned', handler)
        return () => window.removeEventListener('package-actioned', handler)
    }, [])

    const sorted = [...packages].sort((a, b) => a.packageDetails.order - b.packageDetails.order)

    const cols =
        sorted.length === 1 ? 'grid-cols-1 max-w-sm' :
        sorted.length === 2 ? 'grid-cols-1 md:grid-cols-2' :
        'grid-cols-1 md:grid-cols-3'

    const handleCta = async (pkg: ServicePackage) => {
        const { packageDetails, databaseId, title } = pkg
        const { ctaBehaviour, billingType, price, currencySymbol, ctaFormId } = packageDetails
        const currency = currencySymbol || '£'
        const isFree = billingType === 'free' || !price
        const displayPrice = isFree ? 'Free' : `${currency}${price}`

        const normalisedBehaviour = String(ctaBehaviour ?? '').toLowerCase()

        const modalData = {
            packageTitle: title,
            packagePrice: displayPrice,
            billingType: billingType ?? '',
            ctaBehaviour: normalisedBehaviour,
            ctaFormId: ctaFormId ?? '',
            reportUuid,
            clientName,
            clientEmail,
            clientDomain,
        }

        if (normalisedBehaviour === 'enquire') {
            openModal('package-enquiry', { ...modalData, packageId: String(databaseId) })
            return
        }

        // Confirm mode — fire email immediately, then open confirmation modal
        setLoadingId(databaseId)
        try {
            await fetch('/api/package-enquiry', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    packageTitle: title,
                    packagePrice: displayPrice,
                    billingType: billingType ?? '',
                    ctaBehaviour: normalisedBehaviour,
                    reportUuid,
                    packageId: databaseId,
                    clientName,
                    clientEmail,
                    clientDomain,
                }),
            })
        } finally {
            setLoadingId(null)
            setClickedIds(prev => [...prev, databaseId])
            openModal('package-enquiry', modalData)
        }
    }

    return (
        <section ref={ref} id="next-steps" className="min-h-screen flex flex-col border-t border-white/10 px-10 md:px-16 py-24 relative" style={{ background: 'rgba(0,0,0,0.15)' }}>

            {/* Background */}
            <DotGrid />
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(94,252,141,0.06) 0%, transparent 55%)' }} />

            <div className="relative flex flex-col justify-between flex-1 gap-16 max-w-5xl mx-auto w-full">

                {/* Header */}
                <div className="flex flex-col gap-3" style={fadeUp(0)}>
                    <p className="text-xs font-semibold tracking-[0.25em] uppercase text-brand-primary">What Happens Next</p>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">Choose your<br />next step.</h2>
                    <p className="text-white/40 text-sm font-light tracking-wide max-w-md">Two options to help you grow — pick what works for you.</p>
                </div>

                {/* Cards */}
                <div className={`grid ${cols} gap-6 flex-1 items-stretch`}>
                    {sorted.map((pkg, i) => {
                        const { subtitle, featured, featuredLabel, price, currencySymbol, originalPrice, billingType, features, ctaLabel, ctaId } = pkg.packageDetails
                        const currency = currencySymbol || '£'
                        const isFree = billingType === 'free' || !price
                        const displayPrice = isFree ? 'Free' : `${currency}${price}`
                        const isFeatured = !!featured
                        const isLoading = loadingId === pkg.databaseId
                        const isClicked = clickedIds.includes(pkg.databaseId)

                        return (
                            <div
                                key={pkg.databaseId}
                                className={`rounded-2xl p-8 flex flex-col gap-8 relative overflow-hidden ${
                                    isFeatured ? 'border border-brand-primary/30' : 'border border-white/10'
                                }`}
                                style={{
                                    background: isFeatured
                                        ? 'linear-gradient(135deg, rgba(94,252,141,0.08) 0%, rgba(0,207,224,0.05) 100%)'
                                        : 'rgba(255,255,255,0.03)',
                                    ...fadeUp(100 + i * 100),
                                }}
                            >
                                {isFeatured && featuredLabel && (
                                    <div
                                        className="absolute top-4 right-4 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full"
                                        style={{ background: 'rgba(94,252,141,0.12)', color: '#5EFC8D' }}
                                    >
                                        {featuredLabel}
                                    </div>
                                )}

                                {/* Title + price */}
                                <div className="flex flex-col gap-3">
                                    <p className="text-xs font-semibold tracking-widest uppercase text-white/30">
                                        Option {String(i + 1).padStart(2, '0')}
                                    </p>
                                    <h3 className="text-xl font-bold text-white">{pkg.title}</h3>
                                    {subtitle && (
                                        <p className="text-white/40 text-sm">{subtitle}</p>
                                    )}
                                    <div className="flex items-baseline gap-2">
                                        <span className={`text-4xl font-extrabold ${isFeatured ? 'text-brand-primary' : 'text-white'}`}>
                                            {displayPrice}
                                        </span>
                                        {originalPrice != null && originalPrice > 0 && (
                                            <span className="text-white/30 text-lg line-through">{currency}{originalPrice}</span>
                                        )}
                                        {billingType && !isFree && (
                                            <span className="text-white/35 text-sm">{billingType}</span>
                                        )}
                                    </div>
                                </div>

                                {/* Features */}
                                <ul className="flex flex-col gap-3 flex-1">
                                    {features.map((f, fi) => (
                                        <li key={fi} className="flex items-start gap-3">
                                            <icons.check className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
                                            <span className={`text-sm leading-relaxed ${isFeatured ? 'text-white/70' : 'text-white/55'}`}>
                                                {f.text}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                {/* CTA */}
                                <button
                                    id={ctaId || undefined}
                                    type="button"
                                    onClick={() => handleCta(pkg)}
                                    disabled={isLoading || isClicked}
                                    className={`w-full text-center font-semibold px-6 py-3.5 rounded-xl text-sm transition-all disabled:cursor-not-allowed disabled:opacity-40 ${
                                        isClicked ? 'cursor-not-allowed' : 'cursor-pointer'
                                    } ${
                                        isFeatured
                                            ? 'bg-brand-primary text-brand-secondary hover:opacity-90'
                                            : 'border border-white/15 text-white hover:border-white/30 hover:bg-white/5'
                                    }`}
                                >
                                    {isLoading ? 'Sending...' : isClicked ? 'Done' : ctaLabel}
                                </button>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default NextSteps
