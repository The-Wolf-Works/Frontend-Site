'use client'

import { createContext, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import ModalShell from './ModalShell'
import { modalRegistry } from './Registry'

export interface ModalObject {
    id: string
    [key: string]: string | undefined
}

interface ModalContextType {
    openModal: (id: string, data?: Omit<ModalObject, 'id'>) => void
    closeModal: () => void
}

export const ModalContext = createContext<ModalContextType | null>(null)

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter()
    const searchParams = useSearchParams()

    // Derive modal state by parsing the single modal param as a JSON object
    const rawModal = searchParams.get('modal')
    const modalObj: ModalObject | null = (() => {
        if (!rawModal) return null
        try { return JSON.parse(rawModal) } catch { return null }
    })()
    const modalId = modalObj?.id ?? null

    // Open a modal — serialise id + data as one JSON object in the URL
    const openModal = useCallback((id: string, data?: Omit<ModalObject, 'id'>) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set('modal', JSON.stringify({ id, ...data }))
        router.replace(`?${params.toString()}`)
    }, [router, searchParams])

    // Close modal — delete the single modal param
    const closeModal = useCallback(() => {
        const params = new URLSearchParams(searchParams.toString())
        params.delete('modal')
        router.replace(`?${params.toString()}`)
    }, [router, searchParams])

    // Get modal component from registry
    const ModalContent = modalId ? modalRegistry[modalId] : null

    return (
        <ModalContext.Provider value={{ openModal, closeModal }}>
            {children}
            {modalId && ModalContent && (
                <ModalShell onClose={closeModal}>
                    <ModalContent data={modalObj} />
                </ModalShell>
            )}
        </ModalContext.Provider>
    )
}
export default ModalProvider
