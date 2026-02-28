"use client"

import { useState } from 'react'
import type { MenuItem } from "@/lib/types"
import Link from "next/link"
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

interface MobileMenuProps {
    menuItems: MenuItem[]
}

export const MobileMenu = ({ menuItems }: MobileMenuProps) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="">
            {/* Hamburger Button */}
            <button className="cursor-pointer p-2" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? (
                    <XMarkIcon className="size-10 text-white" />
                ) : (
                    <Bars3Icon className="size-10 text-white" />
                )}
            </button>

            {/* Mobile Menu - shown/hidden based on isOpen state */}
            {isOpen && (
                <ul className="absolute top-full left-0 w-full bg-brand-secondary shadow-md z-50">
                    {menuItems.map((item) => (
                        <li className="" key={item.id}>
                            <Link
                                href={item.path}
                                className={
                                    item.cssClasses.includes("cta")
                                        ? "block py-4 px-6 text-lg font-extrabold tracking-widest bg-brand-primary text-black text-center"
                                        : "block py-4 px-6 text-base font-medium tracking-widest uppercase text-white hover:text-gray-500 transition-colors duration-200"
                                }
                            >{item.label}</Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
export default MobileMenu
