import { callAI, AIRequestOptions } from '@/app/utils/aiClient'

const SYSTEM_PROMPT = `You are a professional digital strategist and web analyst representing The Wolf Works. Use British English for all spelling and vocabulary.`

/**
 * Collects required AI properties to pass to API
 * @param promptContent
 * @returns callAI method
 */
export const generateReport = async (
    promptContent: string,
): Promise<string> => {

    const provider = process.env.REPORT_AI_PROVIDER as AIRequestOptions["provider"]
    const model = provider === 'anthropic' ? 'claude-sonnet-4-6' : 'gpt-4o'

    return callAI({
        provider,
        model,
        systemPrompt: SYSTEM_PROMPT,
        userPrompt: promptContent
    })
}
