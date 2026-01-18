/* eslint-disable react/jsx-no-comment-textnodes */
'use client';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { ReactNode, useEffect, useMemo } from 'react';
import ProjectCard from '../components/ProjectCard';
import { Project } from '../types/Project';
import Link from 'next/link';

interface Props {
    projects: Project[]
}

export default function FullPortfolioPage({ projects }: Props): ReactNode {
    const router = useRouter();
    const pathname = usePathname().toLowerCase();
    const selectedProject = useMemo(() => {
        const slug = pathname.split('/').filter(Boolean).pop();
        return projects.find(project => project.link.toLowerCase() === slug);
    }, [projects, pathname]);

    useEffect((): void => {
        if (!selectedProject || !selectedProject.isEnabled) {
            router.push('/portfolio');
            return;
        }

        const titleTag = document.querySelector<HTMLTitleElement>('title');

        if (!titleTag) {
            throw new Error('card or titleTag is missing. Are the searched-for containers mounted?');
        }

        titleTag.textContent = `Giannis N. | ${selectedProject.name} Project`;
    }, [router, selectedProject]);

    return (
        <main className="flex justify-center pt-8 xl:pt-20 w-full overflow-y-auto">
            <section className="flex justify-center px-4 w-full max-w-screen-2xl">
                <div className="flex xl:flex-row flex-col justify-center items-center xl:items-start gap-8 w-full h-fit">
                    <div className="top-0 left-0 xl:sticky flex xl:flex-row flex-col justify-center xl:gap-4 w-full max-w-screen-sm xl:max-w-screen h-fit grow">
                        <Link
                            href="/portfolio"
                            className="hidden xl:block"
                        >
                            <Image
                                className="relative opacity-60 hover:opacity-100 active:scale-90 calm-fast"
                                src="/icons/back-arrow.svg"
                                width={40}
                                height={40}
                                alt=""
                                priority={true}
                            />
                        </Link>

                        {
                            !!selectedProject && (
                                <ProjectCard
                                    project={selectedProject}
                                    hasHoverEffect={true}
                                    projectIndex={0}
                                    no-redirect-link="true"
                                />
                            )
                        }
                    </div>

                    <div className="flex flex-col gap-4 pb-12 w-full max-w-screen-sm xl:max-w-screen overflow-hidden grow">
                        <h1 className="text-left leading-tight page-title">
                            // {selectedProject?.name}
                        </h1>

                        <div className="flex flex-col w-full text-white">
                            <h2 className="font-(family-name:--fira-code) text-[clamp(12px,2.06vw,14px)] font-bold">
                                <em className="flex max-w-[60ch]">
                                    {selectedProject?.skills}
                                </em>
                            </h2>
                            <span className="text-[clamp(12px,2.06vw,14px)] font-light opacity-70 text-white font-(family-name:--fira-code)">
                                {selectedProject?.dateSpan}
                            </span>
                        </div>

                        {
                            !!selectedProject && (
                                <div
                                    className="mt-8 text-white font-(family-name:--fira-code) [&>ul]:list-disc! ml-5 text-wrap [&_li]:max-w-[60ch] opacity-90 font-light [&>ul]:gap-4 [&>ul]:flex [&>ul]:flex-col text-[clamp(16px,2.94vw,20px)]"
                                    dangerouslySetInnerHTML={{ __html: selectedProject.body }}
                                />
                            )
                        }
                    </div>
                </div>
            </section>
        </main>
    );
}
