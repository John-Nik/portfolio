'use client';
import './styling.scss';
import Image from 'next/image';
import { useCallback, useRef } from 'react';
import { Project } from '../../types/Project';
import { sleep } from '../../../../../../../public/scripts/debug/minesweeper/helpers';
import Link from 'next/link';
import WebsiteIcon from '../../../../../components/icons-components/WebsiteIcon';
import GithubIcon from '../../../../../components/icons-components/GithubIcon';

interface Props {
    projectIndex: number;
    project: Project;
    hasHoverEffect?: boolean;
    noRedirectLink?: boolean;
}

export default function ProjectCard({ project, projectIndex, hasHoverEffect, noRedirectLink }: Props) {
    const cardRef = useRef<HTMLDivElement>(null);
    const isEnabled = useRef(project.isEnabled);

    const isCardEnabled = useCallback(() => {
        return isEnabled.current ? '' : 'grayscale(50) brightness(0.75)';
    }, [isEnabled]);

    async function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
        if (!hasHoverEffect) return;

        const card = event.currentTarget;
        const rect = card.getBoundingClientRect();
        const mouseOnCardPosX = event.clientX - rect.left;
        const mouseOnCardPosY = event.clientY - rect.top;

        await sleep(100);

        card.style.setProperty('--mouse-y', `${mouseOnCardPosY}px`);
        card.style.setProperty('--mouse-x', `${mouseOnCardPosX}px`);
    }

    return (
        <div
            ref={cardRef}
            className="item-container"
            onMouseMove={handleMouseMove}
        >
            <Link
                tabIndex={0}
                href={`/portfolio/${project.link}`}
                className="card"
            >
                <Image 
                    className="w-[calc(100%-2px)] h-[calc(100%-2px)] background"
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
                    alt={`${project.title} Profile Picture`}
                />

                <h2>{project.title}</h2>

                <div className="icons-wrapper">
                    <WebsiteIcon link={project.siteLink} />
                    <GithubIcon link={project.githubLink} />
                </div>
            </Link>
        </div>
    );
}