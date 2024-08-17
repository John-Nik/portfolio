import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const lowercaseLink = request.nextUrl.pathname.toLowerCase();

    switch (lowercaseLink) {
        case '/admin':
            return NextResponse.rewrite(new URL(request.nextUrl.origin + '/admin/index.html'));
        case '/dark.css':
            return NextResponse.redirect(new URL(request.nextUrl.origin + '/admin/dark.css'));
        case '/config.yml':
            return NextResponse.redirect(new URL(request.nextUrl.origin + '/admin/config.yml'));
    }

    if (request.nextUrl.pathname != lowercaseLink)
        return NextResponse.redirect(new URL(request.nextUrl.href.toLowerCase()));
}