const RadarGraphic = ({ className }: { className?: string }) => (
    <svg
        viewBox="0 0 400 400"
        className={className}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        {/* Concentric rings */}
        <circle cx="200" cy="200" r="180" stroke="rgba(94,252,141,0.06)" strokeWidth="1" />
        <circle cx="200" cy="200" r="140" stroke="rgba(94,252,141,0.08)" strokeWidth="1" />
        <circle cx="200" cy="200" r="100" stroke="rgba(94,252,141,0.12)" strokeWidth="1" />
        <circle cx="200" cy="200" r="60"  stroke="rgba(94,252,141,0.18)" strokeWidth="1" />
        <circle cx="200" cy="200" r="24"  stroke="rgba(94,252,141,0.30)" strokeWidth="1" />

        {/* Crosshairs */}
        <line x1="200" y1="20"  x2="200" y2="380" stroke="rgba(94,252,141,0.06)" strokeWidth="1" />
        <line x1="20"  y1="200" x2="380" y2="200" stroke="rgba(94,252,141,0.06)" strokeWidth="1" />

        {/* Diagonal cross */}
        <line x1="73"  y1="73"  x2="327" y2="327" stroke="rgba(94,252,141,0.04)" strokeWidth="1" />
        <line x1="327" y1="73"  x2="73"  y2="327" stroke="rgba(94,252,141,0.04)" strokeWidth="1" />

        {/* Tick marks on outer ring */}
        {Array.from({ length: 36 }).map((_, i) => {
            const angle = (i * 10 * Math.PI) / 180
            const inner = i % 9 === 0 ? 168 : 174
            const x1 = 200 + inner * Math.cos(angle)
            const y1 = 200 + inner * Math.sin(angle)
            const x2 = 200 + 180 * Math.cos(angle)
            const y2 = 200 + 180 * Math.sin(angle)
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(94,252,141,0.15)" strokeWidth={i % 9 === 0 ? 1.5 : 0.75} />
        })}

        {/* Data polygon */}
        <polyline
            points="200,60 320,130 290,290 110,260 130,110 200,60"
            stroke="rgba(94,252,141,0.15)"
            strokeWidth="1"
            fill="rgba(94,252,141,0.03)"
        />

        {/* Data points */}
        <circle cx="200" cy="60"  r="3" fill="rgba(94,252,141,0.6)" />
        <circle cx="320" cy="130" r="3" fill="rgba(94,252,141,0.4)" />
        <circle cx="290" cy="290" r="3" fill="rgba(94,252,141,0.5)" />
        <circle cx="110" cy="260" r="3" fill="rgba(94,252,141,0.35)" />
        <circle cx="130" cy="110" r="3" fill="rgba(94,252,141,0.45)" />

        {/* Centre dot + sweep line */}
        <circle cx="200" cy="200" r="4" fill="#5EFC8D" style={{ filter: 'drop-shadow(0 0 6px rgba(94,252,141,0.8))' }} />
        <line x1="200" y1="200" x2="200" y2="22" stroke="rgba(94,252,141,0.25)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
)

export default RadarGraphic
