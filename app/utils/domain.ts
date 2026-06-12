/**
 * Normalises a domain string to a consistent bare format.
 * Strips protocol, www prefix, and trailing slashes.
 * e.g. "https://www.thewolf.works/" → "thewolf.works"
 */
export const normaliseDomain = (domain: string): string => {
    return domain
        .trim()
        .toLowerCase()
        .replace(/^https?:\/\//, '')
        .replace(/^www\./, '')
        .replace(/\/+$/, '')
}

/**
 * Ensures a domain string has an https:// protocol prefix.
 * e.g. "thewolf.works" → "https://thewolf.works"
 * e.g. "https://thewolf.works" → "https://thewolf.works"
 */
export const ensureProtocol = (domain: string): string => {
    const trimmed = domain.trim()
    if (/^https?:\/\//i.test(trimmed)) return trimmed
    return `https://${trimmed}`
}
