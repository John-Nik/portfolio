'use client';
import { useEffect } from "react";
import ProjectCard from "../ProjectCard/ProjectCard";

export default function CardsGridContainer({projects}) {

    useEffect(() => {
        const cards = document.querySelectorAll('.item-container');

        cards.forEach((card) => {
            card.addEventListener('mousemove', (mouse) => {
                const rect = card.getBoundingClientRect();
                const mouseOnCardPosX = mouse.clientX - rect.left;
                const mouseOnCardPosY = mouse.clientY - rect.top;
                
                card.style.setProperty('--mouse-x', `${mouseOnCardPosX}px`)
                card.style.setProperty('--mouse-y', `${mouseOnCardPosY}px`)
            })
        })
    }, [])

    
    return (
        <>
            {
                projects.map((project, key) => {
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