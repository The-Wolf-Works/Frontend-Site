'use client'

import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import type { Testimonial } from '@/lib/types'

interface TestimonialsProps {
    testimonials: Testimonial[]
    slidesPerView?: { mobile?: number; desktop?: number }
    placeholderPhoto?: string
}

export default function Testimonials({ testimonials, slidesPerView, placeholderPhoto }: TestimonialsProps) {
    const { mobile = 1, desktop = 3 } = slidesPerView ?? {}
    const [activeSlides, setActiveSlides] = useState(mobile)

    const autoplay = useRef(Autoplay({ delay: 5000, stopOnInteraction: false }))

    const [selectedIndex, setSelectedIndex] = useState(0)

    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center' }, [autoplay.current])

    useEffect(() => {
        if (!emblaApi) return
        const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap())
        emblaApi.on('select', onSelect)
        onSelect()
        return () => { emblaApi.off('select', onSelect) }
    }, [emblaApi])

    const scrollPrev = useCallback(() => {
        emblaApi?.scrollPrev()
        autoplay.current.reset()
    }, [emblaApi])

    const scrollNext = useCallback(() => {
        emblaApi?.scrollNext()
        autoplay.current.reset()
    }, [emblaApi])

    useEffect(() => {
        const update = () => setActiveSlides(window.innerWidth >= 1000 ? desktop : mobile)
        update()
        window.addEventListener('resize', update)
        return () => window.removeEventListener('resize', update)
    }, [mobile, desktop])

    if (!testimonials.length) return null

    return (
        <section
            className="bg-brand-secondary py-20 scroll-mt-[var(--nav-height)] overflow-x-hidden"
            id="testimonials"
        >
            {/* Heading */}
            <div className="px-8 nav:px-20 mb-12 flex items-end justify-between">
                <div>
                    <p className="text-sm font-medium tracking-widest uppercase text-brand-primary mb-3">
                        Testimonials
                    </p>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-white">
                        What our <span className="text-brand-primary">clients</span> say
                    </h2>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={scrollPrev}
                        className="w-12 h-12 cursor-pointer rounded-full border border-white/10 bg-white/[0.03] flex items-center justify-center text-white/50 hover:border-brand-primary hover:bg-brand-primary hover:text-brand-secondary transition-all duration-300 group"
                        aria-label="Previous"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M15 18l-6-6 6-6" />
                        </svg>
                    </button>
                    <button
                        onClick={scrollNext}
                        className="w-12 h-12 cursor-pointer rounded-full border border-white/10 bg-white/[0.03] flex items-center justify-center text-white/50 hover:border-brand-primary hover:bg-brand-primary hover:text-brand-secondary transition-all duration-300 group"
                        aria-label="Next"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 18l6-6-6-6" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Carousel */}
            <div
                ref={emblaRef}
                className="py-4 px-12 nav:px-0 carousel-mask"
            >
                <div className="flex ml-[-24px]">
                    {testimonials.map((t, index) => {
                        const photoSrc = t.photo?.node?.sourceUrl ?? placeholderPhoto
                        const photoAlt = t.photo?.node?.altText || t.clientName

                        return (
                            <div
                                key={index}
                                style={{ flex: `0 0 ${100 / activeSlides}%`, minWidth: 0 }}
                                className="pl-6 cursor-grab active:cursor-grabbing"
                            >
                                <div className={`rounded-2xl border bg-[#1e2a31] p-8 flex flex-col gap-5 relative overflow-hidden transition-all duration-500 select-none ${index === selectedIndex ? 'border-brand-primary/40 shadow-[0_0_10px_1px_rgba(94,252,141,0.18)] scale-[1.03]' : 'border-white/10'}`}>

                                    {/* Top accent line */}
                                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-primary/50 to-transparent" />

                                    {/* Decorative background quote mark */}
                                    <span className="absolute top-3 right-5 text-8xl font-serif leading-none text-white/[0.04] select-none pointer-events-none">&rdquo;</span>

                                    {/* Quote text */}
                                    <p className="text-white text-lg leading-relaxed flex-1 relative z-10">
                                        &ldquo;{t.quote}&rdquo;
                                    </p>

                                    {/* Person */}
                                    <div className="flex items-center gap-3 relative z-10">
                                        {photoSrc && (
                                            <div className="relative w-11 h-11 rounded-full overflow-hidden ring-2 ring-brand-primary/30 flex-shrink-0">
                                                <Image
                                                    src={photoSrc}
                                                    alt={photoAlt}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                        )}
                                        <div>
                                            <p className="text-white font-bold text-sm">{t.clientName}</p>
                                            <p className="text-brand-primary/70 text-xs mt-0.5">
                                                {[t.role, t.company].filter(Boolean).join(' · ')}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

        </section>
    )
}
