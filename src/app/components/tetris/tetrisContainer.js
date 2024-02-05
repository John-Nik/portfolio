import Script from 'next/script'
import Content from './content.js'

export default function TetrisContainer() {
    return (
        <section id={'tetris-container'}>
            <Content />
            <div id={'game'}></div>
            <Script src="scripts/tetris.js" strategy="lazyOnload" />
        </section>
    )
}