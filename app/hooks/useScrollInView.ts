import { useEffect, useRef, useState } from 'react'

/**
 * Fires once when the element's top edge crosses the given viewport threshold (0–1).
 * Defaults to 0.5 — triggers when the section is halfway up the screen.
 */
const useScrollInView = (threshold = 0.5) => {
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

    return { ref, inView }
}

export default useScrollInView
