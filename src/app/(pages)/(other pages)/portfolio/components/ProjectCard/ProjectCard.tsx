'use client';
import './styling.scss';
import GithubIcon from '../../../../../components/icons-components/GithubIcon';
import WebsiteIcon from '../../../../../components/icons-components/WebsiteIcon';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ReactNode, useCallback, useRef } from 'react';
import { Project } from '../../types/Project';
import { sleep } from '../../../../../../../public/scripts/debug/minesweeper/helpers';
import Link from 'next/link';

interface Props {
    children?: ReactNode;
    projectIndex: number;
    project: Project;
    hasHoverEffect?: boolean;
}

export default function ProjectCard({ project, children, projectIndex, hasHoverEffect }: Props) {
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

        card.style.setProperty('--mouse-x', `${mouseOnCardPosX}px`);
        card.style.setProperty('--mouse-y', `${mouseOnCardPosY}px`);
    }

    return (
        <div
            ref={cardRef}
            className="item-container"
            onMouseMove={handleMouseMove}
        >
            {children}

            <Link 
                tabIndex={0}
                href={isEnabled.current ? `/portfolio/${project.link}` : ''}
                aria-disabled={!isEnabled.current}
                className="card"
            >
                <Image 
                    className="background"
                    src={`/${project.img}`}
                    width={376}
                    height={376}
                    priority={projectIndex <= 3 ? true : false}
                    quality={100}
                    sizes="200vw"
                    style={{
                        width: 'calc(100% - 2px)', 
                        height: 'calc(100% - 2px)',
                        filter: isCardEnabled(),
                        color: `#${project.backgroundColor}`
                    }}
                    alt={`${project.title} Profile Picture`}
                />

                <h2>{project.title}</h2>

                <div className="icons-wrapper">
                    {isEnabled.current ? 
                        <>
                            <WebsiteIcon link={project.siteLink} />
                            <GithubIcon link={project.githubLink} />
                        </> 
                        : 
                        <span
                            style={{
                                fontSize: '2.25rem',
                                color: 'white',
                                backdropFilter: 'blur(5px) brightness(0.5)',
                                borderRadius: '5px',
                                padding: '4px 0.5ch 0px 0.5ch'
                            }}
                        >
                            In Dev
                        </span>
                    }
                </div>
            </Link>
        </div>
    );
}