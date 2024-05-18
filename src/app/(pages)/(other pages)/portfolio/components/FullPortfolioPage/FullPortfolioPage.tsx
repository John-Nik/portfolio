'use client';
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { ReactNode, useEffect, useRef } from "react";
import ProjectCard from "../ProjectCard/ProjectCard";
import './styling.scss';

export default function FullPortfolioPage({projects}): ReactNode {
    const router = useRouter();
    const pathname = usePathname()
    .split("/")
    .slice(2)[0]
    .toLowerCase();
    const titleTag = useRef(null);

    let dataToPull = projects.filter((project) => project.attributes.title.toLowerCase().includes(pathname))
    let projectAttributes = dataToPull[0].attributes;

    useEffect((): void => {
        const card: HTMLDivElement = document.querySelector('.item-container');

        card.addEventListener('mousemove', (mouse: MouseEvent): void => {
            const rect: DOMRect = card.getBoundingClientRect();
            const mouseOnCardPosX: number = mouse.clientX - rect.left;
            const mouseOnCardPosY: number = mouse.clientY - rect.top;

            setTimeout((): void => {
                card.style.setProperty('--mouse-x', `${mouseOnCardPosX}px`)
                card.style.setProperty('--mouse-y', `${mouseOnCardPosY}px`)
            }, 100)
        })



        titleTag.current.textContent = `Giannis N. | ${projectAttributes.name} Project`;
    }, [])

    function sendToPortfolioPage(): void {
        router.push('/portfolio');
    }

    return (
        <main>
            <section className={'full-page-project'}>
                <div className={'container full-page-card'}>
                    <div tabIndex={0} role="button" onKeyDown={(e) => {if (e.key === "Enter") { sendToPortfolioPage() }}} onClick={sendToPortfolioPage} className={'back-arrow'}>
                        <Image src="/icons/back-arrow.svg" width={40} height={40} alt="" priority={true} />
                    </div>
                    <ProjectCard project={dataToPull[0]} />
                    <div className={'text-wrapper'}>
                        <h1 className={'title'} ref={titleTag}>// {projectAttributes.name}</h1>
                        <div className={'body'} dangerouslySetInnerHTML={{__html: dataToPull[0].html}} />
                    </div>
                </div>
            </section>
        </main>
    )
}