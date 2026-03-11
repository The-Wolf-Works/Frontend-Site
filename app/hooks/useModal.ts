import { useContext } from "react"
import { ModalContext } from "@/app/components/modal/ModalProvider"
import { ModalContextType } from "@/app/components/modal/Types"

export const useModal = (): ModalContextType => {
    const context = useContext(ModalContext)
    if(!context) throw new Error('useModal must be used within ModalProvider')
    return context
}
