import { callAI, AIRequestOptions } from '@/app/utils/aiClient'
import { ReportStructuredData } from '@/lib/types'

const SYSTEM_PROMPT = `You are a professional digital strategist and web analyst representing The Wolf Works. Use British English for all spelling and vocabulary.`

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
        throw new Error('AI response was not valid JSON. Check the prompt instructs the model to return structured JSON.')
    }
}
