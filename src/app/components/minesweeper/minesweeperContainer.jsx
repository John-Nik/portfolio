import Script from 'next/script'
import Content from './content.jsx'
import './styling.scss'

export default function MinesweeperContainer() {
    return (
        <section id={'minesweeper-container'}>
            <Content />
            <div id={'game'}></div>
            <Script src="scripts/minesweeper.js" strategy="lazyOnload" />
        </section>
    )
}