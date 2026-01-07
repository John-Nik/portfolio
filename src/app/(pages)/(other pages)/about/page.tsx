import IntroductorySection from './sections/IntroductorySection';
import DescriptionSection from './sections/DescriptionSection';
import MinesweeperSection from './sections/MinesweeperSection/MinesweeperSection';
import { metadataType } from '../../../page';
import dynamic from 'next/dynamic';

const SkillsSection = dynamic(() => import('./sections/SkillsSection/SkillsSection'));

export default function page() {
    return (
        <main className="grid grid-cols-1 pt-20 w-full overflow-x-hidden overflow-y-auto">
            <IntroductorySection />
            <DescriptionSection />
            <MinesweeperSection />
            <SkillsSection />
        </main> 
    );
}

export const metadata: metadataType = {
    title: 'Giannis N. | About Me',
    alternates: {
        canonical: '/about'
    },
};