import Footer from './components/footer-homepage/footer.jsx';
import MinesweeperContainer from './components/minesweeper/minesweeperContainer.jsx'
import './components/minesweeper/minesweeper.scss';
import Header from './components/header-homepage/Header.jsx';



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