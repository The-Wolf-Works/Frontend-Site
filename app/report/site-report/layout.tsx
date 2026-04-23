import SmoothScroll from '@/app/components/common/SmoothScroll'
import ReportProgress from '@/app/components/report/site-report/ReportProgress'
import Footer from '@/app/components/footer/Footer'

const SiteReportLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <ReportProgress />
            <div className="min-h-screen bg-brand-secondary overflow-x-clip">
                <SmoothScroll />
                {children}
                <Footer />
            </div>
        </>
    )
}

export default SiteReportLayout
