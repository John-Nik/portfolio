import Header from '../../components/header/Header';
import Footer from '../../components/footer/footer';
import { ReactNode } from 'react';
import { metadataType } from '../../page';

export default function layout({ children }: { children: ReactNode }) {
    return (
        <>
            <Header />

            { children }

            <Footer />
        </>
    );
}


export const metadata: metadataType = {
    title: 'Giannis N. | Portfolio',
    alternates: {
        canonical: '/portfolio'
    },
};