import Footer from './components/footer/footer.js';
import TetrisContainer from './components/tetris/tetrisContainer.js'
import './components/tetris/tetris.scss'

export default function page() {
    return (
        <>
            <main>
                <TetrisContainer />
            </main>
            
            <Footer>
                
            </Footer>
        </>
    )
}

export const metadata = {
    title: 'Giannis N.'
}