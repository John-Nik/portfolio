 
'use client';
import { useInView } from 'react-intersection-observer';
import dynamic from 'next/dynamic';
import useBringToView from '../../composables/useBringToView';

const Canvas = dynamic(() => import('./Canvas'));

export default function MinesweeperSection() {
    const { ref } = useBringToView();

    const [canvasRef, inView] = useInView({
        threshold: 0.3,
        triggerOnce: true
    }); 

    return (
        <section
            className="z-0 relative flex justify-center items-start mb-20 w-full h-[80dvh] min-h-[600px] max-h-[800px]"
            ref={canvasRef}
        >
            {inView && <Canvas />}

            <div className="relative flex justify-center items-center px-4 w-full max-w-screen-xl h-full">
                <p
                    ref={ref}
                    lang="en-us"
                    data-show="false"
                    className="opacity-0 data-[show=true]:opacity-100 text-[clamp(1.25rem,2vw,1.75rem)] text-white text-justify data-[show=true]:translate-y-0 hyphenate calm-super-slow font-(family-name:--fira-code)"
                >
                    I had found myself in a situation that pushed me to learn web development. Without knowing, this experience ignited a passion within me for the whole process, from building simple HTML to learning complex algorithms, connecting backend with frontend, figuring how networks work and setting them up, all in the efforts of continually seeking <span className="text-secondary-tint-1">more</span> knowledge, <span className="text-secondary-tint-1">more</span> challenges, <span className="text-secondary-tint-1">more</span> unknowns, leading to <span className="text-secondary-tint-1">more proficiency</span> in the field.
                </p>
            </div>
        </section>
    );
}