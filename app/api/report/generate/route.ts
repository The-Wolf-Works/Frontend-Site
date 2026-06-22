import { NextRequest, NextResponse } from "next/server"
import { client } from '@/lib/client'
import { GET_AI_REPORT_PROMPT } from "@/lib/queries"
import { GetAiReportPromptResponse } from "@/lib/types"
import { replacePlaceholders } from '@/app/utils/stringReplacement'
import { generateReport } from './reportGenerator'
import { verifyRecaptcha } from '@/app/utils/recaptcha'

/**
    * Generates an AI report for a given client and prompt
    * @param req - clientName, clientEmail, clientDomain, promptId
    * @returns { content } - Generated HTML report content
 */
export const POST = async (req: NextRequest) => {

    try {
        const { clientName, clientEmail, clientDomain, promptId, recaptchaToken } = await req.json()

        if (!clientName || !clientEmail || !clientDomain || !promptId) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
        }

        const data = await client.request<GetAiReportPromptResponse>(GET_AI_REPORT_PROMPT, {
            id: promptId
        })

        if (!data.aIReportPrompt?.content) {
            return NextResponse.json({ error: 'Prompt not found' }, { status: 404 })
        }

        const promptContent = data.aIReportPrompt.content

        const prompt = replacePlaceholders(promptContent, {
            client_name: clientName,
            client_email: clientEmail,
            client_domain: clientDomain
        })

        const report = await generateReport(prompt)
        return NextResponse.json(report)

    } catch (error) {
        return NextResponse.json({ error: error instanceof Error ? error.message : 'Failed to generate report' }, {
            status: 500
        })
    }
}
