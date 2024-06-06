import IntroductorySection from "./sections/IntroductorySection/IntroductorySection";
import DescriptionSection from "./sections/DescriptionSection/DescriptionSection";
import MinesweeperSection from "./sections/MinesweeperSection/MinesweeperSection";
import './styling.scss';
import { ReactElement } from "react";
import { metadataType } from "../../../page";
import dynamic from "next/dynamic";

const SkillsSection = dynamic(() => import('./sections/SkillsSection/SkillsSection'));

export default function(): ReactElement {
    return (
        <main className="about-me-main">
            <IntroductorySection />
            <DescriptionSection />
            <MinesweeperSection />
            <SkillsSection />
        </main> 
    )
}

export const metadata: metadataType = {
    title: 'Giannis N. | About Me',
    alternates: {
        canonical: '/about'
    },
}