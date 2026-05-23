'use client'

import useEmblaCarousel from 'embla-carousel-react'
import { useCallback, useEffect, useState } from 'react'
import React from 'react'

interface Props {
    children: React.ReactNode
    desktopClassName?: string
    labels?: string
}

/**
 * Shows children as an Embla snap slider on mobile (one slide at a time,
 * with dot indicators). On desktop (nav breakpoint+) renders as a plain div
 * using the provided desktopClassName — typically a grid layout.
 *
 * @param desktopClassName - Layout classes applied on desktop, e.g. "nav:grid nav:grid-cols-3 nav:gap-5"
 */
const MobileSlider = ({ children, desktopClassName = '', labels }: Props) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'center', loop: false })
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

    useEffect(() => {
        if (!emblaApi) return
        const onInit = () => setScrollSnaps(emblaApi.scrollSnapList())
        const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap())
        emblaApi.on('init', onInit)
        emblaApi.on('select', onSelect)
        onInit()
        onSelect()
        return () => { emblaApi.off('init', onInit); emblaApi.off('select', onSelect) }
    }, [emblaApi])

    const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi])

    const items = React.Children.toArray(children)

    return (
        <>
            {/* Mobile — Embla slider */}
            <div className="nav:hidden flex flex-col gap-4">
                {/* Hint label */}
                {labels && (
                    <div className="flex items-center gap-2">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-primary/60 shrink-0">
                            <path d="M5 12h14M13 6l6 6-6 6" />
                        </svg>
                        <p className="text-white/30 text-xs font-medium tracking-wide">{labels}</p>
                    </div>
                )}
                <div ref={emblaRef}>
                    <div className="flex gap-4">
                        {items.map((child, i) => (
                            <div key={i} className="flex-[0_0_100%] min-w-0">
                                {child}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Dot indicators + label */}
                {scrollSnaps.length > 1 && (
                    <div className="flex items-center justify-center gap-3 pt-2">
                        {scrollSnaps.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => scrollTo(i)}
                                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                                    i === selectedIndex ? 'w-6 bg-brand-primary' : 'w-1.5 bg-white/20'
                                }`}
                            />
                        ))}
                        <span className="text-white/30 text-xs font-medium tabular-nums">
                            {selectedIndex + 1} / {scrollSnaps.length}
                        </span>
                    </div>
                )}
            </div>

            {/* Desktop — plain layout */}
            <div className={`hidden nav:grid ${desktopClassName}`}>
                {children}
            </div>
        </>
    )
}

export default MobileSlider
