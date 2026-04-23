const ReportLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen bg-brand-secondary flex flex-col">
            { children }
        </div>
    )
}
export default ReportLayout
