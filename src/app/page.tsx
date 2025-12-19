import Footer from './components/footer/footer';
import Header from './components/header/Header';
import './components/minesweeper/minesweeper.scss';
import dynamic from 'next/dynamic';
import SocialsIcon from './components/icons-components/SocialsIcon';
import FlagIcon from './components/icons-components/FlagIcon';

interface alternates {
    canonical: string
}

export type metadataType = {
    title: string,
    description?: string,
    alternates?: alternates
};

export const metadata: metadataType = {
    title: 'Giannis N. | Home',
    description: 'The portfolio of Giannis N. It was made using NextJS, React, SCSS, and Decap CMS',
    alternates: {
        canonical: '/'
    },
};

const MinesweeperContainer = dynamic(() => import('./components/minesweeper/minesweeperContainer'));

export default function page() {
    return (
        <>
            <Header>
                <div className="dead-smiley-wrapper">
                    <img src="/icons/dead-smiley.png" />
                </div>
            </Header>

            <main className="homepage-body">
                <MinesweeperContainer />
            </main>

            <Footer>
                <li className="socials-icon-wrap">
                    <SocialsIcon />
                </li>
                <li className="flag-icon-wrap">
                    <FlagIcon />
                </li>
            </Footer>
        </>
    );
}