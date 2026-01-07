/* eslint-disable react/jsx-no-comment-textnodes */
'use server';
import CardsGridContainer from './components/CardsGridContainer';
import { importProjects } from '../../../helpers/importProjects';

export default async function page() {
    const projects = await importProjects();

    return (
        <main className="mt-20 overflow-y-auto">
            <section className="flex justify-center items-center w-full">
                <div className="flex flex-col gap-28 px-4 w-full max-w-screen-2xl">
                    <h1 className="text-[clamp(3.125rem,6vw,4rem)] text-tint-2 text-center">
                        // Portfolio
                    </h1>

                    <div className="justify-center gap-x-12 gap-y-16 grid grid-cols-[minmax(100px,380px)] md:grid-cols-[repeat(2,minmax(100px,380px))] xl:grid-cols-[repeat(3,minmax(100px,380px))] w-full">
                        <CardsGridContainer projects={projects} />
                    </div>
                </div>
            </section>
        </main> 
    );
}