import type { Testimonial } from '@/lib/types'
import Testimonials from '@/app/components/blocks/Testimonials'

interface Props {
    testimonials: Testimonial[]
}

const TestimonialsSection = ({ testimonials }: Props) => {
    if (!testimonials.length) return null

    return (
        <section id="testimonials" className="min-h-screen flex flex-col justify-center border-t border-white/10">
            <Testimonials testimonials={testimonials} slidesPerView={{ mobile: 1, desktop: 2 }} />
        </section>
    )
}

export default TestimonialsSection
