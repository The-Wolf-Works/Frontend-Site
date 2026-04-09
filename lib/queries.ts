import { gql } from 'graphql-request'

// All pages
export const GET_ALL_PAGES = gql`
  query GetAllPages {
    pages {
      nodes {
        id
        title
        slug
        date
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  }
`

// Page by slug
export const GET_PAGE_BY_SLUG = gql`
    query GetPageBySlug($uri: String!) {
        nodeByUri(uri: $uri) {
            ... on Page {
                id
                title
                slug
                date
                content
                featuredImage {
                    node {
                        sourceUrl
                        altText
                    }
                }
            }
        }
    }
`

// Primary menu
export const GET_PRIMARY_MENU = gql`
    query GetPrimaryMenu {
        menuItems(where: {location: PRIMARY}) {
            nodes {
                cssClasses
                id
                label
                path
                url
            }
        }
    }
`

// Homepage block
export const GET_HOMEPAGE = gql`
    query GetHomepage {
        nodeByUri(uri: "/home/") {
            ... on Page {
                homepageHero {
                    heroHeading
                    heroSubheading
                    heroStatement {
                        firstLine
                        secondLine
                    }
                    ctaLabel
                    ctaUrl
                    secondaryNavLabel
                    secondaryNavUrl
                }
            }
        }
    }
`
// How it works block
export const GET_HOW_IT_WORKS = gql`
    query GetHowItWorksBlock {
        nodeByUri(uri: "/blocks/how-it-works/") {
            ... on Block {
                howItWorksBlock {
                    steps {
                        step {
                            title
                            excerpt
                            icon
                        }
                    }
                }
            }
        }
    }
`
// Why the Wolf Works block
export const GET_WHY_THE_WOLF_WORKS = gql`
    query GetWhyTheWolfWorksBlock {
        nodeByUri(uri: "/blocks/why-the-wolf-works/") {
            ... on Block {
                whyTheWolfWorksBlock {
                    subHeading
                    content
                    tagline
                    image {
                        node {
                            sourceUrl
                            altText
                        }
                    }
                }
            }
        }
    }
`

// About the Wolf Pack block
export const GET_ABOUT_THE_WOLF_PACK = gql`
    query GetAboutTheWolfPackBlock {
        nodeByUri(uri: "/blocks/about-the-wolf-pack/") {
            ... on Block {
                wolfPackBlock {
                    members {
                        member {
                            name
                            roles {
                            role
                            }
                            bio
                            photo {
                                node {
                                    sourceUrl
                                    altText
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`

// Pricing Guide block
export const GET_PRICING_GUIDE = gql`
    query GetPricingGuideBlock {
        nodeByUri(uri: "/blocks/pricing-guide/") {
            ... on Block {
                pricingGuideBlock {
                    plans {
                        plan {
                            title
                            description
                            price
                            primaryFeature
                            features {
                                feature
                            }
                            openModal
                            ctaLabel
                            modalTrigger
                            ctaUrl
                            bestFor
                            featured
                        }
                    }
                }
            }
        }
    }
`

// Email templates
export const GET_EMAIL_TEMPLATES = gql`
    query GetEmailTemplates {
        emailTemplates {
            nodes {
                slug
                title
                emailTemplates {
                    formType
                    emailType
                    subject
                    bodyContent
                }
            }
        }
    }
`

// Testimonials
export const GET_TESTIMONIALS = gql`
    query GetTestimonials {
        testimonials {
            nodes {
                slug
                title
                testimonials {
                    quote
                    clientName
                    jobTitle
                    company
                    photo {
                        node {
                            sourceUrl
                            altText
                        }
                    }
                }
            }
        }
    }
`
