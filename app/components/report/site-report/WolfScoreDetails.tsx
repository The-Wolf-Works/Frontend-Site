import { WolfScoreData } from '@/lib/types'

interface Props {
    wolfScore: WolfScoreData
}

const WolfScoreDetails = ({ wolfScore }: Props) => {
    return (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-4">
            <p className="text-xs font-semibold tracking-widest uppercase text-brand-primary">Breakdown</p>

            {wolfScore.red_flags && wolfScore.red_flags.length > 0 && (
                <div>
                    <p className="text-white/40 text-xs uppercase tracking-wider mb-2">Red Flags</p>
                    <ul className="flex flex-col gap-1.5">
                        {wolfScore.red_flags.map((flag, i) => (
                            <li key={i} className="flex items-start gap-2 text-white/60 text-xs">
                                <span className="text-red-400 shrink-0 mt-0.5">✕</span>
                                {flag}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {wolfScore.leaky_bucket && (
                <div>
                    <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Leaky Bucket</p>
                    <p className="text-white/60 text-xs leading-relaxed">{wolfScore.leaky_bucket}</p>
                </div>
            )}

            {wolfScore.recommendation && (
                <div>
                    <p className="text-brand-primary text-xs uppercase tracking-wider mb-1">Recommendation</p>
                    <p className="text-white/70 text-xs leading-relaxed">{wolfScore.recommendation}</p>
                </div>
            )}
        </div>
    )
}

export default WolfScoreDetails
