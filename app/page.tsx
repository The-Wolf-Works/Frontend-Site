import { client } from '@/lib/client';
import { GET_HOMEPAGE } from '@/lib/queries';
import type { GetHomepageHeroResponse } from '@/lib/types';
import Hero from './components/homepage/Hero';

const Home = async () => {
    const data = await client.request<GetHomepageHeroResponse>(GET_HOMEPAGE)
    const hero = data.nodeByUri.homepageHero

    return (
        <Hero hero={hero} />
    )
}
export default Home
