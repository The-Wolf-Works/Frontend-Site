import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "./globals.css"
import Navigation from '@/app/components/Navigation'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "The Wolf Works",
  description: "Your AI Report specialist",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
      >
        <Navigation />
        {children}
      </body>
    </html>
  )
}
