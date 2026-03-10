import { icons, type IconName } from '@/app/components/icons/Icons'
import type { HowItWorksSection } from '@/lib/types'

interface HowItWorksProps {
    block: HowItWorksSection
}

export const HowItWorks = ({ block }: HowItWorksProps) => {
    return (
        <>
            <style>{`
                @media (min-width: 1000px) {
                    .steps-grid {
                        grid-template-columns: repeat(${block.steps.length}, minmax(0, 1fr));
                    }
                }
            `}</style>

            <section
                className="bg-brand-secondary px-8 nav:px-20 py-12 grid gap-6 nav:h-[calc(100vh-var(--nav-height))]"
                style={{ gridTemplateRows: 'auto 1fr' }}
            >
                {/* Heading */}
                <div>
                    <p className="text-sm font-medium tracking-widest uppercase text-brand-primary mb-3">
                        Our process
                    </p>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-white">
                        How it <span className="text-brand-primary">works</span>
                    </h2>
                </div>

                {/* Step cards */}
                <div className="steps-grid grid grid-cols-1 gap-4 min-h-0">
                    {block.steps.map(({ step }, index) => {
                        const Icon = step.icon ? icons[step.icon as IconName] : null
                        const stepNumber = String(index + 1).padStart(2, '0')

                        return (
                            <div
                                key={index}
                                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-8 flex flex-col transition-all duration-500 hover:border-brand-primary/40"
                            >
                                {/* Top accent line on hover */}
                                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                {/* Decorative number — bleeds off top-right edge */}
                                <span className="pointer-events-none select-none absolute -top-6 -right-4 text-[9rem] font-extrabold leading-none text-white/[0.05] group-hover:text-brand-primary/10 transition-colors duration-500">
                                    {stepNumber}
                                </span>

                                {/* Step label */}
                                <p className="relative text-xs font-semibold tracking-widest uppercase text-brand-primary shrink-0">
                                    Step {stepNumber}
                                </p>

                                {/* Icon — pinned just below label */}
                                {Icon && (
                                    <div className="relative mt-8 shrink-0">
                                        <Icon
                                            className="w-28 h-28 text-white/20 group-hover:text-brand-primary transition-colors duration-500"
                                            strokeWidth={0.75}
                                        />
                                    </div>
                                )}

                                {/* Spacer */}
                                <div className="flex-1" />

                                {/* Text — pinned to bottom */}
                                <div className="relative shrink-0">
                                    <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                                    <p className="text-white/50 text-base leading-relaxed">{step.excerpt}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>

            </section>
        </>
    )
}

export default HowItWorks
