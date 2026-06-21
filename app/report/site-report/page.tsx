import PublicEntryForm from '@/app/components/report/site-report/PublicEntryForm'

const SiteReportEntryPage = () => {
    return (
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-20">
            <div className="w-full max-w-md">
                <h1 className="text-3xl font-extrabold text-white mb-2">
                    Get your free site report
                </h1>
                <p className="text-white/50 text-sm mb-8">
                    Enter your domain and we'll analyse your website in seconds — no sign-up needed.
                </p>
                <PublicEntryForm />
            </div>
        </div>
    )
}

export default SiteReportEntryPage
