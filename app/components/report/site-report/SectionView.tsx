interface Props {
    label: string
    content: string
}

const SectionView = ({ label, content }: Props) => {
    return (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col gap-2">
            <p className="text-xs font-semibold tracking-widest uppercase text-brand-primary">{label}</p>
            <p className="text-white/60 text-xs leading-relaxed">{content}</p>
        </div>
    )
}

export default SectionView
