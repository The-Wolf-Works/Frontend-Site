import { GraphQLClient } from 'graphql-request'

const endpoint = process.env.NEXT_PUBLIC_WORDPRESS_API_URL as string

if (!endpoint) {
    throw new Error('NEXT_PUBLIC_WORDPRESS_API_URL is not defined in .env.local')
}

export const client = new GraphQLClient(endpoint, {
    headers: {
        'Content-Type': 'application/json'
    }
})
