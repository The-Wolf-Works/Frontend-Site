import SectionLabel from '../SectionLabel'
import ConversionBars from '../ConversionBars'
import { ConversionReadiness } from '@/lib/types'

interface Props {
    data: ConversionReadiness
}

const ConversionSection = ({ data }: Props) => {
    return (
        <section id="conversion-readiness" className="min-h-screen flex flex-col justify-center border-t border-white/10 px-8 py-20">
            <div className="max-w-xl mx-auto w-full flex flex-col gap-10">
                <div className="flex flex-col gap-3">
                    <SectionLabel label="Conversion Readiness" />
                    <h2 className="text-4xl font-extrabold text-white">
                        How ready is your site<br />to convert visitors?
                    </h2>
                    <p className="text-white/45 text-base leading-relaxed">
                        Five dimensions that determine whether visitors take action — or leave.
                    </p>
                </div>
                <ConversionBars data={data} />
            </div>
        </section>
    )
}

export default ConversionSection
