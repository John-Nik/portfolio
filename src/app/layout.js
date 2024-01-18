import { children } from "react"

import { ZCOOL_QingKe_HuangYou } from 'next/font/google'
import './global.scss'

const zcoolFont = ZCOOL_QingKe_HuangYou({subsets: ['latin'], weight: ['400']})

export default function heads({children}) {

    return (
        <html lang="en">
            <head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </head>

            <body>
                <header>
                    <nav>

                    </nav>
                </header>
                {children}
            </body>
        </html>
    )
}