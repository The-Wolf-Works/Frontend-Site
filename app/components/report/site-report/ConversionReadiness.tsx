import { ConversionReadiness as ConversionReadinessData } from '@/lib/types'

interface Props {
    conversionReadiness: ConversionReadinessData
}

const metrics: { key: keyof ConversionReadinessData; label: string }[] = [
    { key: 'clarity',              label: 'Clarity' },
    { key: 'trust_signals',        label: 'Trust Signals' },
    { key: 'mobile_experience',    label: 'Mobile' },
    { key: 'conversion_structure', label: 'Conversion Structure' },
    { key: 'overall',              label: 'Overall' },
]

const ConversionReadiness = ({ conversionReadiness }: Props) => {
    return (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <p className="text-xs font-semibold tracking-widest uppercase text-brand-primary mb-5">
                Conversion Readiness
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {metrics.map(({ key, label }) => {
                    const value = conversionReadiness[key] ?? 0
                    return (
                        <div key={key} className="flex flex-col gap-2">
                            <div className="flex justify-between items-baseline">
                                <span className="text-white/50 text-xs">{label}</span>
                                <span className="text-white text-xs font-bold">{value}<span className="text-white/30">/10</span></span>
                            </div>
                            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-brand-primary rounded-full transition-all"
                                    style={{ width: `${value * 10}%` }}
                                />
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ConversionReadiness
