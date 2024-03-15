import IntroductorySection from "./sections/IntroductorySection/IntroductorySection.jsx";
import DescriptionSection from "./sections/DescriptionSection/DescriptionSection.jsx";
import MinesweeperSection from "./sections/MinesweeperSection/MinesweeperSection.jsx";
import SkillsSection from "./sections/SkillsSection/SkillsSection.jsx";

export default function() {
    return (
        <>  
            <IntroductorySection />
            <DescriptionSection />
            <MinesweeperSection />
            <SkillsSection />
        </>
    )
}

export const metadata = {
    title: 'Giannis N. | About Me',
    alternates: {
        canonical: '/about'
    },
}