import Image from 'next/image'
import type { WhyTheWolfWorksBlock } from '@/lib/types'

interface WhyTheWolfWorksProps {
    block: WhyTheWolfWorksBlock
}

export const WhyTheWolfWorks = ({ block }: WhyTheWolfWorksProps) => {
    const taglineParts = block.tagline?.split('·').map(s => s.trim()).filter(Boolean) ?? []

    return (
        <section className="bg-brand-secondary border-t border-white/5 grid nav:grid-cols-[55fr_45fr] nav:h-[calc(100vh-var(--nav-height))]">

            {/* Left — text */}
            <div className="flex flex-col justify-center px-8 nav:px-20 py-12 gap-6 border-r border-white/5">

                {/* Eyebrow */}
                <p className="text-sm font-medium tracking-widest uppercase text-brand-primary">
                    {block.subHeading}
                </p>

                {/* Heading */}
                <h2 className="text-4xl nav:text-5xl font-extrabold text-white leading-[1.05]">
                    <span className="text-sm font-medium tracking-widest uppercase text-brand-primary mb-3">Why</span>
                    <br />The Wolf
                    <span className="text-brand-primary"> Works</span>
                </h2>

                {/* Accent line */}
                <div className="w-10 h-0.5 bg-brand-primary" />

                {/* WYSIWYG body */}
                <div
                    className="[&_p]:text-white/55 [&_p]:leading-relaxed [&_p]:mb-3 [&_p]:text-base [&_strong]:text-white [&_strong]:font-semibold [&_strong]:text-base [&_em]:italic [&_em]:text-base"
                    dangerouslySetInnerHTML={{ __html: block.content }}
                />

                {/* Tagline chips */}
                {taglineParts.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {taglineParts.map((part, i) => (
                            <span
                                key={i}
                                className="px-4 py-1.5 rounded-full border border-brand-primary/30 bg-brand-primary/5 text-brand-primary text-xs font-semibold tracking-wider"
                            >
                                {part}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            {/* Right — wolf with radial gradient glow */}
            <div
                className="relative flex items-center justify-center min-h-[380px]"
                style={{ background: 'radial-gradient(circle at center, rgba(94,252,141,0.07) 0%, rgba(38,48,56,0.5) 60%, #263038 100%)' }}
            >
                {block.image?.node?.sourceUrl && (
                    <Image
                        src={block.image.node.sourceUrl}
                        alt={block.image.node.altText || 'The Wolf Works'}
                        fill
                        className="object-contain p-10"
                        style={{ filter: 'brightness(0) invert(1)' }}
                    />
                )}
            </div>

        </section>
    )
}

export default WhyTheWolfWorks
