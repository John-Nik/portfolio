export default function sitemap() {
    return [
        {
            url: 'https://john-nik.com',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 1
        },
        {
            url: 'https://john-nik.com/about',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.6
        },
        {
            url: 'https://john-nik.com/portfolio',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.6
        },
        {
            url: 'https://john-nik.com/contact',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.6
        }
    ];
}