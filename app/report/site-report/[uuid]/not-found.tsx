import Link from 'next/link'
import { DotGrid } from '@/app/components/report/site-report/SectionLabel'

const ReportNotFound = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-10 relative bg-brand-secondary">

            <DotGrid />

            {/* Glow */}
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 40%, rgba(94,252,141,0.06) 0%, transparent 55%)' }} />

            <div className="relative flex flex-col items-center text-center gap-6 max-w-md">

                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl border border-white/10 bg-white/[0.03] flex items-center justify-center">
                    <svg className="w-7 h-7 text-white/30" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                    </svg>
                </div>

                {/* Label */}
                <div className="flex items-center gap-2.5">
                    <div className="h-3.5 w-0.5 rounded-full shrink-0 bg-brand-primary" />
                    <p className="text-xs font-semibold tracking-widest uppercase text-brand-primary">Report Not Found</p>
                </div>

                {/* Heading */}
                <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
                    This report link is<br />invalid or has expired.
                </h1>

                {/* Body */}
                <p className="text-white/45 text-sm leading-relaxed">
                    The link you followed may be incorrect or the report may no longer be available.
                    If you believe this is an error, please get in touch.
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-3 mt-2">
                    <Link
                        href="/"
                        className="px-6 py-3 rounded-xl text-sm font-semibold bg-brand-primary text-brand-secondary hover:opacity-90 transition-opacity"
                    >
                        Go to The Wolf Works
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

export default ReportNotFound
