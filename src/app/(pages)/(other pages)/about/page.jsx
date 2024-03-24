import IntroductorySection from "./sections/IntroductorySection/IntroductorySection.jsx";
import DescriptionSection from "./sections/DescriptionSection/DescriptionSection.jsx";
import MinesweeperSection from "./sections/MinesweeperSection/MinesweeperSection.jsx";
import SkillsSection from "./sections/SkillsSection/SkillsSection.jsx";
import './styling.scss';

export default function() {
    return (
        <main className="about-me-main">
            <IntroductorySection />
            <DescriptionSection />
            <MinesweeperSection />
            <SkillsSection />
        </main> 
    )
}

export const metadata = {
    title: 'Giannis N. | About Me',
    alternates: {
        canonical: '/about'
    },
}