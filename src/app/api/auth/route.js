export const runtime = 'edge';

export async function GET(request) {
    const client_id = process.env.GITHUB_CLIENT_ID;
    const requestUrl = new URL(request.url);

    try {
        const redirectUrl = new URL('https://github.com/login/oauth/authorize');

        redirectUrl.searchParams.set('client_id', client_id);
        redirectUrl.searchParams.set('redirect_uri', `${requestUrl.origin}/api/callback`);
        redirectUrl.searchParams.set('scope', 'repo user');
        redirectUrl.searchParams.set('state', crypto.getRandomValues(new Uint8Array(12)).join(''));

        return Response.redirect(redirectUrl.href, 301);
    } catch (error) {
        return new Response(error.message, {
            status: 500,
        });
    }
}