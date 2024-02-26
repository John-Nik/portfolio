import IntroductorySection from "./sections/IntroductorySection/IntroductorySection.js";
import DescriptionSection from "./sections/DescriptionSection/DescriptionSection.js";
import MinesweeperSection from "./sections/MinesweeperSection/MinesweeperSection.js";
import SkillsSection from "./sections/SkillsSection/SkillsSection.js";

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