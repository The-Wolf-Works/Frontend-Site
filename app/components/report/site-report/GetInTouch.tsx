const GetInTouch = () => {
    return (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
                <p className="text-xs font-semibold tracking-widest uppercase text-brand-primary mb-1">Next Steps</p>
                <h2 className="text-white font-bold text-base">Ready to fix this?</h2>
                <p className="text-white/50 text-sm mt-1">We&apos;ve identified the issues — let&apos;s talk about solving them.</p>
            </div>
            <a
                href="/#contact"
                className="shrink-0 bg-brand-primary text-brand-secondary font-bold px-6 py-3 rounded-lg text-sm hover:opacity-90 transition-opacity"
            >
                Get in Touch
            </a>
        </div>
    )
}

export default GetInTouch
