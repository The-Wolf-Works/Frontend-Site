import { client } from '@/lib/client';
import {
    GET_HOMEPAGE,
    GET_HOW_IT_WORKS,
    GET_PRICING_GUIDE,
    GET_WHY_THE_WOLF_WORKS,
    GET_ABOUT_THE_WOLF_PACK,
    GET_TESTIMONIALS
} from '@/lib/queries';
import type {
    GetHomepageResponse,
    GetHowItWorksResponse,
    GetPricingGuideResponse,
    GetWhyTheWolfWorksResponse,
    GetAboutTheWolfPackResponse,
    GetTestimonialsResponse
} from '@/lib/types';

import HeroWithForm from '../components/homepage/HeroWithForm';
import HowItWorks from '../components/blocks/HowItWorks';
import PricingGuide from '../components/blocks/PricingGuide';
import WhyTheWolfWorks from '../components/blocks/WhyTheWolfWorks';
import AboutTheWolfPack from '../components/blocks/AboutTheWolfPack';
import Testimonials from '../components/blocks/Testimonials';

const Home = async () => {
    const [homepageData, howItWorksData, pricingGuideData, whyTheWolfWorksData, aboutTheWolfPackData, testimonialsData] = await Promise.all([
        client.request<GetHomepageResponse>(GET_HOMEPAGE),
        client.request<GetHowItWorksResponse>(GET_HOW_IT_WORKS),
        client.request<GetPricingGuideResponse>(GET_PRICING_GUIDE),
        client.request<GetWhyTheWolfWorksResponse>(GET_WHY_THE_WOLF_WORKS),
        client.request<GetAboutTheWolfPackResponse>(GET_ABOUT_THE_WOLF_PACK),
        client.request<GetTestimonialsResponse>(GET_TESTIMONIALS)
    ])

    const hero = homepageData.nodeByUri.homepageHero
    const howItWorks = howItWorksData.nodeByUri?.howItWorksBlock
    const pricingGuide = pricingGuideData.nodeByUri?.pricingGuideBlock
    const whyTheWolfWorks = whyTheWolfWorksData.nodeByUri?.whyTheWolfWorksBlock
    const aboutTheWolfPack = aboutTheWolfPackData.nodeByUri?.wolfPackBlock
    const testimonials = testimonialsData.testimonials.nodes.map(n => ({
        clientName: n.title,
        photo: n.featuredImage ?? null,
        quote: n.testimonials.quote,
        businessType: n.testimonials.businessType ?? '',
        company: n.testimonials.company ?? '',
        reviewDate: n.testimonials.reviewDate ?? '',
    }))

    return (
        <>
            <HeroWithForm hero={hero} />
            {howItWorks && <HowItWorks block={howItWorks} />}
            {whyTheWolfWorks && <WhyTheWolfWorks block={whyTheWolfWorks} />}
            {testimonials && <Testimonials testimonials={testimonials} />}
            {aboutTheWolfPack && <AboutTheWolfPack block={aboutTheWolfPack} />}
            {pricingGuide && <PricingGuide block={pricingGuide} />}
        </>
    )
}
export default Home
