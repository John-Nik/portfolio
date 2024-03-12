import { ZCOOL_QingKe_HuangYou, Fira_Code, Press_Start_2P } from 'next/font/google';
import './global.scss';


const zcoolFont = ZCOOL_QingKe_HuangYou({subsets: ['latin'], weight: ['400'], display: 'swap'})
const firaCodeFont = Fira_Code({subsets: ['latin'], preload: true, variable: '--fira-code', display: 'swap'})
const pressStartFont = Press_Start_2P({subsets: ['latin'], weight: ['400'], preload: true, variable: '--press-start-font', display: 'swap'})


export default function heads({children}) {
    return (
        <html lang="en">
            <body className={`${zcoolFont.className} ${firaCodeFont.variable} ${pressStartFont.variable}`}>
                {children}
                
                <div className={'is-minesweeper-playing-in-homepage'} />
                <div className={'is-minesweeper-playing-in-about-page'} />
            </body>
        </html>
    )
}