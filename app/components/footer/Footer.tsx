import LinkList from '../common/LinkList'
import Image from 'next/image'
import Link from 'next/link'
import { FaInstagram, FaFacebook, FaLinkedin } from 'react-icons/fa'

export const Footer = () => {
    return (
        <div className="w-full bg-brand-secondary px-8 py-6">
            <div className="flex flex-col gap-4 nav:flex-row nav:items-center nav:justify-between">
                <div className="flex flex-col gap-4">
                    <Link href="/">
                        <Image
                            src="/logo-white.png"
                            alt="The Wolf Works Logo"
                            height={40}
                            width={120}
                            className="object-contain"
                        />
                    </Link>
                    <p className="text-base font-medium text-gray-300">Your AI Report Specialist</p>
                </div>
                <LinkList className="text-base font-medium text-gray-300 hover:text-white transition-colors duration-200" links={[
                    { label: "Privacy Policy", href: "/privacy-policy" },
                    { label: "Terms & Conditions", href: "/terms-conditions" },
                    { label: "Cookie Policy", href: "/cookie-policy"}
                ]} />
                <div className="flex items-center gap-6">
                    <a href="https://www.instagram.com/thewolf.works/" target="_blank" rel="noopener noreferrer"
                        className="text-gray-300 hover:text-white transition-colors duration-200">
                        <FaInstagram size={20} />
                    </a>
                    <a href="https://www.facebook.com/thewolfworks" target="_blank" rel="noopener noreferrer"
                        className="text-gray-300 hover:text-white transition-colors duration-200">
                        <FaFacebook size={20} />
                    </a>
                    <a href="https://www.linkedin.com/company/thewolfworks/" target="_blank" rel="noopener noreferrer"
                        className="text-gray-300 hover:text-white transition-colors duration-200">
                        <FaLinkedin size={20} />
                    </a>
                </div>
            </div>
            <div className="mt-4 border-t border-gray-400 pt-4">
                <p className="text-base font-light text-gray-300">© {new Date().getFullYear()} The Wolf Works. All rights reserved.</p>
            </div>
        </div>
    )
}
export default Footer
