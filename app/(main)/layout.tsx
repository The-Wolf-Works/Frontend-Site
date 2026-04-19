import Navigation from "../components/navigation/Navigation"
import Footer from "../components/footer/Footer"
import SmoothScroll from "../components/common/SmoothScroll"


const MainLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <SmoothScroll />
            <Navigation />
            <main className="flex-1 flex flex-col">
                { children }
            </main>
            <Footer />
        </>
    )
}
export default MainLayout
