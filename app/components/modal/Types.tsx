export interface ModalObject {
    id: string
    [key: string]: string | undefined
}

export interface ModalContextType {
    openModal: (id: string, data?: Omit<ModalObject, 'id'>) => void
    closeModal: () => void
}

export interface ModalContentProps {
    data: ModalObject
}
