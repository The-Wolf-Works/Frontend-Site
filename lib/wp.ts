
/**
 * Generates the basic auth header for WordPress REST API
 * @returns The basic auth header
 */
export const getAuthHeader = () => {
    const credentials = Buffer.from(
        `${process.env.WP_APP_USERNAME}:${process.env.WP_APP_PASSWORD}`
    ).toString('base64')
    return { Authorization: `Basic ${credentials}` }
}

/**
 * Fetches data from the WordPress REST API
 * @param path The path to fetch
 * @param options The request options
 * @returns The response from the WordPress REST API
 */
export const wpFetch = (path: string, options?: RequestInit) => {
    return fetch(`${process.env.NEXT_PUBLIC_WP_REST_URL}${path}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...getAuthHeader(),
            ...options?.headers,
        }
    })
}
