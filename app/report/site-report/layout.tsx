import SmoothScroll from '@/app/components/common/SmoothScroll'
import ReportProgress from '@/app/components/report/site-report/ReportProgress'

const SiteReportLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <ReportProgress />
            <div className="min-h-screen bg-brand-secondary overflow-x-clip">
                <SmoothScroll />
                {children}
            </div>
        </>
    )
}

export default SiteReportLayout
