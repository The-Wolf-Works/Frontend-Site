import Link from "next/link"
import HeroBackground from "./HeroBackground"
import type { HomepageHero } from "@/lib/types"

interface HeroProps {
    hero: HomepageHero
}

export const Hero = ({ hero }: HeroProps) => {
    return (
        <section className="relative h-[calc(100vh-var(--nav-height))] flex items-center overflow-hidden">
            {/* Gradient overlay — brand-secondary left, transparent right */}
            <div
                className="absolute inset-0 z-10"
                style={{
                    background: "linear-gradient(to right, #263038 30%, rgba(38,48,56,0.6) 60%, rgba(38,48,56,0.1) 100%)"
                }}
            />
            <HeroBackground />

            {/* Content */}
            <div className="relative z-10 w-full px-12 md:px-20">
                {/* Eyebrow */}
                <p className="text-sm font-medium tracking-widest uppercase text-brand-primary mb-4">
                    {hero.heroHeading}
                </p>
                {/* Main statement */}
                <h1 className="text-5xl min-[768px]:text-6xl min-[1024px]:text-7xl min-[1400px]:text-8xl font-extrabold text-white leading-tight mb-6">
                    {hero.heroStatement.firstLine}
                    <br />
                    <span className="text-brand-primary">{hero.heroStatement.secondLine}</span>
                </h1>
                {/* Subheading */}
                <p className="text-lg font-light text-white/70 max-w-md mb-10">
                    {hero.heroSubheading}
                </p>
                {/* CTA */}
                <div className="flex sm:flex-row flex-col gap-4 items-start">
                    <Link
                        href={hero.ctaUrl}
                        className="w-fit inline-block bg-brand-primary text-white text-base font-semibold tracking-wider px-8 py-4 rounded-lg hover:opacity-90 transition-opacity duration-200 whitespace-nowrap"
                    >
                        {hero.ctaLabel}
                    </Link>
                    <Link
                        href={hero.secondaryNavUrl}
                        className="w-fit inline-block outline outline-2 outline-white text-white text-base font-semibold tracking-wider px-8 py-4 rounded-lg hover:opacity-90 transition-opacity duration-200 whitespace-nowrap"
                    >
                        {hero.secondaryNavLabel}
                    </Link>
                </div>
            </div>
        </section>
    )
}
export default Hero
