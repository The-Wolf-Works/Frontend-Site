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
    pageBy(uri: $uri) {
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
`

export const GET_PRIMARY_MENU = gql`
    query GetPrimaryMenu {
        menuItems(where: {location: PRIMARY}) {
            nodes {
                id
                label
                url
                path
            }
        }
    }
`
