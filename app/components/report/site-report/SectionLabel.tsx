const resolveColor = (color: string) =>
    color === 'brand-primary' ? '#5EFC8D'
    : color === 'brand-accent' ? '#00cfe0'
    : color === 'red' ? '#f87171'
    : color === 'amber' ? '#f59e0b'
    : color

/**
 * Small labelling component used as a section/card identifier throughout the report.
 * Renders a coloured vertical pill alongside an uppercase tracking label.
 *
 * @param label - Text to display (uppercased via CSS).
 * @param color - Named colour token or hex string. Accepts 'brand-primary' (default),
 *                'brand-accent', 'red', 'amber', or any raw CSS colour value.
 */
const SectionLabel = ({ label, color = 'brand-primary' }: { label: string; color?: string }) => {
    const c = resolveColor(color)
    return (
        <div className="flex items-center gap-2.5">
            <div className="h-3.5 w-0.5 rounded-full shrink-0" style={{ backgroundColor: c }} />
            <p className="text-xs font-semibold tracking-widest uppercase leading-none" style={{ color: c }}>
                {label}
            </p>
        </div>
    )
}

export default SectionLabel
