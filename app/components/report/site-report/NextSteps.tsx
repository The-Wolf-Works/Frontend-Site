import Link from 'next/link'
import { CheckIcon } from '@heroicons/react/24/outline'

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
    const cols = options.length === 1 ? 'grid-cols-1 max-w-sm' : options.length === 2 ? 'grid-cols-2' : 'grid-cols-3'

    return (
        <section id="next-steps" className="min-h-screen flex flex-col justify-center border-t border-white/10 px-8 py-20">
            <div className="max-w-3xl mx-auto w-full">
                <div className="text-center mb-10">
                    <p className="text-xs font-semibold tracking-widest uppercase text-brand-primary mb-2">What Happens Next</p>
                    <h2 className="text-2xl font-extrabold text-white">Choose Your Next Step</h2>
                    <p className="text-white/40 text-sm mt-2">Two options to help you grow — pick what works for you.</p>
                </div>

                <div className={`grid ${cols} gap-4`}>
                    {options.map((option, i) => (
                        <div
                            key={option.title}
                            className={`rounded-2xl p-6 flex flex-col gap-5 relative overflow-hidden ${
                                option.featured
                                    ? 'border border-brand-primary/30'
                                    : 'border border-white/10'
                            }`}
                            style={{
                                background: option.featured
                                    ? 'linear-gradient(135deg, rgba(94,252,141,0.08) 0%, rgba(0,207,224,0.05) 100%)'
                                    : 'rgba(255,255,255,0.03)',
                            }}
                        >
                            {option.featured && (
                                <div
                                    className="absolute top-3 right-3 text-xs font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full"
                                    style={{ background: 'rgba(94,252,141,0.12)', color: '#5EFC8D' }}
                                >
                                    Recommended
                                </div>
                            )}

                            <div>
                                <p className="text-xs font-semibold tracking-widest uppercase text-white/35 mb-1">
                                    Option {String(i + 1).padStart(2, '0')}
                                </p>
                                <h3 className="text-lg font-bold text-white">{option.title}</h3>
                                <div className="flex items-baseline gap-1 mt-2">
                                    <span className={`text-3xl font-extrabold ${option.featured ? 'text-brand-primary' : 'text-white'}`}>
                                        {option.price}
                                    </span>
                                    <span className="text-white/35 text-sm">{option.priceNote}</span>
                                </div>
                            </div>

                            <ul className="flex flex-col gap-2.5 flex-1">
                                {option.features.map(feature => (
                                    <li key={feature} className="flex items-start gap-2.5">
                                        <CheckIcon className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
                                        <span className={`text-sm ${option.featured ? 'text-white/70' : 'text-white/60'}`}>
                                            {feature}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            <Link
                                href={option.ctaHref}
                                className={`block text-center font-semibold px-5 py-2.5 rounded-lg text-sm transition-all ${
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
