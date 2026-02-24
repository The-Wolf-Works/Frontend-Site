'use client'

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/#pricing", label: "Pricing Guide" },
  { href: "/#about", label: "About Us" },
  { href: "/contact", label: "Contact Us" },
]

export default function Navigation() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white flex items-center justify-between px-6 py-4">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="The Wolf Works"
            height={50}
            width={150}
            className="h-[50px] w-auto"
            priority
          />
        </Link>
        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
          className="flex flex-col gap-1.5 p-2 -mr-2"
        >
          <span className="block w-6 h-0.5 bg-gray-900" />
          <span className="block w-6 h-0.5 bg-gray-900" />
          <span className="block w-6 h-0.5 bg-gray-900" />
        </button>
      </header>

      {open && (
        <nav className="fixed top-[74px] left-0 right-0 z-40 bg-white border-t border-gray-100 px-6 py-6 shadow-lg">
          <ul className="flex flex-col gap-6">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setOpen(false)}
                  className="text-sm font-medium uppercase tracking-widest text-gray-900 hover:text-gray-500 transition-colors"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </>
  )
}
