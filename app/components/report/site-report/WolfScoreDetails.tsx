import { WolfScoreData } from '@/lib/types'

interface Props {
    wolfScore: WolfScoreData
}

const WolfScoreDetails = ({ wolfScore }: Props) => {
    return (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-4">
            <p className="text-xs font-semibold tracking-widest uppercase text-brand-primary">Breakdown</p>

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
