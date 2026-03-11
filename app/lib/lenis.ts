import type Lenis from 'lenis'

let instance: Lenis | null = null

export const setLenis = (lenis: Lenis) => { instance = lenis }
export const getLenis = () => instance
