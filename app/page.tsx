import { client } from '@/lib/client';
import { GET_HOMEPAGE, GET_HOW_IT_WORKS, GET_WHY_THE_WOLF_WORKS } from '@/lib/queries';
import type { GetHomepageResponse, GetHowItWorksResponse, GetWhyTheWolfWorksResponse } from '@/lib/types';
import Hero from './components/homepage/Hero';
import HowItWorks from './components/blocks/HowItWorks';
import WhyTheWolfWorks from './components/blocks/WhyTheWolfWorks';

const Home = async () => {
    const [homepageData, howItWorksData, whyTheWolfWorksData] = await Promise.all([
        client.request<GetHomepageResponse>(GET_HOMEPAGE),
        client.request<GetHowItWorksResponse>(GET_HOW_IT_WORKS),
        client.request<GetWhyTheWolfWorksResponse>(GET_WHY_THE_WOLF_WORKS),
    ])

    const hero = homepageData.nodeByUri.homepageHero
    const howItWorks = howItWorksData.nodeByUri?.howItWorksBlock
    const whyTheWolfWorks = whyTheWolfWorksData.nodeByUri?.whyTheWolfWorksBlock

    return (
        <>
            <Hero hero={hero} />
            {howItWorks && <HowItWorks block={howItWorks} />}
            {whyTheWolfWorks && <WhyTheWolfWorks block={whyTheWolfWorks} />}
        </>
    )
}
export default Home
