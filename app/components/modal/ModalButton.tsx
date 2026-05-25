'use client'

import { useModal } from '@/app/hooks/useModal'
import type { ModalObject } from './Types'

interface ModalButtonProps {
    modalId: string
    data?: Omit<ModalObject, 'id'>
    className?: string
    children: React.ReactNode
}

// Component to open a modal when clicked
export function ModalButton({ modalId, data, className, children }: ModalButtonProps) {
    const { openModal } = useModal()

    return (
        <button
            onClick={() => openModal(modalId, data)}
            className={className}
        >
            {children}
        </button>
    )
}
export default ModalButton
