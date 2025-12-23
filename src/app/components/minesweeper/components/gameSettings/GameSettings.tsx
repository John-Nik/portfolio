/* eslint-disable react/jsx-no-comment-textnodes */
'use client';
import { useRef } from 'react';
import { useInView } from 'react-intersection-observer';

export default function GameSettings() {
    const startGameButton = useRef(null);
    const gameControlPanel = useRef(null);

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

    const [difficultiesWrapper] = useInView({
        triggerOnce: true,
        onChange: (inView, intersectionObserverObject) => {
            if (!inView) return;

            // SetTimeout(() => {
            //     IntersectionObserverObject.target.childNodes.forEach((child: HTMLSpanElement) => {
            //         Child.classList.add('show');
            //     });
    
            //     StartGameButton.current.classList.add('show');
            // }, 100);
        }
    });


    return (
        <>
            <div
                className="gameSettings"
                ref={gameControlPanel}
            >
                <div className="wrapper game-settings-container">
                    <div
                        className="bolt-container"
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

                    <div className="game-settings-wrapper">
                        <div className="game-instructions">
                            <span className="game-instructions-span">
                                // Left click to dig square
                                <br />
                                // Right click to flag square
                            </span>
                        </div>

                        <div className="settings">
                            <div className="difficulty-wrapper">
                                <span className="difficulty //">// Difficulty</span>

                                <div
                                    className="difficulty-options-wrapper"
                                    ref={difficultiesWrapper}
                                >
                                    {difficulties.map(({ label, value }, index) => (
                                        <span
                                            key={value}
                                            className={`animate-fade-in w-1/2 flex cursor-pointer select-none nth-2:justify-end nth-4:justify-end lg:justify-start xl:w-fit data-active:font-medium before:mr-2 after:ml-2 before:animate-blink after:animate-blink before:content-[''] after:content-[''] data-active:after:content-['<'] data-active:before:content-['>'] ${value === 2 && 'active'}`}
                                            data-active={value === 2}
                                            style={{
                                                animationDelay: `${250 * index}ms`
                                            }}
                                            data-difficulty={value}
                                        >
                                            {label}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col items-center pointer-events-auto">
                            <button
                                ref={startGameButton}
                                className="bg-[#83ADE2] hover:bg-[hsl(213,62%,60%)] rounded-full active:scale-95 animate-fade-in cursor-pointer calm-fast"
                                style={{
                                    animationDelay: `${difficulties.length * 250}ms`
                                }}
                                data-start-game-button
                            >
                                <span className="font-(family-name:--press-start-font) block scale-y-180 origin-center px-5 py-3 text-black text-[0.5rem] tracking-[1px]">
                                    start game
                                </span>
                            </button>

                            <div className="mt-4 text-[0.875rem] text-white/50" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}