import Footer from './components/footer-homepage/footer';
import Header from './components/header-homepage/Header';
import './components/minesweeper/minesweeper.scss';
import { ReactElement } from 'react';
import dynamic from 'next/dynamic';

const MinesweeperContainer = dynamic(() => import('./components/minesweeper/minesweeperContainer'));


export default function page(): ReactElement {
    return (
        <>
            <Header />

            <main className={'homepage-body'}>
                <MinesweeperContainer />
            </main>
            
            <Footer />
        </>
    )
}

interface alternates {
    canonical: string
}

export type metadataType = {
    title: string,
    description?: string,
    alternates?: alternates
}

export const metadata: metadataType = {
    title: 'Giannis N. | Home',
    description: 'The portfolio of Giannis N. It was made using NextJS, React, SCSS, and Decap CMS',
    alternates: {
        canonical: '/'
    },
}