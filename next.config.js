/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: true,
    turbopack: {
        rules: {
            '*.md': {
                loaders: ['frontmatter-markdown-loader'],
                as: '*.js',
            },
        },
    },
    // eslint-disable-next-line require-await
    async headers() {
        return [
            {
                source: '/contact',
                headers: [
                    {
                        key: 'Access-Control-Allow-Origin',
                        value: `${process.env.NEXT_PUBLIC_APP_URL}`,
                    }
                ]
            }
        ];
    },
    experimental: {
        serverActions: {
            allowedOrigins: ['*.john-nik.com', 'localhost:8888', 'localhost', '192.168.10.2', 'localhost:3000'],
            allowedForwardedHosts: ['*.john-nik.com', 'localhost:8888', 'localhost', '192.168.10.2', 'localhost:3000'],
            serverActions: true
        }
    }
};

module.exports = nextConfig;