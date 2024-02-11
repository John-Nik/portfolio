import Footer from './components/footer/footer.js';
import MinesweeperContainer from './components/minesweeper/minesweeperContainer.js'
import './components/minesweeper/minesweeper.scss'

export default function page() {
    return (
        <>
            <main>
                <MinesweeperContainer />
            </main>
            
            <Footer>
                
            </Footer>
        </>
    )
}

export const metadata = {
    title: 'Giannis N.'
}