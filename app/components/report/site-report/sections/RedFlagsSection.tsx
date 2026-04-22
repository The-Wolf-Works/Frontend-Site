import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import SectionLabel from '../SectionLabel'

interface Props {
    redFlags: string[]
    leakyBucket: string
}

const RedFlagsSection = ({ redFlags, leakyBucket }: Props) => {
    return (
        <section id="red-flags" className="min-h-screen flex flex-col justify-center border-t border-white/10 px-8 py-20">
            <div className="max-w-2xl mx-auto w-full flex flex-col gap-12">

                {redFlags.length > 0 && (
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center gap-2.5">
                            <ExclamationTriangleIcon className="w-4 h-4 text-red-400 shrink-0" />
                            <SectionLabel label="Red Flags" color="red" />
                        </div>
                        <ul className="flex flex-col gap-3">
                            {redFlags.map((flag, i) => (
                                <li key={i} className="flex items-start gap-4 border border-red-500/15 bg-red-500/[0.05] rounded-xl px-5 py-4">
                                    <span className="text-red-400 shrink-0 text-base mt-0.5">✕</span>
                                    <span className="text-white/75 text-base leading-relaxed">{flag}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {leakyBucket && (
                    <div className="flex flex-col gap-4">
                        <SectionLabel label="Leaky Bucket" color="#6b7280" />
                        <p className="text-white/60 text-base leading-relaxed">{leakyBucket}</p>
                    </div>
                )}

            </div>
        </section>
    )
}

export default RedFlagsSection
