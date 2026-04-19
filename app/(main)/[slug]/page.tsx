import { client } from '@/lib/client';
import { GET_PAGE_BY_SLUG, GET_ALL_PAGES } from '@/lib/queries';
import type { GetPageBySlugResponse, GetAllPagesResponse } from '@/lib/types';
import { notFound } from 'next/navigation';
import Image from 'next/image';

export async function generateStaticParams() {
  const data = await client.request<GetAllPagesResponse>(GET_ALL_PAGES);
  return data.pages.nodes.map((page) => ({
    slug: page.slug,
  }));
}

interface PageProps {
    params: Promise<{
        slug: string
    }>;
}

const Page = async ({ params }: PageProps) => {

    const { slug } = await params
    const data = await client.request<GetPageBySlugResponse>(
    GET_PAGE_BY_SLUG,
    { uri: `/${slug}/` }
  )

  const page = data.nodeByUri;

  if (!page) {
    notFound();
  }

  return (
    <article className="max-w-3xl mx-auto p-8">
      {page.featuredImage && (
        <Image
          src={page.featuredImage.node.sourceUrl}
          alt={page.featuredImage.node.altText}
          className="w-full h-64 object-cover rounded mb-8"
          width={1000}
          height={600}
        />
      )}
      <h1 className="text-4xl font-bold mb-4">{page.title}</h1>
      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: page.content }}
      />
    </article>
  )
}
export default Page
