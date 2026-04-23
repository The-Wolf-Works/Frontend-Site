import { useEffect, useRef, useState } from 'react'

/**
 * Fires once when the element's top edge crosses the given viewport threshold (0–1).
 * Defaults to 0.6 — triggers when the section is 60% up the screen.
 *
 * Also returns `fadeUp(delay)` — a ready-made inline style for fade+slide animations
 * that respond to inView, so components don't need to redefine it locally.
 */
const useScrollInView = (threshold = 0.6) => {
    const ref = useRef<HTMLElement>(null)
    const [inView, setInView] = useState(false)

    useEffect(() => {
        const el = ref.current
        if (!el) return
        const check = () => {
            if (el.getBoundingClientRect().top <= window.innerHeight * threshold) {
                setInView(true)
                window.removeEventListener('scroll', check)
            }
        }
        check()
        window.addEventListener('scroll', check, { passive: true })
        return () => window.removeEventListener('scroll', check)
    }, [threshold])

    const fadeUp = (delay = 0) => ({
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(16px)',
        transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms`,
    })

    return { ref, inView, fadeUp }
}

export default useScrollInView
