'use client'
import GithubIcon from '@/app/components/icons-components/GithubIcon';
import WebsiteIcon from '@/app/components/icons-components/WebsiteIcon';
import { useRouter } from "next/navigation"

export default function ProjectCard({project}) {
    const router = useRouter();
    
    return (
        <div onClick={() => router.push(`/portfolio/${project.slug}`)} className={"item-container"}>
            <img className={'background'} src={`${project.attributes.img}`} />
            <h2>{project.attributes.title}</h2>
            <div className={'icons-wrapper'}>
                <WebsiteIcon link={project.attributes.siteLink} />
                <GithubIcon link={project.attributes.githubLink} className={'github-icon'} />
            </div>
        </div>
    )
}