import { ReactElement } from 'react';
import Image from 'next/image';
import WebsiteIconLink from '../../../../components/icons-components/WebsiteIconLink';
import GithubIconLink from '../../../../components/icons-components/GithubIconLink';
import { Project } from '../types/Project';
import Link from 'next/link';

export default function CardsGridContainer({ projects}: { projects: Project[] }): ReactElement {

    return (
        <>
            {/* <div className="flex flex-col justify-center w-full h-full">
                <Link
                    className="flex rounded-4xl w-full h-full overflow-hidden"
                    href="/portfolio/globe-perf"
                >
                    <Image
                        ref={globePerfImage}
                        className="w-full h-full object-fill"
                        src="/images/globe-perf.webp"
                        width={310}
                        height={224}
                        priority={true}
                        quality={100}
                        sizes="50vw"
                        id="globe-perf"
                        style={{
                            width: 'calc(100% - 2px)',
                            height: 'calc(100% - 2px)',
                            opacity: '0.8',
                            filter: 'brightness(0.8)',
                            objectFit: 'cover',
                        }}
                        alt="Globe-Perf preview picture"
                        onMouseEnter={() => adjustGlobeBrightness('normal')}
                        onMouseLeave={() => adjustGlobeBrightness('dim')}
                    />
                </Link>

                <div className="relative flex justify-between px-4">
                    <Link
                        href="/portfolio/globe-perf"
                        className="text-white font-medium font-(family-name:--fira-code rounded-) text-[clamp(24px,6.36vw,28px)]"
                    >
                        Globe-Perf
                    </Link>

                    <div className="flex justify-end items-center gap-4 w-fit w-max h-fit overflow-visible">
                        <WebsiteIconLink link="no-link" />
                        <GithubIconLink link="https://www.github.com/John-Nik/Globe-perf" />
                    </div>
                </div>
            </div> */}

            {
                projects.map((project, index): ReactElement => {
                    return (
                        <div
                            className="flex flex-col justify-center w-full h-full"
                            key={index}
                        >
                            <Link
                                className="flex hover:brightness-80 rounded-4xl w-full h-full overflow-hidden calm-fast"
                                href={project.isEnabled ? `/portfolio/${project.link}` : ''}
                            >
                                <Image
                                    className="w-full h-full object-fill"
                                    src={`/${project.img}`}
                                    width={310}
                                    height={224}
                                    priority={index <= 2 ? true : false}
                                    quality={100}
                                    sizes="50vw"
                                    style={{
                                        backgroundColor: `#${project.backgroundColor}`,
                                        filter: !project.isEnabled ? 'brightness(0.5) saturate(0.5)' : '',
                                        cursor: !project.isEnabled ? 'default' : ''
                                    }}
                                    alt={`${project.title} Profile Picture`}
                                />
                            </Link>

                            <div className="relative flex justify-between px-4">
                                <Link
                                    className="text-white font-medium font-(family-name:--fira-code rounded-) text-[clamp(24px,6.36vw,28px)] hover:brightness-60 calm-fast"
                                    href={project.isEnabled ? `/portfolio/${project.link}` : ''}
                                >
                                    { project.title }
                                </Link>

                                { project.isEnabled
                                    ?  <div className="flex justify-end items-center gap-4 w-fit w-max h-fit overflow-visible">
                                        <WebsiteIconLink link={project.siteLink} />
                                        <GithubIconLink link={project.githubLink} />
                                    </div>
                                    : <span>In Dev</span>
                                }
                            </div>
                        </div>
                    );
                })
            }
        </>
    );
}