'use client'

import type { Testimonial } from '@/lib/types'
import Testimonials from '@/app/components/blocks/Testimonials'
import useScrollInView from '@/app/hooks/useScrollInView'

interface Props {
    testimonials: Testimonial[]
}

const TestimonialsSection = ({ testimonials }: Props) => {
    const { ref, inView } = useScrollInView()

    if (!testimonials.length) return null

    return (
        <section
            ref={ref}
            id="testimonials"
            className="min-h-screen flex flex-col justify-center"
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
