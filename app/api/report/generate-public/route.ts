import { NextRequest, NextResponse } from "next/server"
import { client } from '@/lib/client'
import { GET_AI_REPORT_PROMPT } from "@/lib/queries"
import { GetAiReportPromptResponse } from "@/lib/types"
import { replacePlaceholders } from '@/app/utils/stringReplacement'
import { generateReport } from '../generate/reportGenerator'

// Default prompt used for public free reports.
// Update this ID to change the prompt for all public reports.
// When industry selection is added, this becomes the fallback default.
const PUBLIC_PROMPT_ID = 180

/**
 * Generates an AI report for a public domain submission.
 * @param req - { domain }
 * @returns structured report data
 */
export const POST = async (req: NextRequest) => {
    try {
        const { domain } = await req.json()

        if (!domain) {
            return NextResponse.json({ error: 'Missing domain' }, { status: 400 })
        }

        const data = await client.request<GetAiReportPromptResponse>(GET_AI_REPORT_PROMPT, {
            id: PUBLIC_PROMPT_ID
        })

        if (!data.aIReportPrompt?.content) {
            return NextResponse.json({ error: 'Prompt not found' }, { status: 404 })
        }

        const prompt = replacePlaceholders(data.aIReportPrompt.content, {
            client_name: domain,
            client_email: '',
            client_domain: domain,
        })

        const report = await generateReport(prompt)
        const freeSections = data.aIReportPrompt.aiReportPrompts?.freeSections ?? null

        return NextResponse.json({ ...report, free_sections: freeSections })

    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Failed to generate report' },
            { status: 500 }
        )
    }
}
