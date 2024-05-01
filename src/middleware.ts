import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    if (request.nextUrl.pathname != request.nextUrl.pathname.toLowerCase())
        return NextResponse.redirect(new URL(request.nextUrl.href.toLowerCase()));
}