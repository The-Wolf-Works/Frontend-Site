import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "./globals.css"
import Navigation from '@/app/components/navigation/Navigation'
import Footer from '@/app/components/footer/Footer'
import SmoothScroll from '@/app/components/common/SmoothScroll'

const inter = Inter({
    subsets: ["latin"],
    weight: ['200', '300', '400', '500', '600', '700', '800']

//   │ Tailwind class  │ Weight │
//   ├─────────────────┼────────┤
//   │ font-extralight │ 200    │
//   ├─────────────────┼────────┤
//   │ font-light      │ 300    │
//   ├─────────────────┼────────┤
//   │ font-normal     │ 400    │
//   ├─────────────────┼────────┤
//   │ font-medium     │ 500    │
//   ├─────────────────┼────────┤
//   │ font-semibold   │ 600    │
//   ├─────────────────┼────────┤
//   │ font-bold       │ 700    │
//   ├─────────────────┼────────┤
//   │ font-extrabold  │ 800    │
})

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
        className={`${inter.className} antialiased min-h-screen flex flex-col`}
      >
        <SmoothScroll />
        <Navigation />
        <main className="flex-1 flex flex-col">
            {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
