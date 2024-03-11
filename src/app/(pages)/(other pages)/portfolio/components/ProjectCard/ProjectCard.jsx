'use client'
import './styling.scss';
import GithubIcon from '@/app/components/icons-components/GithubIcon';
import WebsiteIcon from '@/app/components/icons-components/WebsiteIcon';
import { useRouter } from "next/navigation";

export default function ProjectCard({project}) {
    const router = useRouter();
    console.log(project)

    return (
        <div className={"item-container"}>
            <div onClickCapture={(e) => {e.stopPropagation; console.log(router); router.push(`/portfolio/${project.attributes.title}`, project.attributes.title)}} className={'card'}>
                <img className={'background'} src={`/${project.attributes.img}`} />
                <h2>{project.attributes.title}</h2>
            </div>
            <div className={'icons-wrapper'}>
                <WebsiteIcon link={project.attributes.siteLink} />
                <GithubIcon link={project.attributes.githubLink} className={'github-icon'} />
            </div>
        </div>
    )
}