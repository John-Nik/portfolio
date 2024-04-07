'use client';
import { ReactElement, ReactNode, useEffect } from "react";
import ProjectCard from "../ProjectCard/ProjectCard";

export default function CardsGridContainer({projects}: {projects: ReactNode[]}): ReactElement {

    useEffect((): void => {
        const cards: HTMLElement[] = Array.from(document.querySelectorAll('.item-container'));

        cards.forEach((card: HTMLElement): void => {
            card.addEventListener('mousemove', (mouse) => {
                const rect: DOMRect = card.getBoundingClientRect();
                const mouseOnCardPosX: number = mouse.clientX - rect.left;
                const mouseOnCardPosY: number = mouse.clientY - rect.top;

                setTimeout((): void => {
                    card.style.setProperty('--mouse-x', `${mouseOnCardPosX}px`)
                    card.style.setProperty('--mouse-y', `${mouseOnCardPosY}px`)
                }, 100)
            })
        })
    }, [])

    
    return (
        <>
            {
                projects.map((project, key: number): ReactElement => {
                    return (
                        <ProjectCard key={key} project={project}>
                            <div className={'card-border'} />
                        </ProjectCard>
                        )
                })
            }
        </>
    )
}