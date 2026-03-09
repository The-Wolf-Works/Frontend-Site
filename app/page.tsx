import { client } from '@/lib/client';
import { GET_HOMEPAGE, GET_HOW_IT_WORKS } from '@/lib/queries';
import type { GetHomepageResponse, GetHowItWorksResponse } from '@/lib/types';
import Hero from './components/homepage/Hero';
import HowItWorks from './components/blocks/HowItWorks';

const Home = async () => {
    const [homepageData, howItWorksData] = await Promise.all([
        client.request<GetHomepageResponse>(GET_HOMEPAGE),
        client.request<GetHowItWorksResponse>(GET_HOW_IT_WORKS),
    ])

    const hero = homepageData.nodeByUri.homepageHero
    const howItWorks = howItWorksData.nodeByUri?.howItWorksBlock

    return (
        <>
            <Hero hero={hero} />
            {howItWorks && <HowItWorks howItWorks={howItWorks} />}
        </>
    )
}
export default Home
