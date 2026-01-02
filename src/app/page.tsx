/* eslint-disable react/jsx-no-comment-textnodes */
 
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
                <div
                    data-smiley-face-wrapper
                    className="hidden top-1/2 left-1/2 z-10 absolute items-center xl:items-center -translate-x-1/2 -translate-y-1/2"
                >
                    <img
                        className="w-[34px] h-[34px] cursor-pointer"
                        src="/icons/dead-smiley.png"
                    />
                </div>
            </Header>

            <main className="flex flex-col flex-1 w-full">
                <MinesweeperContainer />
            </main>

            <Footer className="md:*:justify-start *:justify-between *:gap-16!">
                <li
                    data-flag-icon-wrapper
                    className="hidden!"
                >
                    <FlagIcon />
                </li>
                <li
                    data-bombs-placed-placeholder
                    className="relative opacity-0 w-fit! text-white text-base tracking-[2px] hidden!"
                >
                    // Bombs Placed
                    {/* 
                    * Placeholder text. The "Bombs Placed" element, which is located outside the footer,
                    * has positioning of absolute, and so we occupy this space with an invisible element
                    */}
                </li>
            </Footer>
        </>
    );
}