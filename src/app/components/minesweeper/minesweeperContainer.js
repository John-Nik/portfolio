import Script from 'next/script'
import Content from './content.js'
import './styling.scss'

export default function MinesweeperContainer() {
    return (
        <section id={'minesweeper-container'}>
            <Content />
            <div id={'game'}></div>
            <Script src="scripts/minesweeper.js" strategy="lazyOnload" />
            <Script src="scripts/bolts.js" strategy="lazyOnload" />
            <Script src="scripts/set-board-height.js" strategy="beforeInteractive" />
            <Script src="scripts/front-end-title-animation.js" strategy="afterInteractive" />
        </section>
    )
}