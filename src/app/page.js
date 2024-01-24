import Footer from './components/footer/footer.js';
import Tetris from './components/tetris/tetris.js'

export default function page() {
    return (
        <>
            <main>
                <Tetris />
            </main>
            
            <Footer>
                
            </Footer>
        </>
    )
}

export const metadata = {
    title: 'Giannis N.'
}