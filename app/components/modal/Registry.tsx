import type { ModalContentProps } from "./Types"
import ContactForm from "../forms/ContactForm"
import WebsiteReview from "../forms/WebsiteReview"
import BusinessReview from "../forms/BusinessReview"
import Consultancy from "../forms/Consultancy"
import PackageEnquiry from "../forms/PackageEnquiry"

type ModalContentComponent = (props: ModalContentProps) => React.ReactNode

export const modalRegistry: Record<string, ModalContentComponent> = {

    'contact': () => (
        <ContactForm />
    ),
    'website-review': ({ data }) => (
        <WebsiteReview planName={data.plan ?? ''} />
    ),
    'business-review': ({ data }) => (
        <BusinessReview planName={data.plan ?? ''} />
    ),
    'consultancy': ({ data }) => (
        <Consultancy planName={data.plan ?? ''} />
    ),
    'package-enquiry': ({ data }) => (
        <PackageEnquiry data={data} />
    ),
}
export default modalRegistry
