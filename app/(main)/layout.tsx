import Navigation from "../components/navigation/Navigation"
import Footer from "../components/footer/Footer"
import SmoothScroll from "../components/common/SmoothScroll"

export const revalidate = 60

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <SmoothScroll />
            <Navigation />
            <div className="flex-1 flex flex-col">
                { children }
            </div>
            <Footer />
        </>
    )
}
export default MainLayout
