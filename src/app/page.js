import Footer from './components/footer-homepage/footer.js';
import MinesweeperContainer from './components/minesweeper/minesweeperContainer.js'
import './components/minesweeper/minesweeper.scss';
import Header from './components/header-homepage/Header.js';



export default function page() {
    return (
        <>
            <Header />

            <main>
                <MinesweeperContainer />
            </main>
            
            <Footer />
        </>
    )
}

export const metadata = {
    title: 'Giannis N.'
}