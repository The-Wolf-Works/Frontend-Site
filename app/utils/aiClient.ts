export interface AIRequestOptions {
    provider: 'anthropic' | 'openai'
    model: string
    systemPrompt: string
    userPrompt: string
    maxTokens?: number
}

/**
 * Strip markdown code fences from AI response and extract JSON if present.
 * Handles ```json, ```html, ``` or any other language identifier.
 */
const stripMarkdownFences = (text: string): string => {
    const stripped = text
        .replace(/^```[a-zA-Z]*\s*/i, '')
        .replace(/\s*```[\s\S]*$/, '')
        .trim()

    // If the stripped result looks like it contains a JSON object, extract it
    const jsonMatch = stripped.match(/(\{[\s\S]*\})/)
    if (jsonMatch) return jsonMatch[1]

    return stripped
}

/**
 * Call to Anthropic's API endpoint
 * @param options
 * @returns string - AI response
 */
const callAnthropic = async (options: AIRequestOptions): Promise<string> => {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
            'x-api-key': process.env.ANTHROPIC_API_KEY!,
            'anthropic-version': '2023-06-01',
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            model: options.model,
            max_tokens: options.maxTokens ?? 8192,
            temperature: 0.7,
            system: options.systemPrompt,
            messages: [
                {
                    role: 'user',
                    content: options.userPrompt
                }
            ]
        })
    })

    if (!res.ok) throw new Error(`Anthropic API error: ${res.status}`)

    const data = await res.json()
    return stripMarkdownFences(data.content[0].text)
}

/**
 * Call to Open AI's API endpoint
 * @param options
 * @returns string - AI response
 */
const callOpenAI = async (options: AIRequestOptions): Promise<string> => {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            model: options.model,
            max_completion_tokens: options.maxTokens ?? 8192,
            temperature: 0.7,
            messages: [
                {
                    role: 'system',
                    content: options.systemPrompt
                },
                {
                    role: 'user',
                    content: options.userPrompt
                }
            ]
        })
    })

    if (!res.ok) {
        const errorData = await res.json().catch(() => null)
        throw new Error(`OpenAI API error: ${res.status} — ${errorData?.error?.message ?? 'Unknown error'}`)
    }

    const data = await res.json()
    return stripMarkdownFences(data.choices[0].message.content)
}

/**
 * Gates which AI API endpoint method to be called based on stored value
 * @param options
 * @returns string - AI response | error
 */
export const callAI = async (options: AIRequestOptions): Promise<string> => {
    switch (options.provider) {
        case 'anthropic':
            return callAnthropic(options)
        case 'openai':
            return callOpenAI(options)
        default:
            throw new Error(`Unsupported AI provider: ${options.provider}`)
    }
}
