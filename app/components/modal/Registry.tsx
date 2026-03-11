import type { ModalContentProps } from "./Types"

type ModalContentComponent = (props: ModalContentProps) => React.ReactNode

export const modalRegistry: Record<string, ModalContentComponent> = {

    'contact': () => (
        <div>
            <h2 className="text-xl font-extrabold text-white mb-2">Get in touch</h2>
            <p className="text-white/60 text-sm">Contact form coming soon.</p>
        </div>
    ),
    'website-review': ({ data }) => (
        <div>
            <h2 className="text-xl font-extrabold text-white mb-2">{data.plan}</h2>
        </div>
    ),
    'business-review': ({ data }) => (
        <div>
            <h2 className="text-xl font-extrabold text-white mb-2">{data.plan}</h2>
        </div>
    ),
    'consultancy': ({ data }) => (
        <div>
            <h2 className="text-xl font-extrabold text-white mb-2">{data.plan}</h2>
        </div>
    )
}
export default modalRegistry
