interface Props {
    quickWin: { title: string; description: string }
}

const QuickWin = ({ quickWin }: Props) => {
    return (
        <div className="bg-white/5 border border-brand-primary/20 rounded-2xl p-6 flex flex-col gap-2">
            <p className="text-xs font-semibold tracking-widest uppercase text-brand-primary">Quick Win</p>
            <h3 className="text-white font-bold text-base">{quickWin.title}</h3>
            <p className="text-white/60 text-sm leading-relaxed">{quickWin.description}</p>
        </div>
    )
}

export default QuickWin
