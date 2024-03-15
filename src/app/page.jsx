import Footer from './components/footer-homepage/footer.jsx';
import MinesweeperContainer from './components/minesweeper/minesweeperContainer.jsx'
import Header from './components/header-homepage/Header.jsx';
import './components/minesweeper/minesweeper.scss';



export default function page() {
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

export const metadata = {
    title: 'Giannis N. | Home',
    description: 'The portfolio of Giannis N. It was made using NextJS, React, SCSS, and Decap CMS',
    alternates: {
        canonical: '/'
    },
}