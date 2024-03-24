/** @type {import('next').NextConfig} */

const nextConfig = {
    swcMinify: true,
    reactStrictMode: true,
    webpack: (cfg) => {
        cfg.module.rules.push(
            {
                test: /\.md$/,
                loader: 'frontmatter-markdown-loader'
            }
        )
        return cfg
    },
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
        ]
    },
    experimental: {
        serverActions: {
            allowedOrigins: ['*.john-nik.com', 'localhost:8888', 'localhost', '192.168.10.2', 'localhost:3000'],
            allowedForwardedHosts: ['*.john-nik.com', 'localhost:8888', 'localhost', '192.168.10.2', 'localhost:3000'],
            serverActions: true
        }
    }
}

module.exports = nextConfig