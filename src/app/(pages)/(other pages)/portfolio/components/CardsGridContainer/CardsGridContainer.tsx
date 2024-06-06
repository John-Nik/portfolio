'use client';
import { ReactElement, ReactNode, useEffect } from "react";
import ProjectCard from "../ProjectCard/ProjectCard";
import Image from "next/image";
import { useRouter } from "next/navigation";
import WebsiteIcon from "../../../../../components/icons-components/WebsiteIcon";
import GithubIcon from "../../../../../components/icons-components/GithubIcon";

export default function CardsGridContainer({projects}: {projects: ReactNode[]}): ReactElement {
    const router = useRouter();

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
            <div className="item-container">
                <div className={'card-border'} />
                <div 
                    tabIndex={0}
                    role="button"
                    onKeyDown={(e) => {
                        router.push('/portfolio/globe-perf');
                    }}
                    onClickCapture={(e) => {
                        e.stopPropagation;
                        router.push('/portfolio/globe-perf');
                    }}
                    className={'card'}
                >
                    <Image 
                        className={'background'}
                        src={'/images/globe-perf.webp'}
                        width={376}
                        height={376}
                        priority={false}
                        quality={100}
                        sizes="50vw"
                        style={{
                            width: 'calc(100% - 2px)', 
                            height: 'calc(100% - 2px)',
                            filter: ''
                        }}
                        alt={`Globe-Perf preview picture`}
                    />
                    <h2>Globe-Perf</h2>
                </div>
                <div className={'icons-wrapper'}>
                    <>
                        <WebsiteIcon link={'no-link'} />
                        <GithubIcon link={'https://www.github.com/John-Nik/Globe-perf'} />
                    </> 
                </div>
            </div>
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