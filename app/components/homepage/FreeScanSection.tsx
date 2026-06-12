import PublicEntryForm from '@/app/components/report/site-report/PublicEntryForm'

const FreeScanSection = () => {
    return (
        <section className="py-24 px-8 md:px-20">
            <div className="max-w-lg">
                <p className="text-sm font-medium tracking-widest uppercase text-brand-primary mb-4">
                    Free Site Report
                </p>
                <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
                    See how your website performs
                </h2>
                <p className="text-white/50 text-base mb-10">
                    Enter your domain and we'll analyse your website in seconds — no sign-up needed.
                </p>
                <PublicEntryForm />
            </div>
        </section>
    )
}

export default FreeScanSection
