import { EyeIcon, UserIcon, ArrowTrendingUpIcon } from '@heroicons/react/24/outline'
import SectionLabel from './SectionLabel'

interface Props {
    accessibilityView: string
    clientView: string
    revenueView: string
}

const pillars = [
    {
        key: 'accessibility' as const,
        label: 'Accessibility',
        color: '#5EFC8D',
        iconBg: 'bg-brand-primary/10 border-brand-primary/20',
        Icon: EyeIcon,
        iconColor: 'text-brand-primary',
    },
    {
        key: 'client' as const,
        label: 'Client View',
        color: '#00cfe0',
        iconBg: 'bg-brand-accent/10 border-brand-accent/20',
        Icon: UserIcon,
        iconColor: 'text-brand-accent',
    },
    {
        key: 'revenue' as const,
        label: 'Revenue',
        color: '#f59e0b',
        iconBg: 'bg-amber-400/10 border-amber-400/20',
        Icon: ArrowTrendingUpIcon,
        iconColor: 'text-amber-400',
    },
]

const PillarsSection = ({ accessibilityView, clientView, revenueView }: Props) => {
    const textMap: Record<string, string> = {
        accessibility: accessibilityView,
        client: clientView,
        revenue: revenueView,
    }

    return (
        <section id="pillars" className="min-h-screen border-t border-white/10 grid grid-cols-3 divide-x divide-white/10">
            {pillars.map(({ key, label, color, iconBg, Icon, iconColor }) => (
                <div key={key} className="flex flex-col justify-center px-10 py-20 gap-6">
                    <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 ${iconBg}`}>
                            <Icon className={`w-5 h-5 ${iconColor}`} />
                        </div>
                        <SectionLabel label={label} color={color} />
                    </div>
                    <p className="text-white/65 text-base leading-relaxed">{textMap[key]}</p>
                </div>
            ))}
        </section>
    )
}

export default PillarsSection
