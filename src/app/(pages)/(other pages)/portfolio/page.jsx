'use server'
import './styling.scss';
import CardsGridContainer from './components/CardsGridContainer/CardsGridContainer';

export default async function({}) {
    const content = require.context('../../../content', true);
    let projects = content.keys().map((filename) => content(filename));

    return (
        <main>
            <section className={'portfolio-page-section'}>
                <div className={'container'}>
                    <h1 className={'title'}>// Portfolio</h1>
                    <div className={'cards-container'}>
                        <CardsGridContainer projects={projects} />
                    </div>
                </div>
            </section>
        </main> 
    )
}