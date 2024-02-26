import './styling.scss'
import Script from 'next/script'
import './minesweeper.scss'

export default function MinesweeperSection() {
    return (
        <section id={'minesweeper-section'}>
            <Script src="scripts/Hyphenopoly_Loader.js" strategy="beforeInteractive"></Script>
            <Script id="hyphenate" strategy="lazyOnload">{
                `Hyphenopoly.config({
                    require: {
                        "en-us": "Supercalifragilisticexpialidocious"
                    },
                    setup: {
                        selectors: {
                            ".hyphenate": {}
                        }
                    }
                });`
            }</Script>
            
            <div className={'background-game'} />

            <div className={'text-content'}>
                <p lang="en-us" className={'hyphenate'}>I had found myself in a situation that pushed me to learn web development. <span className={'break-line'}></span>Without knowing, this experience ignited a passion within me for the whole process, from building simple HTML to learning complex algorithms, connecting backend with frontend, figuring how networks work and setting them up, all in the efforts of continually seeking <span className={'colored-text'}>more</span> knowledge, <span className={'colored-text'}>more</span> challenges, <span className={'colored-text'}>more</span> unknowns, leading to <span className={'colored-text'}>more proficiency</span> in the field.</p>
            </div>
            
            <Script src="scripts/minesweeper-aboutme.js" strategy="lazyOnload" />
            <Script src="scripts/handle-minesweeper-section-text-screen-resize.js" strategy="afterInteractive" />
        </section>
    )
}