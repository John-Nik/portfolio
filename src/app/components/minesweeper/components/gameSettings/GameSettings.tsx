/* eslint-disable react/jsx-no-comment-textnodes */
export default function GameSettings() {
    const startingDifficultyValue = 2;
    const difficulties = [
        {
            label: 'Easy',
            value: 1,
        },
        {
            label: 'Normal',
            value: 2,
        },
        {
            label: 'Hard',
            value: 3,
        },
        {
            label: 'Challenging',
            value: 4,
        },
    ];

    return (
        <div
            data-game-settings
            className="w-full max-w-[510px] h-fit min-h-1/2 hidden justify-center items-center font-(family-name:--fira-code) opacity-0 calm lg:w-1/2 lg:h-full lg:flex lg:justify-end lg:opacity-1 flex-row"
        >
            <div className="relative flex flex-col bg-linear-to-br/oklch from-[rgba(4,101,149,0.7)] to-[rgba(4,84,149,0.13)] backdrop-blur-sm border border-[#0C1616] rounded-lg w-full h-full lg:min-h-[350px] lg:max-h-[475px]">
                <div
                    className="absolute flex w-full h-full pointer-events-none select-none"
                    aria-hidden="true"
                >
                    <img
                        src="/icons/bolt.svg"
                        className="top-2.5 left-2.5 absolute"
                        alt=""
                    />
                    <img
                        src="/icons/bolt.svg"
                        alt=""
                        className="bottom-2.5 left-2.5 absolute"
                    />
                    <img
                        src="/icons/bolt.svg"
                        alt=""
                        className="top-2.5 right-2.5 absolute"
                    />
                    <img
                        src="/icons/bolt.svg"
                        alt=""
                        className="right-2.5 bottom-2.5 absolute"
                    />
                </div>

                <div className="relative flex flex-col justify-between p-8 h-full">
                    <div>
                        <div className="relative flex items-center bg-[rgba(1,20,35,0.7)] py-12 rounded-lg w-full">
                            <span
                                data-instructions-span
                                className="px-5 lg:px-8 font-medium text-[clamp(12px,2.22vw,16px)] text-white lg:text-[clamp(12px,1.25vw,16px)]"
                            >
                                // Left click to dig square
                                <br />
                                // Right click to flag square
                            </span>
                        </div>

                        <div className="flex flex-row w-full">
                            <div className="@container flex flex-row flex-wrap justify-between mt-8 w-full text-white">
                                <span className="@3xs:px-5 pr-5 pl-3 w-full text-center @3xs:text-start">
                                    // Difficulty
                                </span>

                                <div className="flex @3xs:flex-row flex-col flex-wrap justify-center @3xs:justify-between items-center gap-y-4 my-2 w-full">
                                    {difficulties.map(({ label, value }, index) => (
                                        <button
                                            type="button"
                                            key={value}
                                            className="animate-fade-in w-1/2 flex opacity-0 cursor-pointer select-none @3xs:nth-2:justify-end @3xs:nth-4:justify-end justify-center @3xs:justify-start lg:justify-start xl:w-fit data-active:font-medium before:mr-2 after:ml-2 before:animate-blink after:animate-blink before:content-['>'] after:content-['<'] after:invisible data-[active=true]:after:visible data-[active=true]:before:visible before:invisible pointer-events-auto hover:text-white/80 calm-fast"
                                            data-active={value === startingDifficultyValue}
                                            style={{
                                                animationDelay: `${250 * index}ms`
                                            }}
                                            data-difficulty={value}
                                            data-difficulty-selector
                                        >
                                            {label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-center mt-6 pointer-events-auto">
                        <button
                            className="bg-[#83ADE2] hover:bg-[hsl(213,62%,60%)] opacity-0 rounded-full active:scale-95 animate-fade-in cursor-pointer calm-fast"
                            style={{
                                animationDelay: `${difficulties.length * 250}ms`
                            }}
                            data-start-game-button
                        >
                            <span className="font-(family-name:--press-start-font) block scale-y-180 origin-center px-5 py-3 text-black text-[0.5rem] tracking-[1px]">
                                start game
                            </span>
                        </button>

                        <div
                            data-end-game-status
                            className="mt-4 text-[0.875rem] text-white/50"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}