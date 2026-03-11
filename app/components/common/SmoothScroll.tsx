'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'

export const SmoothScroll = () => {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        })

        const handleAnchorClick = (e: MouseEvent) => {
            const anchor = (e.target as HTMLElement).closest('a')
            if (!anchor) return

            const href = anchor.getAttribute('href')
            if (!href?.startsWith('#')) return

            const element = document.getElementById(href.slice(1))
            if (!element) return

            e.preventDefault()
            lenis.scrollTo(element, { offset: 0, duration: 1.4, lock: true })
        }

        document.addEventListener('click', handleAnchorClick)

        const raf = (time: number) => {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }
        requestAnimationFrame(raf)

        return () => {
            document.removeEventListener('click', handleAnchorClick)
            lenis.destroy()
        }
    }, [])

    return null
}

export default SmoothScroll
