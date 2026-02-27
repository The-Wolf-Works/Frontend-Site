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
    query GetHomepageHero {
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


