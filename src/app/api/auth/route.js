export const runtime = 'nodejs';

export async function GET(request) {
    let response = new URL(request.url);

    const client_id = process.env.GITHUB_CLIENT_ID;

    try {
        const redirectUrl = new URL('https://github.com/login/oauth/authorize');
        redirectUrl.searchParams.set('client_id', client_id);
        redirectUrl.searchParams.set('redirect_uri', response.origin + '/api/callback');
        redirectUrl.searchParams.set('scope', 'repo user');
        redirectUrl.searchParams.set(
            'state',
            crypto.getRandomValues(new Uint8Array(12)).join(''),
        );
        return Response.redirect(redirectUrl.href, 301);

    } catch (error) {
        console.log(error)
        return new Response(error.message, {
            status: 500,
        });
    }
}