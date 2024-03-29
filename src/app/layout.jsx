import { ZCOOL_QingKe_HuangYou, Fira_Code, Press_Start_2P } from 'next/font/google';
import './global.scss';
import { GoogleTagManager } from '@next/third-parties/google'


const zcoolFont = ZCOOL_QingKe_HuangYou({subsets: ['latin'], weight: ['400'], variable: '--zcool-font', display: 'swap'})
const firaCodeFont = Fira_Code({subsets: ['latin'], preload: true, variable: '--fira-code', display: 'swap'})
const pressStartFont = Press_Start_2P({subsets: ['latin'], weight: ['400'], preload: true, variable: '--press-start-font', display: 'swap'})


export default function heads({children}) {
    return (
        <html lang="en">
            <body className={`${zcoolFont.className} ${zcoolFont.variable} ${firaCodeFont.variable} ${pressStartFont.variable}`}>
                <GoogleTagManager gtmId="GTM-TZNHH5M7" />

                {children}
                
                <div aria-hidden="true" className={'is-minesweeper-playing-in-homepage'} />
                <div aria-hidden="true" className={'is-minesweeper-playing-in-about-page'} />
            </body>
        </html>
    )
}

export const viewport = {
    width: 'device-width',
    initialScale: 1,
    minimumScale: 1,
    viewportFit: 'cover',
    themeColor: '#011627',
    colorScheme: '#011627'
}

export const metadata = {
    keywords: ['Portfolio', 'Giannis', 'Nikolaou', 'N.', 'NextJS', 'React', 'SCSS', 'Decap', 'CMS', 'Minesweeper', 'About', 'Contact', 'Me'],
    description: 'The portfolio of Giannis N. It was made using NextJS, React, SCSS, and Decap CMS',
    authors: [{name: 'Giannis Nikolaou'}],
    creator: 'Giannis Nikolaou',
    metadataBase: new URL('https://john-nik.com'),
    openGraph: {
        title: 'Giannis Nikolaou | Portfolio',
        description: 'This portfolio was made using NextJS, React, SCSS and Decap as the CMS. It has a page describing me, a projects page to see everything I\'ve built up until now, and a contact page',
        url: 'https://john-nik.com',
        siteName: 'Giannis Nikolaou | Portfolio',
        locale: 'en_US',
        type: 'website',
        authors: ['Giannis Nikolaou'],
        robots: {
            index: true,
            follow: true,
            nocache: true,
            translate: false,
            archive: false,
            snippet: false,
            indexifembedded: true,
        },
        images: [
            {
                url: 'https://john-nik.com/images/portfolio.webp',
                width: 800,
                height: 600,
            },
            {
                url: 'https://john-nik.com/images/portfolio.webp',
                width: 1800,
                height: 1600,
                alt: 'Giannis Nikolaou | Personal Portfolio',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Giannis Nikolaou | Portfolio',
        description: 'This portfolio was made using NextJS, React, SCSS and Decap as the CMS. It has a page describing me, a projects page to see everything I\'ve built up until now, and a contact page'
    }
}