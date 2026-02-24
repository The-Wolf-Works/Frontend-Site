import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "./globals.css"
import Navigation from '@/app/components/Navigation'

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
})

export const metadata: Metadata = {
  title: "The Wolf Works | Digital Growth Agency",
  description: "We master design to ensure the highest quality of service.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Navigation />
        {children}
      </body>
    </html>
  )
}
