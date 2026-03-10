import { client } from '@/lib/client';
import {
    GET_HOMEPAGE,
    GET_HOW_IT_WORKS,
    GET_WHY_THE_WOLF_WORKS,
    GET_ABOUT_THE_WOLF_PACK
} from '@/lib/queries';
import type {
    GetHomepageResponse,
    GetHowItWorksResponse,
    GetWhyTheWolfWorksResponse,
    GetAboutTheWolfPackResponse
} from '@/lib/types';

import Hero from './components/homepage/Hero';
import HowItWorks from './components/blocks/HowItWorks';
import WhyTheWolfWorks from './components/blocks/WhyTheWolfWorks';
import AboutTheWolfPack from './components/blocks/AboutTheWolfPack';


const Home = async () => {
    const [homepageData, howItWorksData, whyTheWolfWorksData, aboutTheWolfPackData] = await Promise.all([
        client.request<GetHomepageResponse>(GET_HOMEPAGE),
        client.request<GetHowItWorksResponse>(GET_HOW_IT_WORKS),
        client.request<GetWhyTheWolfWorksResponse>(GET_WHY_THE_WOLF_WORKS),
        client.request<GetAboutTheWolfPackResponse>(GET_ABOUT_THE_WOLF_PACK),
    ])

    const hero = homepageData.nodeByUri.homepageHero
    const howItWorks = howItWorksData.nodeByUri?.howItWorksBlock
    const whyTheWolfWorks = whyTheWolfWorksData.nodeByUri?.whyTheWolfWorksBlock
    const aboutTheWolfPack = aboutTheWolfPackData.nodeByUri?.wolfPackBlock

    return (
        <>
            <Hero hero={hero} />
            {howItWorks && <HowItWorks block={howItWorks} />}
            {whyTheWolfWorks && <WhyTheWolfWorks block={whyTheWolfWorks} />}
            {aboutTheWolfPack && <AboutTheWolfPack block={aboutTheWolfPack} />}
        </>
    )
}
export default Home
