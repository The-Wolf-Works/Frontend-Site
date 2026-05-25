'use client'

import { icons } from '@/app/components/icons/Icons'
import SectionLabel, { DotGrid } from '../SectionLabel'
import useScrollInView from '@/app/hooks/useScrollInView'
import { AiEdge } from '@/lib/types'

interface Props {
    data: AiEdge
}

/**
 * AI Edge section — surfaces the sector-specific automation opportunity identified
 * by the AI. Displays the sector, a narrative analysis, and an ROI comparison table.
 *
 * @param data.sector_identified - Sector detected by the AI (e.g. "Law Firm").
 * @param data.analysis_text     - Plain-text narrative of the AI opportunity and ROI.
 * @param data.roi_table_data    - Array of rows: metric, manual, ai_assisted, net_savings.
 */
const AiEdgeSection = ({ data }: Props) => {
    const { ref, fadeUp } = useScrollInView()
    const { sector_identified, analysis_text, roi_table_data } = data

    return (
        <section ref={ref} id="ai-edge" className="min-h-screen flex flex-col justify-center border-t border-white/10 px-10 md:px-16 py-20 relative">

            {/* Background */}
            <DotGrid />
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 100% 0%, rgba(0,207,224,0.08) 0%, transparent 55%)' }} />
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 0% 100%, rgba(94,252,141,0.05) 0%, transparent 50%)' }} />

            <div className="relative flex flex-col gap-12 max-w-5xl mx-auto w-full">

                {/* Header */}
                <div className="flex flex-col gap-3" style={fadeUp(0)}>
                    <SectionLabel label="AI Edge" color="brand-accent" />
                    <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
                        Outpacing the<br />competition.
                    </h2>
                    <p className="text-white/40 text-sm font-light tracking-wide max-w-md">
                        Where AI gives your business a measurable operational advantage — right now.
                    </p>
                </div>

                {/* Sector badge + analysis */}
                <div className="flex flex-col gap-6" style={fadeUp(100)}>
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center shrink-0">
                            <icons.sparkles className="w-4 h-4 text-brand-accent" />
                        </div>
                        <div className="flex flex-col gap-0.5">
                            <p className="text-xs font-semibold tracking-widest uppercase text-brand-accent/60">Sector Identified</p>
                            <p className="text-white text-sm font-semibold">{sector_identified}</p>
                        </div>
                    </div>

                    <div className="flex gap-5">
                        <div className="w-1 rounded-full shrink-0 self-stretch" style={{ background: 'linear-gradient(to bottom, rgba(0,207,224,0.6), transparent)' }} />
                        <p className="text-white/60 text-base leading-relaxed max-w-3xl">{analysis_text}</p>
                    </div>
                </div>

                {/* ROI comparison — table style */}
                <div style={fadeUp(200)}>

                    {/* Header row */}
                    <div className="grid grid-cols-4 border-b border-white/10 pb-3">
                        <p className="text-white/25 text-xs font-semibold tracking-widest uppercase">Metric</p>
                        <p className="text-white/25 text-xs font-semibold tracking-widest uppercase text-center">Manual</p>
                        <p className="text-brand-accent/60 text-xs font-semibold tracking-widest uppercase text-center">AI-Assisted</p>
                        <p className="text-brand-primary/60 text-xs font-semibold tracking-widest uppercase text-center">Saved</p>
                    </div>

                    {/* Data rows */}
                    {roi_table_data.map((row, i) => (
                        <div key={i} className="grid grid-cols-4 py-5 border-b border-white/[0.06] items-center">
                            <p className="text-white/40 text-sm">{row.metric}</p>
                            <p className="text-white/50 text-sm font-medium text-center">{row.manual}</p>
                            <p className="text-brand-accent text-sm font-semibold text-center">{row.ai_assisted}</p>
                            <p className="text-brand-primary text-sm font-bold text-center">{row.net_savings}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default AiEdgeSection
