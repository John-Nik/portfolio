/* eslint-disable react/jsx-no-comment-textnodes */
'use server';
import './styling.scss';
import CardsGridContainer from './components/CardsGridContainer/CardsGridContainer';
import { importProjects } from '../../../helpers/importProjects';

export default async function page() {
    const projects = await importProjects();

    return (
        <main>
            <section className="portfolio-page-section">
                <div className="container">
                    <h1 className="title">// Portfolio</h1>
                    <div className="cards-container">
                        <CardsGridContainer projects={projects} />
                    </div>
                </div>
            </section>
        </main> 
    );
}