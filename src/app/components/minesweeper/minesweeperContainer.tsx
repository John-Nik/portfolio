import Script from 'next/script'
import Content from './content'
import './styling.scss'
import { ReactElement } from 'react'

export default function MinesweeperContainer(): ReactElement {
    return (
        <section id={'minesweeper-container'}>
            <Content />
            <div id={'game'}></div>
            <Script src="scripts/minesweeper.js" strategy="lazyOnload" />
        </section>
    )
}