'use client'

import HeroBackground from './HeroBackground'
import PublicEntryForm from '@/app/components/report/site-report/PublicEntryForm'
import type { HomepageHero } from '@/lib/types'

interface HeroWithFormProps {
    hero: HomepageHero
}

const HeroWithForm = ({ hero }: HeroWithFormProps) => {
    return (
        <section className="relative h-[calc(100vh-var(--nav-height))] min-h-[400px] flex items-center overflow-hidden">
            {/* Gradient overlay — brand-secondary left, transparent right */}
            <div
                className="absolute inset-0 z-10"
                style={{
                    background: 'linear-gradient(to right, #263038 30%, rgba(38,48,56,0.6) 60%, rgba(38,48,56,0.1) 100%)'
                }}
            />

            {/* Bottom fade — blends into next section */}
            <div
                className="absolute inset-x-0 bottom-0 h-24 md:h-48 z-10 pointer-events-none"
                style={{ background: 'linear-gradient(to bottom, transparent, #263038)' }}
            />
            <HeroBackground />

            {/* Content */}
            <div className="relative z-20 w-full px-8 md:px-20">
                {/* Eyebrow */}
                <p className="text-sm font-medium tracking-widest uppercase text-brand-primary mb-4">
                    {hero.heroHeading}
                </p>
                {/* Main statement */}
                <h1 className="text-4xl min-[768px]:text-6xl min-[1024px]:text-7xl min-[1400px]:text-8xl font-extrabold text-white leading-tight mb-6">
                    {hero.heroStatement.firstLine}
                    <br />
                    <span className="text-brand-primary">{hero.heroStatement.secondLine}</span>
                </h1>
                {/* Subheading */}
                <p className="text-base md:text-lg font-light text-white/70 max-w-lg mb-8">
                    Enter your domain and get a full AI-powered diagnostic of your website covering conversion, SEO, UX, and growth opportunities. Free. No sign-up needed.
                </p>
                {/* Trust signals */}
                <div className="flex flex-wrap gap-x-6 gap-y-2 mb-10">
                    {[
                        '8 areas analysed',
                        'Ready in 30 seconds',
                        'AI-powered insights',
                        'No account required',
                    ].map(item => (
                        <span key={item} className="flex items-center gap-2 text-sm text-white/50">
                            <span className="w-1 h-1 rounded-full bg-brand-primary flex-shrink-0" />
                            {item}
                        </span>
                    ))}
                </div>
                {/* Form */}
                <div className="max-w-md">
                    <PublicEntryForm />
                </div>
            </div>
        </section>
    )
}

export default HeroWithForm
