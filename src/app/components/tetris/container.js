import Tetris from './tetris.js'
import './container.scss';

export default function Container() {
    return (
        <section id={'tetris-container'}>
            <Tetris />
        </section>
    )
}