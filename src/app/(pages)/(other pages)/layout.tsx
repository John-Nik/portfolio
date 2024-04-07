import Header from '../../components/header/Header';
import Footer from '../../components/footer/footer';
import { ReactElement, ReactNode } from 'react';
import { metadataType } from '../../page';

export default function({children}: {children: ReactNode}): ReactElement {
    return (
        <>
            <Header />

            {children}

            <Footer />
        </>
    )
}


export const metadata: metadataType = {
    title: 'Giannis N. | Portfolio',
    alternates: {
        canonical: '/portfolio'
    },
}