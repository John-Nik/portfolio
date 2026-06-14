import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

function redirectToLowercasePath(request: NextRequest, lowercaseLink: string) {
    if (request.nextUrl.pathname === lowercaseLink) return;
    return NextResponse.redirect(new URL(request.nextUrl.href.toLowerCase()));
}

export default function proxy(request: NextRequest) {
    const lowercaseLink = request.nextUrl.pathname.toLowerCase();

    // Handle special cases where I must type the extensions explicitly
    const specialCases: { [key: string]: NextResponse } = {
        '/admin': NextResponse.redirect(new URL(`${request.nextUrl.origin}/admin/index.html`)),
        '/dark.css': NextResponse.redirect(new URL(`${request.nextUrl.origin}/admin/dark.css`)),
        '/config.yml': NextResponse.redirect(new URL(`${request.nextUrl.origin}/admin/config.yml`)),
    };

    return specialCases[request.nextUrl.pathname] ?? redirectToLowercasePath(request, lowercaseLink);
}