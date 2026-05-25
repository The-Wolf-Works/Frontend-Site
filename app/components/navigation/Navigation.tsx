import { client } from "@/lib/client"
import { GET_PRIMARY_MENU } from "@/lib/queries"
import MobileMenu from "./MobileMenu"
import type { GetMenuResponse } from "@/lib/types"
import Link from "next/link"
import Image from 'next/image'
import ModalButton from "@/app/components/modal/ModalButton"

export const Navigation = async () => {
    const data = await client.request<GetMenuResponse>(GET_PRIMARY_MENU)
    const menuItems = data.menuItems.nodes

    return (
        <div className="relative bg-brand-secondary w-full p-6 nav:p-12 flex items-center justify-between shadow-xl/30 ">
            <Link href="/" className="shrink-0 text-xl font-bold text-gray-900">
                <Image
                    src="/logo.png"
                    alt="The Wolf Works"
                    height={80}
                    width={190}
                    className="h-[60px] w-auto object-contain"
                    priority
                />
            </Link>
            {/* Desktop Menu */}
            <ul className="hidden nav:flex items-center gap-8 p-0-4">
                {menuItems.map((item) => (
                <li
                    key={item.id}
                    className={`list-none`}
                >
                {item.cssClasses.includes("modal-trigger") ? (
                    <ModalButton
                        modalId="contact"
                        className="text-base font-medium tracking-wider uppercase text-gray-300 hover:font-bold hover:text-brand-primary transition-colors duration-200 whitespace-nowrap cursor-pointer"
                    >
                        {item.label}
                    </ModalButton>
                ) : (
                    <Link
                        href={item.path}
                        className={
                            item.cssClasses.includes("cta")
                                ? "font-extrabold outline-2 outline-brand-primary text-lg tracking-wider bg-brand-primary text-black p-4 rounded-lg no-underline whitespace-nowrap hover:bg-brand-secondary hover:outline-white hover:text-white transition-all duration-500"
                                : "text-base font-medium tracking-wider uppercase text-gray-300 no-underline hover:font-bold hover:text-brand-primary transition-colors duration-200 whitespace-nowrap"
                        }
                    >
                        {item.label}
                    </Link>
                )}
                </li>
            ))}
            </ul>

            {/* Mobile Menu */}
            <div className="flex nav:hidden">
                <MobileMenu menuItems={menuItems} />
            </div>
        </div>
    )
}
export default Navigation
