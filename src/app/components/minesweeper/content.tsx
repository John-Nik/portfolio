/* eslint-disable react/jsx-no-comment-textnodes */
import GameSettings from './components/GameSettings';
import TextContent from './components/TextContent';

export default function Content() {
    return (
        <>
            <div
                data-bombs-placed-container
                className="top-0 left-0 z-10000 fixed flex flex-col opacity-0 w-screen h-screen delay-500 pointer-events-none select-none calm-super-slow"
            >
                <div
                    data-bombs-placed-wrapper
                    className="top-1/2 left-1/2 relative flex flex-col gap-1 w-fit text-white text-5xl tracking-[2px] -translate-x-1/2 -translate-y-1/2 duration-1200 ease-calm delay-500"
                >
                    <span className="leading-none">
                        // Bombs Placed
                    </span>
                    <span
                        data-bombs-placed-text
                        className="leading-none"
                    >
                        // 465
                    </span>
                </div>
            </div>

            <div className="z-10 absolute flex justify-center items-center w-full h-full pointer-events-none select-none">
                <div className="relative flex flex-row justify-center lg:justify-between items-center px-4 w-full max-w-[1480px] h-full calm-slow">
                    <TextContent />

                    <GameSettings />
                </div>
            </div>
        </>
    );
}