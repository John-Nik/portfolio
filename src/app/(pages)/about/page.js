import IntroductorySection from "./sections/IntroductorySection/IntroductorySection.js";
import DescriptionSection from "./sections/DescriptionSection/DescriptionSection.js";
import MinesweeperSection from "./sections/MinesweeperSection/MinesweeperSection.js";

export default function() {
    return (
        <>
            <IntroductorySection />
            <DescriptionSection />
            <MinesweeperSection />
        </>
    )
}