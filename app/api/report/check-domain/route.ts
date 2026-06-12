import { NextRequest, NextResponse } from "next/server";
import { wpFetch } from "@/lib/wp";
import { normaliseDomain } from "@/app/utils/domain";

/**
 * Check if a domain is available for reporting
 * @param req The request object
 * @returns The response object
 */
export const GET = async (req: NextRequest) => {
    const raw = req.nextUrl.searchParams.get('domain')

    if (!raw) {
        return NextResponse.json({ error: 'Missing domain' }, { status: 400 })
    }

    const domain = normaliseDomain(raw)

    const res = await wpFetch(
        `/reports/check-domain?domain=${encodeURIComponent(domain)}`
    )

    if (!res.ok) {
        return NextResponse.json({error: 'Failed to check domain'}, { status: 500 })
    }

    const data = await res.json()
    return NextResponse.json(data)
}
