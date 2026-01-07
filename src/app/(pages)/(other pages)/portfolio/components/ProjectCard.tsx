'use client';
import Image from 'next/image';
import { useCallback, useRef } from 'react';
import { Project } from '../types/Project';
import Link from 'next/link';
import WebsiteIconLink from '../../../../components/icons-components/WebsiteIconLink';
import GithubIconLink from '../../../../components/icons-components/GithubIconLink';

interface Props {
    projectIndex: number;
    project: Project;
    hasHoverEffect?: boolean;
}

export default function ProjectCard({ project, projectIndex, hasHoverEffect }: Props) {
    const cardRef = useRef<HTMLDivElement>(null);
    const isEnabled = useRef(project.isEnabled);

    const isCardEnabled = useCallback(() => {
        return isEnabled.current ? '' : 'grayscale(50) brightness(0.75)';
    }, [isEnabled]);

    function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
        if (!hasHoverEffect) return;

        const card = event.currentTarget;
        const rect = card.getBoundingClientRect();
        const mouseOnCardPosX = event.clientX - rect.left;
        const mouseOnCardPosY = event.clientY - rect.top;

        card.style.setProperty('--mouse-y', `${mouseOnCardPosY}px`);
        card.style.setProperty('--mouse-x', `${mouseOnCardPosX}px`);
    }

    return (
        <div
            ref={cardRef}
            className="group relative flex flex-col justify-center shadow-[0px_6px_4px_0px_rgba(0,0,0,0.6)] border border-2 border-black/50 rounded-4xl w-full aspect-5/4 overflow-hidden hover:-translate-y-2 calm-super-slow"
            onMouseMove={handleMouseMove}
        >
            <div className="before:top-0 before:left-0 before:z-2 absolute before:absolute flex justify-center items-center before:bg-[radial-gradient(800px_circle_at_var(--mouse-x)_var(--mouse-y),_rgba(255,255,255,0.15),_transparent_40%)] before:opacity-0 group-hover:before:opacity-100 border border-2 border-black/50 w-full before:w-full h-full before:h-full before:content-[''] before:transform-gpu before:transition-opacity before:pointer-events-none before:calm-super-slow">
                <Link
                    className="w-full h-full"
                    tabIndex={0}
                    href={`/portfolio/${project.link}`}
                >
                    <Image 
                        className="z-0 absolute brightness-100 group-hover:brightness-75 rounded-4xl w-full h-full calm-super-slow"
                        src={`/${project.img}`}
                        width={376}
                        height={376}
                        priority={projectIndex <= 3 ? true : false}
                        quality={100}
                        sizes="200vw"
                        style={{
                            filter: isCardEnabled(),
                            color: `#${project.backgroundColor}`
                        }}
                        alt={`${project.title} Picture`}
                    />
                </Link>

                <div className="bottom-4 absolute flex justify-between px-7 w-full h-fit">
                    <WebsiteIconLink
                        className="scale-120"
                        link={project.siteLink}
                    />
                    <GithubIconLink
                        className="scale-120"
                        link={project.githubLink}
                    />
                </div>
            </div>
        </div>
    );
}