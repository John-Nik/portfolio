export async function GET(request) {
    const {
        req, // same as existing Worker API
        env, // same as existing Worker API
        params, // if filename includes [id] or [[path]]
        waitUntil, // same as ctx.waitUntil in existing Worker API
        next, // used for middleware or to fetch assets
        data, // arbitrary space for passing data between middlewares
    } = await request;

    const client_id = '0fe9a26f1a94405bb663';

    try {
        const url = new URL(req.url);
        const redirectUrl = new URL('https://github.com/login/oauth/authorize');
        redirectUrl.searchParams.set('client_id', client_id);
        redirectUrl.searchParams.set('redirect_uri', url.origin + '/api/callback');
        redirectUrl.searchParams.set('scope', 'repo user');
        redirectUrl.searchParams.set(
            'state',
            crypto.getRandomValues(new Uint8Array(12)).join(''),
        );
        return Response.redirect(redirectUrl.href, 301);

    } catch (error) {
        console.error(error);
        return new Response(error.message, {
            status: 500,
        });
    }
}