'use client'

import type { Testimonial } from '@/lib/types'
import Testimonials from '@/app/components/blocks/Testimonials'
import useScrollInView from '@/app/hooks/useScrollInView'

interface Props {
    testimonials: Testimonial[]
}

/**
 * Wraps the shared Testimonials carousel for use in the site report page.
 * Fades and slides in on scroll entry. Renders nothing if the testimonials array is empty.
 *
 * @param testimonials - Array of Testimonial objects fetched from WordPress.
 */
const TestimonialsSection = ({ testimonials }: Props) => {
    const { ref, inView } = useScrollInView()

    if (!testimonials.length) return null

    return (
        <section
            ref={ref}
            id="testimonials"
            className="flex flex-col border-t border-white/5"
            style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.6s ease 0ms, transform 0.6s ease 0ms',
            }}
        >
            <Testimonials testimonials={testimonials} slidesPerView={{ mobile: 1, desktop: 2 }} />
        </section>
    )
}

export default TestimonialsSection
