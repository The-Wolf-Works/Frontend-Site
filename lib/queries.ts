import { gql } from 'graphql-request'

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


