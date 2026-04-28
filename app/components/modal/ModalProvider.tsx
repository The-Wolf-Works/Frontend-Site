'use client'

import { createContext, useCallback, useMemo } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import ModalShell from './ModalShell'
import { modalRegistry } from './Registry'
import { ModalContextType, ModalObject } from './Types'

export const ModalContext = createContext<ModalContextType | null>(null)

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter()
    const searchParams = useSearchParams()

    // Derive modal state directly from URL — reactive to navigation and history changes
    const modalObj = useMemo<ModalObject | null>(() => {
        const rawModal = searchParams.get('modal')
        if (!rawModal) return null
        try { return JSON.parse(rawModal) } catch { return null }
    }, [searchParams])

    const openModal = useCallback((id: string, data?: Omit<ModalObject, 'id'>) => {
        const obj = { id, ...data }
        const params = new URLSearchParams(searchParams.toString())
        params.delete('modal')
        const rest = params.toString()
        router.replace(`?${rest ? `${rest}&` : ''}modal=${JSON.stringify(obj)}`, { scroll: false })
    }, [router, searchParams])

    const closeModal = useCallback(() => {
        const params = new URLSearchParams(searchParams.toString())
        params.delete('modal')
        const rest = params.toString()
        router.replace(rest ? `?${rest}` : window.location.pathname, { scroll: false })
    }, [router, searchParams])

    const modalId = modalObj?.id ?? null
    const ModalContent = modalId ? modalRegistry[modalId] : null

    return (
        <ModalContext.Provider value={{ openModal, closeModal }}>
            {children}
            {modalId && ModalContent && (
                <ModalShell onClose={closeModal}>
                    <ModalContent data={modalObj as ModalObject} />
                </ModalShell>
            )}
        </ModalContext.Provider>
    )
}
export default ModalProvider
