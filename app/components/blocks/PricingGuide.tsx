import { CheckIcon } from '@heroicons/react/24/outline'
import type { PricingGuideBlock } from '@/lib/types'
import ModalButton from "@/app/components/modal/ModalButton"

interface PricingGuideProps {
    block: PricingGuideBlock
}

export const PricingGuide = ({ block }: PricingGuideProps) => {
    return (
        <section
            className="bg-brand-secondary border-t border-white/5 px-8 nav:px-20 py-12 scroll-mt-[var(--nav-height)]"
            id='pricing-guide'
        >

            {/* Heading */}
            <div className="mb-8">
                <p className="text-sm font-medium tracking-widest uppercase text-brand-primary mb-3">
                    Plans
                </p>
                <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
                    Pricing <span className="text-brand-primary">Guide</span>
                </h2>
            </div>

            {/* Plan cards */}
            <div className="grid grid-cols-1 nav:grid-cols-3 gap-5">
                {block.plans.map(({ plan }, index) => (
                    <div
                        key={index}
                        className={`group relative rounded-2xl border flex flex-col transition-all duration-500 overflow-hidden ${
                            plan.featured
                                ? 'border-brand-primary bg-brand-primary/5 shadow-[0_0_60px_rgba(94,252,141,0.12)] nav:-my-6'
                                : 'border-white/10 bg-white/[0.04] hover:border-white/20'
                        }`}
                    >
                        {/* Top accent line */}
                        <div className={`absolute inset-x-0 top-0 h-px ${
                            plan.featured
                                ? 'bg-gradient-to-r from-transparent via-brand-primary to-transparent'
                                : 'bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500'
                        }`} />

                        {/* Most popular badge */}
                        {plan.featured && (
                            <div className="absolute -top-px left-1/2 -translate-x-1/2">
                                <span className="inline-block bg-brand-primary text-black text-xs font-bold tracking-widest uppercase px-4 py-1 rounded-b-lg whitespace-nowrap">
                                    Most Popular
                                </span>
                            </div>
                        )}

                        {/* Header */}
                        <div className={`px-7 pb-5 ${plan.featured ? 'pt-12' : 'pt-8'}`}>
                            <p className={`text-sm font-bold tracking-widest uppercase mb-2 ${plan.featured ? 'text-brand-primary' : 'text-white/40'}`}>
                                {plan.title}
                            </p>
                            <p className={`text-3xl font-extrabold tracking-tight leading-tight ${plan.featured ? 'text-brand-primary' : 'text-white'}`}>
                                {plan.price}
                            </p>
                            <p className="text-white/55 text-base leading-snug mt-3">
                                {plan.description}
                            </p>
                        </div>

                        {/* Primary feature callout */}
                        {plan.primaryFeature && (
                            <div className="px-7 pb-4">
                                <p className="text-white/60 text-sm leading-snug border-l-2 border-brand-primary/50 pl-3 italic">
                                    {plan.primaryFeature}
                                </p>
                            </div>
                        )}

                        {/* Divider */}
                        <div className={`mx-7 h-px ${plan.featured ? 'bg-brand-primary/20' : 'bg-white/10'}`} />

                        {/* Features */}
                        <ul className="px-7 py-5 flex flex-col gap-2.5 flex-1">
                            {plan.features.map(({ feature }, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <CheckIcon
                                        style={{ width: 16, height: 16, flexShrink: 0, marginTop: 3 }}
                                        className="text-brand-primary"
                                        strokeWidth={2.5}
                                    />
                                    <span className="text-white/70 text-sm leading-snug">{feature}</span>
                                </li>
                            ))}
                        </ul>

                        {/* CTA + Best for */}
                        <div className={`px-7 pb-7 pt-4 flex flex-col gap-5 border-t ${plan.featured ? 'border-brand-primary/20' : 'border-white/10'}`}>
                            <ModalButton
                                modalId={plan.modalTrigger}
                                data={{ plan: plan.title }}
                                className={`w-full py-3.5 rounded-full font-bold text-sm tracking-wider transition-all duration-500 cursor-pointer ${
                                    plan.featured
                                        ? 'bg-brand-primary text-black hover:bg-white'
                                        : 'border border-white/25 text-white hover:border-brand-primary hover:text-brand-primary'
                                }`}
                            >
                                {plan.ctaLabel}
                            </ModalButton>

                            <div>
                                <p className="text-xs font-bold tracking-widest uppercase text-brand-primary mb-1.5">
                                    Best for
                                </p>
                                <p className="text-white/55 text-sm leading-relaxed">
                                    {plan.bestFor}
                                </p>
                            </div>
                        </div>

                    </div>
                ))}
            </div>

        </section>
    )
}

export default PricingGuide
