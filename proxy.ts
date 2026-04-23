import { NextRequest, NextResponse } from 'next/server';

const COOKIE_NAME = 'ww_report_access';
const COOKIE_MAX_AGE = 60 * 60 * 8; // 8 hours

export const proxy = (request: NextRequest) => {
    const { pathname, searchParams } = request.nextUrl;

    if (!pathname.startsWith('/report')) {
        return NextResponse.next();
    }

    const token = searchParams.get('token');
    const accessToken = process.env.REPORT_ACCESS_TOKEN;
    const existingCookie = request.cookies.get(COOKIE_NAME);

    // Valid cookie — allow through, redirect /report root to report-generator
    if (existingCookie?.value === accessToken) {
        if (pathname === '/report') {
            const url = request.nextUrl.clone();
            url.pathname = '/report/report-generator';
            return NextResponse.redirect(url);
        }
        return NextResponse.next();
    }

    // Valid token in URL — set cookie and redirect to report generator
    if (token && token === accessToken) {
        const url = request.nextUrl.clone();
        url.pathname = '/report/report-generator';
        url.searchParams.delete('token');

        const response = NextResponse.redirect(url);
        response.cookies.set(COOKIE_NAME, accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: COOKIE_MAX_AGE,
            path: '/report',
        });

        return response;
    }

    // No valid token or cookie — redirect to unauthorised page
    const url = request.nextUrl.clone();
    url.pathname = '/unauthorised';
    url.search = '';
    return NextResponse.redirect(url);
};

export default proxy;

export const config = {
    matcher: ['/report', '/report/:path*'],
};
