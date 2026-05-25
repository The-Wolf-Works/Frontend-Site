import { callAI, AIRequestOptions } from '@/app/utils/aiClient'
import { ReportStructuredData } from '@/lib/types'

const SYSTEM_PROMPT = `You are a professional digital strategist and web analyst representing The Wolf Works. Use British English for all spelling and vocabulary. When returning JSON, use plain UTF-8 characters directly in all string values — do not use Unicode escape sequences. For example: write £ not \\u00a3, write " not \\u201c, write " not \\u201d, write ' not \\u2018, write ' not \\u2019. This applies everywhere in the JSON, including currency symbols in roi_table_data values.`

/**
 * Calls the AI with the given prompt and parses the structured JSON response
 * @param promptContent
 * @returns ReportStructuredData
 */
export const generateReport = async (
    promptContent: string,
): Promise<ReportStructuredData> => {

    const provider = process.env.REPORT_AI_PROVIDER as AIRequestOptions["provider"]
    const model = provider === 'anthropic' ? 'claude-sonnet-4-6' : 'gpt-5.4'

    const raw = await callAI({
        provider,
        model,
        systemPrompt: SYSTEM_PROMPT,
        userPrompt: promptContent
    })

    try {
        return JSON.parse(raw) as ReportStructuredData
    } catch {
        throw new Error(`AI response was not valid JSON. First 200 chars: ${raw.slice(0, 200)}`)
    }
}
