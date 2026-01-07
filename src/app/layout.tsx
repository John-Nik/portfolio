import { ZCOOL_QingKe_HuangYou, Fira_Code, Press_Start_2P } from 'next/font/google';
import './global.scss';
import { NextFontWithVariable } from 'next/dist/compiled/@next/font';
import { ReactNode } from 'react';

type viewPortType = {
    width: string,
    initialScale: number,
    minimumScale: number,
    viewportFit: string,
    themeColor: string,
    colorScheme: string
};

// eslint-disable-next-line new-cap
const zcoolFont: NextFontWithVariable = ZCOOL_QingKe_HuangYou({
    subsets: ['latin'],
    style: 'normal',
    preload: true,
    weight: ['400'],
    variable: '--zcool-font',
    display: 'swap'
});
// eslint-disable-next-line new-cap
const firaCodeFont: NextFontWithVariable = Fira_Code({
    subsets: ['latin'],
    weight: ['300', '400', '500'],
    preload: true,
    variable: '--fira-code',
    display: 'swap'
});
// eslint-disable-next-line new-cap
const pressStartFont: NextFontWithVariable = Press_Start_2P({
    subsets: ['latin'],
    style: 'normal',
    weight: ['400'],
    preload: true,
    variable: '--press-start-font',
    display: 'swap'
});

export default function mainLayout({ children }: { children: ReactNode }) {
    return (
        <html
            lang="en"
            className="h-full"
            suppressHydrationWarning
        >
            <body className={`${zcoolFont.variable} ${firaCodeFont.variable} ${pressStartFont.variable} w-full h-full font-(family-name:--zcool-font) overflow-hidden`}>
                <div className="relative grid grid-rows-[auto_1fr_auto] w-full h-full overflow-hidden">
                    {children}
                </div>
            </body>
        </html>
    );
}

export const viewport: viewPortType = {
    width: 'device-width',
    initialScale: 1,
    minimumScale: 1,
    viewportFit: 'cover',
    themeColor: '#011627',
    colorScheme: '#011627'
};

export const metadata = {
    keywords: ['Portfolio', 'Giannis', 'Nikolaou', 'N.', 'NextJS', 'React', 'SCSS', 'Decap', 'CMS', 'Minesweeper', 'About', 'Contact', 'Me'],
    description: 'The portfolio of Giannis N. It was made using NextJS, React, SCSS, and Decap CMS',
    authors: [
        { name: 'Giannis Nikolaou' }
    ],
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
};