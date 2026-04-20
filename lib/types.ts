// Featured Image
export interface FeaturedImage {
    node: {
        sourceUrl: string
        altText: string
    }
}

// Page
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

// Pages
export interface GetAllPagesResponse {
    pages: {
        nodes: Page[]
    }
}
export interface GetPageBySlugResponse {
    nodeByUri: SinglePage | null
}

// Menu
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

// Homepage Hero
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
export interface GetHomepageResponse {
    nodeByUri: {
        homepageHero: HomepageHero
    }
}

// How It Works Block
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
export interface GetHowItWorksResponse {
    nodeByUri: {
        howItWorksBlock: HowItWorksSection
    } | null
}

// Why The Wolf Works Block
export interface WhyTheWolfWorksBlock {
    heading: string;
    subHeading: string;
    content: string;
    tagline: string;
    image: {
        node: {
            sourceUrl: string;
            altText: string;
        }
    }
}
export interface GetWhyTheWolfWorksResponse {
    nodeByUri: {
        whyTheWolfWorksBlock: WhyTheWolfWorksBlock
    } | null
}

// About The Wolf Pack
export interface AboutTheWolfPackBlock {
    members: Array<{
        member: {
            name: string;
            roles: Array<{
                role: string;
            }>;
            bio: string;
            photo: {
                node: {
                    sourceUrl: string;
                    altText: string;
                }
            }
        }
    }>
}
export interface GetAboutTheWolfPackResponse {
    nodeByUri: {
        wolfPackBlock: AboutTheWolfPackBlock
    } | null
}

// Pricing Guide Block
export interface PricingGuideBlock {
    plans: Array<{
        plan: {
            title: string;
            description: string;
            price: string;
            primaryFeature: string;
            features: Array<{
                feature: string;
            }>;
            openModal: boolean;
            ctaLabel: string;
            modalTrigger: string;
            ctaUrl: string;
            bestFor: string;
            featured: boolean;
        }
    }>;
}
export interface GetPricingGuideResponse {
    nodeByUri: {
        pricingGuideBlock: PricingGuideBlock
    } | null
}

// Testimonial
export interface Testimonial {
    quote: string
    clientName: string
    role: string
    company: string
    photo: {
        node: {
            sourceUrl: string
            altText: string
        }
    } | null
}
export interface GetTestimonialsResponse {
    testimonials: {
        nodes: Array<{
            testimonials: Testimonial
        }>
    }
}

// AI Report Prompts
export interface AiReportPrompt {
    databaseId: number
    title: string
    aiReportPrompts: {
        postContent: string
    }
}
export interface GetAiReportPromptsResponse {
    aIReportPrompts: {
        nodes: AiReportPrompt[]
    }
}
export interface GetAiReportPromptResponse {
    aIReportPrompt: AiReportPrompt | null
}

// Report Form Data
export interface ReportFormData {
    clientName: string
    clientEmail: string
    clientDomain: string
    promptId: number
    promptTitle: string
    uuid: string
}

// Structured report data returned by the AI
export interface ConversionReadiness {
    clarity: number
    trust_signals: number
    mobile_experience: number
    conversion_structure: number
    overall: number
}
export interface WolfScoreData {
    score: number
    summary: string
    red_flags: string[]
    leaky_bucket: string
    strategic_pivot: string
    recommendation: string
}
export interface ReportStructuredData {
    executive_summary: string
    quick_win: { title: string; description: string }
    accessibility_view: string
    client_view: string
    revenue_view: string
    conversion_readiness: ConversionReadiness
    wolf_score: WolfScoreData
    report_html: string
}

// Shape returned by the WP REST fetch-by-UUID endpoint
export interface SiteReportResponse extends ReportStructuredData {
    client_name: string
    client_domain: string
}

