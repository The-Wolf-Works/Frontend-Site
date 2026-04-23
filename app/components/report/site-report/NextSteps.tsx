'use client'

import Link from 'next/link'
import { CheckIcon } from '@heroicons/react/24/outline'
import useScrollInView from '@/app/hooks/useScrollInView'

interface NextStepOption {
    title: string
    price: string
    priceNote: string
    features: string[]
    ctaLabel: string
    ctaHref: string
    featured?: boolean
}

const options: NextStepOption[] = [
    {
        title: 'The Full Blueprint',
        price: '£97',
        priceNote: 'one-off',
        features: [
            'Complete website strategy report',
            '5-in-competition benchmarking sessions',
            'Website security & performance review',
            'Copywriting recommendations',
            'SEO audit & quick wins',
            'Traffic & conversion optimisation',
        ],
        ctaLabel: 'Get Started',
        ctaHref: '/#contact',
    },
    {
        title: 'The Wolf Pack',
        price: 'Free',
        priceNote: 'to get started',
        features: [
            'Website maintenance & performance monitoring',
            'Ongoing content & conversion testing',
            'Priority support',
            'Access to all premium resources',
        ],
        ctaLabel: 'Get Started',
        ctaHref: '/#contact',
        featured: true,
    },
]

const NextSteps = () => {
    const { ref, inView } = useScrollInView()
    const cols = options.length === 1 ? 'grid-cols-1 max-w-sm' : options.length === 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-3'

    const fadeUp = (delay: number) => ({
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(16px)',
        transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms`,
    })

    return (
        <section ref={ref} id="next-steps" className="min-h-screen flex flex-col border-t border-white/10 px-10 md:px-16 py-24 relative" style={{ background: 'rgba(0,0,0,0.15)' }}>

            {/* Background */}
            <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
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
                    {options.map((option, i) => (
                        <div
                            key={option.title}
                            className={`rounded-2xl p-8 flex flex-col gap-8 relative overflow-hidden ${
                                option.featured ? 'border border-brand-primary/30' : 'border border-white/10'
                            }`}
                            style={{
                                background: option.featured
                                    ? 'linear-gradient(135deg, rgba(94,252,141,0.08) 0%, rgba(0,207,224,0.05) 100%)'
                                    : 'rgba(255,255,255,0.03)',
                                ...fadeUp(100 + i * 100),
                            }}
                        >
                            {option.featured && (
                                <div
                                    className="absolute top-4 right-4 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full"
                                    style={{ background: 'rgba(94,252,141,0.12)', color: '#5EFC8D' }}
                                >
                                    Recommended
                                </div>
                            )}

                            {/* Title + price */}
                            <div className="flex flex-col gap-3">
                                <p className="text-xs font-semibold tracking-widest uppercase text-white/30">
                                    Option {String(i + 1).padStart(2, '0')}
                                </p>
                                <h3 className="text-xl font-bold text-white">{option.title}</h3>
                                <div className="flex items-baseline gap-1.5">
                                    <span className={`text-4xl font-extrabold ${option.featured ? 'text-brand-primary' : 'text-white'}`}>
                                        {option.price}
                                    </span>
                                    <span className="text-white/35 text-sm">{option.priceNote}</span>
                                </div>
                            </div>

                            {/* Features */}
                            <ul className="flex flex-col gap-3 flex-1">
                                {option.features.map(feature => (
                                    <li key={feature} className="flex items-start gap-3">
                                        <CheckIcon className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
                                        <span className={`text-sm leading-relaxed ${option.featured ? 'text-white/70' : 'text-white/55'}`}>
                                            {feature}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            {/* CTA */}
                            <Link
                                href={option.ctaHref}
                                className={`block text-center font-semibold px-6 py-3.5 rounded-xl text-sm transition-all ${
                                    option.featured
                                        ? 'bg-brand-primary text-brand-secondary hover:opacity-90'
                                        : 'border border-white/15 text-white hover:border-white/30 hover:bg-white/5'
                                }`}
                            >
                                {option.ctaLabel}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default NextSteps
