import SmoothScroll from '@/app/components/common/SmoothScroll'

const SiteReportLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen bg-brand-secondary overflow-x-clip">
            <SmoothScroll />
            {children}
        </div>
    )
}

export default SiteReportLayout
