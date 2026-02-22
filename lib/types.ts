export interface FeaturedImage {
    node: {
        sourceUrl: string
        altText: string
    }
}

export interface Page {
    id: string;
    title: string
    slug: string
    date: string
    featuredImage: FeaturedImage | null
}

export interface SinglePage extends Page {
    content: string
}

export interface GetAllPagesResponse {
    pages: {
        nodes: Page[]
    }
}

export interface GetPageBySlugResponse {
    pageBy: SinglePage | null
}

export interface MenuItem {
    id: string;
    label: string;
    url: string;
    path: string;
}

export interface GetMenuResponse {
    menuItems: {
        nodes: MenuItem[]
    }
}
