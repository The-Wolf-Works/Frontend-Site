import Link from 'next/link'

/* ── Wolf Score visual ──────────────────────────────────────────── */

function WolfScoreCard() {
    const categories = [
        { name: 'UX & Design', score: 72 },
        { name: 'SEO', score: 58 },
        { name: 'Strategy', score: 71 },
        { name: 'Performance', score: 64 },
    ]

    /**
     * Semicircle gauge maths
     * Centre (cx, cy) = (100, 90), Radius = 70
     * Track: left (30,90) → top (100,20) → right (170,90), sweep-flag=1
     * Score arc (67/100 = 120.6° of 180°)
     *   theta_end = 180° + (67/100 × 180°) = 300.6°
     *   x = 100 + 70·cos(300.6°) ≈ 135.5
     *   y =  90 + 70·sin(300.6°) ≈  29.7
     */
    const SCORE = 67
    const scoreArcEnd = { x: 135.5, y: 29.7 } // pre-computed for SCORE=67

    return (
        <div className="bg-gray-900 border border-white/10 rounded-2xl p-6 w-full max-w-sm mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <span className="text-brand-primary text-xs uppercase tracking-widest font-semibold">
                    Wolf Score
                </span>
                <span className="text-gray-500 text-xs">Sample Report</span>
            </div>

            {/* Gauge dial */}
            <div className="flex flex-col items-center mb-6">
                <svg
                    viewBox="0 0 200 110"
                    className="w-48 h-auto"
                    aria-label={`Wolf Score gauge showing ${SCORE} out of 100`}
                    role="img"
                >
                    {/* Track — upper semicircle */}
                    <path
                        d="M 30 90 A 70 70 0 0 1 100 20 A 70 70 0 0 1 170 90"
                        stroke="#374151"
                        strokeWidth="10"
                        strokeLinecap="round"
                        fill="none"
                    />
                    {/* Score arc */}
                    <path
                        d={`M 30 90 A 70 70 0 0 1 ${scoreArcEnd.x} ${scoreArcEnd.y}`}
                        stroke="#00535c"
                        strokeWidth="10"
                        strokeLinecap="round"
                        fill="none"
                    />
                    {/* Score label */}
                    <text
                        x="100"
                        y="80"
                        textAnchor="middle"
                        fill="white"
                        fontSize="30"
                        fontWeight="bold"
                        fontFamily="inherit"
                    >
                        {SCORE}
                    </text>
                    <text
                        x="100"
                        y="96"
                        textAnchor="middle"
                        fill="#6b7280"
                        fontSize="11"
                        fontFamily="inherit"
                    >
                        out of 100
                    </text>
                </svg>
            </div>

            {/* Category bars */}
            <div className="space-y-3">
                {categories.map((cat) => (
                    <div key={cat.name}>
                        <div className="flex justify-between text-xs mb-1">
                            <span className="text-gray-400">{cat.name}</span>
                            <span className="text-white font-medium">{cat.score}</span>
                        </div>
                        <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-brand-primary rounded-full"
                                style={{ width: `${cat.score}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer */}
            <p className="mt-5 text-center text-gray-600 text-[10px] uppercase tracking-wider">
                Powered by the Synergist AI Engine
            </p>
        </div>
    )
}

/* ── Hero section ───────────────────────────────────────────────── */

export function HeroSection() {
    return (
        <section className="bg-gray-950 text-white">
            <div className="px-6 py-16 nav:py-24 nav:px-12 max-w-7xl mx-auto flex flex-col nav:flex-row nav:items-center gap-12 nav:gap-16">

                {/* Copy column */}
                <div className="flex-1 min-w-0">
                    <p className="text-brand-primary text-xs uppercase tracking-widest font-semibold mb-5">
                        Growth Intelligence Platform
                    </p>

                    <h1
                        className="font-bold text-white leading-none mb-6"
                        style={{ fontSize: 'clamp(2.5rem, 8vw, 4.5rem)' }}
                    >
                        Stop guessing.<br />
                        Start growing.
                    </h1>

                    <p className="text-gray-300 text-base leading-relaxed mb-8 max-w-md">
                        Get your Wolf Score — an instant, AI-powered diagnostic that shows
                        exactly where your website is losing business.
                    </p>

                    <Link
                        href="/review"
                        className="inline-block bg-brand-primary text-white font-bold px-8 py-4 text-sm uppercase tracking-wide rounded-lg hover:brightness-110 transition-all"
                    >
                        Review my website — from £15
                    </Link>

                    <p className="mt-5 text-gray-500 text-xs">
                        Built by engineers and UX specialists with 15+ years&apos; experience.
                    </p>
                </div>

                {/* Wolf Score visual */}
                <div className="w-full nav:w-80 flex-shrink-0">
                    <WolfScoreCard />
                </div>

            </div>
        </section>
    )
}

export default HeroSection
