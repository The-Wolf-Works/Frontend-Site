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
    nodeByUri: SinglePage | null
}

export interface MenuItem {
    cssClasses: string[];
    id: string;
    label: string;
    path: string;
    url: string;
}

export interface GetMenuResponse {
    menuItems: {
        nodes: MenuItem[]
    }
}

export interface HomepageHero {
    heroHeading: string;
    heroSubheading: string;
    heroStatement: {
        firstLine: string;
        secondLine: string;
    }
    ctaLabel: string;
    ctaUrl: string;
    secondaryNavLabel: string;
    secondaryNavUrl: string;
}

export interface GetHomepageHeroResponse {
    nodeByUri: {
        homepageHero: HomepageHero
    }
}

export interface HowItWorksStep {
    title: string
    excerpt: string
    icon: string | null  // maps to IconName from icons.tsx
}

export interface HowItWorksSection {
    steps: Array<{
        step: HowItWorksStep
    }>
}

export interface GetHomepageResponse {
    nodeByUri: {
        homepageHero: HomepageHero
    }
}

export interface GetHowItWorksResponse {
    nodeByUri: {
        howItWorksBlock: HowItWorksSection
    } | null
}
