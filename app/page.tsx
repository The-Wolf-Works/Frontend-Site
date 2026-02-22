import { client } from '@/lib/client';
import { GET_PAGE_BY_SLUG } from '@/lib/queries';
import type { GetPageBySlugResponse } from '@/lib/types';

export const Home = async () => {
    const data = await client.request<GetPageBySlugResponse>(
        GET_PAGE_BY_SLUG,
        { uri: '/home/' }
    );

    const page = data.pageBy;

    if (!page) {
        return <main className="max-w-3xl mx-auto p-8"><h1>Welcome</h1></main>;
    }

    return (
        <main className="max-w-3xl mx-auto p-8">
            <h1 className="text-4xl font-bold mb-4">{page.title}</h1>
            <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: page.content }}
            />
        </main>
    )
}
export default Home
