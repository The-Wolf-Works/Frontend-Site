import RadarGraphic from '@/app/components/graphics/RadarGraphic'

interface Props {
    clientName: string
    clientDomain: string
    reportDate?: string
    reportType?: string
}

const formatDate = (raw?: string) => {
    if (!raw) return null
    const d = new Date(raw)
    if (isNaN(d.getTime())) return null
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

const HeroSection = ({ clientName, clientDomain, reportDate, reportType }: Props) => {
    const date = formatDate(reportDate)

    const meta = [
        { label: 'Client URL', value: clientDomain },
        ...(date ? [{ label: 'Report Date', value: date }] : []),
        { label: 'Client', value: clientName },
        { label: 'Prepared by', value: 'The Wolf Works' },
    ]

    return (
        <section id="hero" className="min-h-screen flex flex-col px-10 md:px-16 py-12 relative overflow-hidden">

            {/* Background — dot grid + glows */}
            <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
            <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(94,252,141,0.12) 0%, transparent 65%)', filter: 'blur(40px)' }} />
            <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(0,207,224,0.08) 0%, transparent 65%)', filter: 'blur(40px)' }} />

            {/* Top bar */}
            <div className="relative flex items-center justify-between flex-shrink-0 animate-in fade-in-0 slide-in-from-bottom-4 duration-500 fill-mode-both">
                <p className="text-xs font-semibold tracking-[0.3em] uppercase text-brand-primary">The Wolf Works</p>
                <div className="h-px flex-1 mx-6 bg-gradient-to-r from-brand-primary/30 to-transparent" />
                <p className="text-xs text-white/20 tracking-widest uppercase">Site Report</p>
            </div>

            {/* Middle — heading + graphic */}
            <div className="relative flex flex-1 gap-10 mt-12 min-h-0 max-nav:flex-col max-nav:gap-0 animate-in fade-in-0 slide-in-from-bottom-4 duration-500 delay-100 fill-mode-both">
                <div className="flex-1 flex flex-col justify-center gap-3 max-nav:items-center max-nav:text-center">
                    <p className="text-sm md:text-base text-white/40 font-light tracking-[0.15em] uppercase">
                        {reportType ? `${reportType} Report` : 'Diagnostic Report'}
                        <span className="mx-3 text-white/15">—</span>
                        prepared for
                    </p>
                    <h1
                        className="font-extrabold leading-none tracking-tight"
                        style={{ fontSize: 'clamp(3.5rem, 7vw, 7rem)', color: '#5EFC8D', textShadow: '0 0 60px rgba(94,252,141,0.25), 0 0 120px rgba(94,252,141,0.1)' }}
                    >
                        {clientName}
                    </h1>
                    <p className="text-white/40 font-light tracking-[0.25em] uppercase" style={{ fontSize: 'clamp(0.85rem, 1.5vw, 1.125rem)' }}>
                        Stop guessing, start growing.
                    </p>
                </div>

                <div className="flex items-center justify-center w-[42%] flex-shrink-0 max-nav:w-full max-nav:flex-1">
                    <RadarGraphic className="w-full max-w-sm max-nav:max-w-[260px] max-[500px]:max-w-[180px]" />
                </div>
            </div>

            {/* Bottom strip — scroll indicator + metadata */}
            <div className="relative flex-shrink-0 animate-in fade-in-0 slide-in-from-bottom-4 duration-500 delay-200 fill-mode-both">
                <div className="mb-5 flex flex-row items-center gap-2 max-nav:flex-col max-nav:items-center max-nav:w-full">
                    <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
                        <rect x="1" y="1" width="14" height="22" rx="7" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
                        <circle cx="8" cy="7" r="2" fill="rgba(94,252,141,0.6)" className="animate-scroll-dot" />
                    </svg>
                    <p className="text-xs tracking-[0.25em] uppercase text-white/20 whitespace-nowrap">Scroll for details</p>
                </div>

                <div className="border-t border-white/10 pt-6">
                    <div className="grid grid-cols-2 lg:flex lg:divide-x lg:divide-white/10 gap-4 lg:gap-0">
                        {meta.map(({ label, value }) => (
                            <div key={label} className="flex flex-col gap-1.5 lg:flex-1 lg:px-6 lg:first:pl-0 lg:last:pr-0">
                                <p className="text-xs font-semibold tracking-widest uppercase text-white/20">{label}</p>
                                <p className="text-sm text-white/55 mt-1">{value}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroSection
