import { ZCOOL_QingKe_HuangYou, Fira_Code, Press_Start_2P } from 'next/font/google';
import './global.scss';
import { Partytown } from '@builder.io/partytown/react';


const zcoolFont = ZCOOL_QingKe_HuangYou({subsets: ['latin'], weight: ['400'], display: 'swap'})
const firaCodeFont = Fira_Code({subsets: ['latin'], preload: true, variable: '--fira-code', display: 'swap'})
const pressStartFont = Press_Start_2P({subsets: ['latin'], weight: ['400'], preload: true, variable: '--press-start-font', display: 'swap'})


export default function heads({children}) {
    return (
        <html lang="en">
            <head>
                <Partytown forward={['dataLayer.push']} />

                {/* <!-- Google Tag Manager --> */}
                <script type="text/partytown" dangerouslySetInnerHTML={{
                    __html: "!function(e,t,a,n,g){e[n]=e[n]||[],e[n].push({'gtm.start':(new Date).getTime(),event:'gtm.js'});var m=t.getElementsByTagName(a)[0],r=t.createElement(a);r.async=!0,r.src='https://www.googletagmanager.com/gtm.js?id=GTM-TZNHH5M7',m.parentNode.insertBefore(r,m)}(window,document,'script','dataLayer');console.log('ran gtag')"
                }} />
                {/* <!-- Google Tag Manager --> */}

            </head>
            <body className={`${zcoolFont.className} ${firaCodeFont.variable} ${pressStartFont.variable}`}>
                {/* <-- Google Tag Manager (noscript) --> */}
                <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TZNHH5M7"
                height="0" width="0" style={{display: 'none', visiblity: 'hidden'}}></iframe></noscript>
                {/* <-- End Google Tag Manager (noscript) --> */}

                {children}
                
                <div className={'is-minesweeper-playing-in-homepage'} />
                <div className={'is-minesweeper-playing-in-about-page'} />
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
                url: 'https://nextjs.org/og.png', // Must be an absolute URL
                width: 800,
                height: 600,
            },
            {
                url: 'https://nextjs.org/og-alt.png', // Must be an absolute URL
                width: 1800,
                height: 1600,
                alt: 'My custom alt',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Giannis Nikolaou | Portfolio',
        description: 'This portfolio was made using NextJS, React, SCSS and Decap as the CMS. It has a page describing me, a projects page to see everything I\'ve built up until now, and a contact page'
    },
    verification: {
        google: '',
        bing: '',
        yahoo: '',
        yandex: '',
        other: {
            example: ['example1', 'example2']
        }
    },
    other: {
        custom: 'metadata'
    }
}