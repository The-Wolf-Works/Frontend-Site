import Link from "next/link"
import type { HomepageHero } from "@/lib/types"

interface HeroProps {
    hero: HomepageHero
}

export const Hero = ({ hero }: HeroProps) => {
    return (

        <section className="h-[calc(100vh-var(--nav-height))] flex items-center bg-brand-secondary">
            <div className="max-w-4xl mx-auto px-12">
                {/* Eyebrow */}
                <p className="text-sm font-medium tracking-widest uppercase text-gray-400 mb-6">
                    {hero.heroHeading}
                </p>
                <hr className="w-1/2 border-brand-primary my-6" />
                {/* Main statement */}
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-dark-mode leading-tight mb-6">
                    {hero.heroStatement.firstLine}
                    <br />
                    <span className="text-teal-400">{hero.heroStatement.secondLine}</span>
                </h1>
                {/* Subheading */}
                <p className="text-lg font-light text-gray-300 max-w-2xl mb-10">
                    {hero.heroSubheading}
                </p>
                {/* CTA */}
                <div className="flex sm:flex-row flex-col gap-4 items-start">
                    <Link
                        href={hero.ctaUrl}
                        className="w-fit inline-block bg-brand-primary text-white text-sm font-semibold tracking-wider px-8 py-4 rounded-lg hover:opacity-90 transition-opacity duration-200"
                    >
                        {hero.ctaLabel}
                    </Link>
                    <Link
                        href={hero.secondaryNavUrl}
                        className="w-fit inline-block bg-brand-secondary outline outline-2 outline-white text-white text-sm font-semibold tracking-wider px-8 py-4 rounded-lg hover:opacity-90 transition-opacity duration-200"
                    >
                        {hero.secondaryNavLabel}
                    </Link>
                </div>
            </div>
        </section>
    )
}
export default Hero
