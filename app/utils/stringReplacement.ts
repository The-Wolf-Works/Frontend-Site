// Replace placeholders in text with values from vars
export const replacePlaceholders = (text: string, vars: Record<string, string>): string => {
    return Object.entries(vars).reduce(
        (str, [key, value]) => str.replaceAll(`{${key}}`, value),
        text
    )
}
