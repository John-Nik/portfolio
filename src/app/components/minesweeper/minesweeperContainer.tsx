import Script from 'next/script'
import Content from './content'
import './styling.scss'

export default function MinesweeperContainer() {
    return (
        <section id={'minesweeper-container'}>
            <Content />
            <div id={'game'} />
            <Script src="scripts/minesweeper.js" strategy="lazyOnload" />
        </section>
    )
}