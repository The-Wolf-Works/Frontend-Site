import Link from "next/link"
import type { HomepageHero } from "@/lib/types"
import HeroImagePanel from "./HeroImagePanel"

interface HeroProps {
    hero: HomepageHero
}

export const Hero = ({ hero }: HeroProps) => {
    return (
        <section className="h-[calc(100vh-var(--nav-height))] flex bg-white overflow-hidden">
            {/* Content Column */}
            <div className="flex-1 flex items-center px-12 md:px-20 relative z-10">
                <div className="w-full">
                    {/* Eyebrow */}
                    <p className="text-sm font-medium tracking-widest uppercase text-brand-primary mb-4">
                        {hero.heroHeading}
                    </p>
                    {/* Main statement */}
                    <h1 className="text-5xl min-[768px]:text-6xl min-[1175px]:text-7xl min-[1475px]:text-8xl font-extrabold text-gray-900 leading-tight mb-6">
                        {hero.heroStatement.firstLine}
                        <br />
                        <span className="text-brand-primary">{hero.heroStatement.secondLine}</span>
                    </h1>
                    {/* Subheading */}
                    <p className="text-lg font-light text-gray-500 mb-8">
                        {hero.heroSubheading}
                    </p>
                    {/* CTA */}
                    <div className="flex sm:flex-row flex-col gap-4 items-start">
                        <Link
                            href={hero.ctaUrl}
                            className="w-fit inline-block bg-brand-primary text-white text-sm font-semibold tracking-wider px-8 py-4 rounded-lg hover:opacity-90 transition-opacity duration-200 whitespace-nowrap"
                        >
                            {hero.ctaLabel}
                        </Link>
                        <Link
                            href={hero.secondaryNavUrl}
                            className="w-fit inline-block outline outline-2 outline-brand-secondary text-brand-secondary text-sm font-semibold tracking-wider px-8 py-4 rounded-lg hover:opacity-90 transition-opacity duration-200 whitespace-nowrap"
                        >
                            {hero.secondaryNavLabel}
                        </Link>
                    </div>
                </div>
            </div>
            {/* Image Panel */}
            <HeroImagePanel />
        </section>
    )
}
export default Hero
