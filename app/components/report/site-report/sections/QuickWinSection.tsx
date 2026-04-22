import { SparklesIcon, ArrowPathIcon } from '@heroicons/react/24/outline'
import SectionLabel from '../SectionLabel'

interface Props {
    quickWin: { title: string; description: string }
    recommendation: string
    strategicPivot?: string
}

const QuickWinSection = ({ quickWin, recommendation, strategicPivot }: Props) => {
    return (
        <section id="quick-win" className="min-h-screen flex flex-col justify-center border-t border-white/10 px-8 py-20">
            <div className="max-w-2xl mx-auto w-full flex flex-col gap-12">

                <div
                    className="rounded-2xl border border-brand-primary/20 p-8 flex flex-col gap-4"
                    style={{ background: 'linear-gradient(135deg, rgba(94,252,141,0.06) 0%, transparent 60%)' }}
                >
                    <div className="flex items-center gap-2.5">
                        <SparklesIcon className="w-4 h-4 text-brand-primary shrink-0" />
                        <SectionLabel label="Quick Win" />
                    </div>
                    <h3 className="text-2xl font-bold text-white leading-snug">{quickWin.title}</h3>
                    <p className="text-white/65 text-base leading-relaxed">{quickWin.description}</p>
                </div>

                {recommendation && (
                    <div className="flex flex-col gap-4">
                        <SectionLabel label="Recommendation" />
                        <p className="text-white/65 text-base leading-relaxed">{recommendation}</p>
                    </div>
                )}

                {strategicPivot && (
                    <div className="flex items-start gap-3 border-t border-white/10 pt-8">
                        <ArrowPathIcon className="w-4 h-4 text-white/25 shrink-0 mt-0.5" />
                        <div className="flex flex-col gap-1.5">
                            <p className="text-xs font-semibold tracking-widest uppercase text-white/25">Strategic Pivot</p>
                            <p className="text-white/45 text-sm leading-relaxed">{strategicPivot}</p>
                        </div>
                    </div>
                )}

            </div>
        </section>
    )
}

export default QuickWinSection
