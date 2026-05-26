import Link from 'next/link'
import { FaExclamationTriangle } from 'react-icons/fa'
import DotGrid from '@/app/components/common/DotGrid'

const NotFound = () => {
    return (
        <div className="flex-1 flex flex-col items-center justify-center px-10 relative bg-brand-secondary">

            <DotGrid />

            {/* Glow */}
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 40%, rgba(94,252,141,0.06) 0%, transparent 55%)' }} />

            <div className="relative flex flex-col items-center text-center gap-6 max-w-md">

                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl border border-white/10 bg-white/[0.03] flex items-center justify-center">
                    <FaExclamationTriangle className="w-7 h-7 text-white/30" />
                </div>

                {/* Label */}
                <div className="flex items-center gap-2.5">
                    <div className="h-3.5 w-0.5 rounded-full shrink-0 bg-brand-primary" />
                    <p className="text-xs font-semibold tracking-widest uppercase text-brand-primary">404 — Page Not Found</p>
                </div>

                {/* Heading */}
                <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
                    This page doesn&apos;t<br />exist.
                </h1>

                {/* Body */}
                <p className="text-white/45 text-sm leading-relaxed">
                    The page you&apos;re looking for may have moved or never existed.
                    Head back to the homepage or get in touch if you think something&apos;s wrong.
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-3 mt-2">
                    <Link
                        href="/"
                        className="px-6 py-3 rounded-xl text-sm font-semibold bg-brand-primary text-brand-secondary hover:opacity-90 transition-opacity"
                    >
                        Back to homepage
                    </Link>
                    <Link
                        href='/?modal={"id":"contact"}'
                        className="px-6 py-3 rounded-xl text-sm font-semibold border border-white/15 text-white hover:border-white/30 hover:bg-white/5 transition-all"
                    >
                        Get in touch
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default NotFound
