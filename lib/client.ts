import { GraphQLClient } from 'graphql-request'

const endpoint = process.env.NEXT_PUBLIC_WORDPRESS_API_URL ?? ''

/**
 * GraphQL client for WordPress
 */
export const client = new GraphQLClient(endpoint, {
    headers: {
        'Content-Type': 'application/json'
    }
})
