import { WolfScoreData } from '@/lib/types'

interface Props {
    wolfScore: WolfScoreData
    clientName: string
    clientDomain: string
}

const WolfScoreHero = ({ wolfScore, clientName, clientDomain }: Props) => {
    return (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row md:items-center gap-6">
            {/* Score circle */}
            <div className="flex flex-col items-center justify-center shrink-0 w-28 h-28 rounded-full border-2 border-brand-primary/30 bg-brand-primary/5">
                <span className="text-4xl font-extrabold text-white leading-none">{wolfScore.score}</span>
                <span className="text-xs text-white/40 mt-1">/ 100</span>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold tracking-widest uppercase text-brand-primary mb-1">Wolf Score</p>
                <h1 className="text-xl font-extrabold text-white truncate">{clientName}</h1>
                <p className="text-white/40 text-sm mb-3">{clientDomain}</p>
                <p className="text-white/60 text-sm leading-relaxed line-clamp-3">{wolfScore.summary}</p>
            </div>
        </div>
    )
}

export default WolfScoreHero
