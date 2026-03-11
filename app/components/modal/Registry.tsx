import type { ModalObject } from "./ModalProvider"

interface ModalContentProps {
    data: ModalObject
}

type ModalContentComponent = (props: ModalContentProps) => React.ReactNode

export const modalRegistry: Record<string, ModalContentComponent> = {
    // Placeholder - replace with real modal content components as they're built
    'website-review': ({ data }) => (
        <div>
            <h2 className="text-xl font-extrabold text-white mb-2">Website Review</h2>
            <p className="text-white/60 text-sm">Plan: {data.plan}</p>
        </div>
    ),
}
export default modalRegistry
