'use client'

import { createContext, useCallback, useState, useEffect, startTransition } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import ModalShell from './ModalShell'
import { modalRegistry } from './Registry'
import { ModalContextType, ModalObject } from './Types'

export const ModalContext = createContext<ModalContextType | null>(null)

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter()
    const searchParams = useSearchParams()

    // React state drives rendering — immediate, no router delay
    const [modalObj, setModalObj] = useState<ModalObject | null>(null)

    // Initialise from URL on mount only (e.g. direct link with ?modal=...)
    useEffect(() => {
        const rawModal = searchParams.get('modal')
        if (rawModal) {
            startTransition(() => {
                try { setModalObj(JSON.parse(rawModal)) } catch { }
            })
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    // Open modal — update state immediately, sync URL in background
    const openModal = useCallback((id: string, data?: Omit<ModalObject, 'id'>) => {
        const obj = { id, ...data }
        setModalObj(obj)
        startTransition(() => {
            const params = new URLSearchParams(searchParams.toString())
            params.delete('modal')
            const rest = params.toString()
            router.replace(`?${rest ? `${rest}&` : ''}modal=${JSON.stringify(obj)}`, { scroll: false })
        })
    }, [router, searchParams])

    // Close modal — update state immediately, sync URL in background
    const closeModal = useCallback(() => {
        setModalObj(null)
        startTransition(() => {
            const params = new URLSearchParams(searchParams.toString())
            params.delete('modal')
            const rest = params.toString()
            router.replace(rest ? `?${rest}` : window.location.pathname, { scroll: false })
        })
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
