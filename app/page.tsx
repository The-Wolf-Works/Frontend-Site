import { client } from '@/lib/client';
import { GET_PAGE_BY_SLUG } from '@/lib/queries';
import type { GetPageBySlugResponse } from '@/lib/types';
import HeroSection from '@/app/components/hero/HeroSection';

export const Home = async () => {
    const data = await client.request<GetPageBySlugResponse>(
        GET_PAGE_BY_SLUG,
        { uri: '/home/' }
    );

    const page = data.pageBy;

    return (
        <>
            <HeroSection />
            {page?.content && (
                <div className="max-w-3xl mx-auto px-6 py-12">
                    <div
                        className="prose prose-lg max-w-none"
                        dangerouslySetInnerHTML={{ __html: page.content }}
                    />
                </div>
            )}
        </>
    )
}
export default Home
