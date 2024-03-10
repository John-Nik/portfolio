/** @type {import('next').NextConfig} */
const nextConfig = {
    swcMinify: true,
    webpack: (cfg) => {
        cfg.module.rules.push(
            {
                test: /\.md$/,
                loader: 'frontmatter-markdown-loader'
            }
        )
        return cfg
    }
}

module.exports = nextConfig
