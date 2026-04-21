interface Props {
    summary: string
}

const ExecutiveSummary = ({ summary }: Props) => {
    return (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <p className="text-xs font-semibold tracking-widest uppercase text-brand-primary mb-3">
                Executive Summary
            </p>
            <p className="text-white/70 text-sm leading-relaxed">{summary}</p>
        </div>
    )
}

export default ExecutiveSummary
