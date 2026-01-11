'use client';
import { useRef, useEffect } from 'react';
import DownloadCVButton from '../../DownloadCVButton';
import Link from 'next/link';
import { sleep } from '../../../../../public/scripts/minesweeper/helpers';
import createTypewriter from '../../../helpers/createTypewriter';

interface StartStopTyping<T extends HTMLElement> {
    startTyping: ReturnType<typeof createTypewriter<T>>['startTyping'] | null;
    stopTyping: ReturnType<typeof createTypewriter<T>>['stopTyping'] | null
}

export default function TextContent() {
    const titleBeingTypedIndex = useRef(0);
    const workTitleElem = useRef<HTMLHeadingElement | null>(null);
    const workTitleTypewriter = useRef<StartStopTyping<NonNullable<typeof workTitleElem['current']>>>({
        startTyping: null,
        stopTyping: null,
    });

    const titles = [
        'a Front-End Devel',
        'a Back-End Dev',
        'a Full-Stack Developer'
    ];

    useEffect(() => {
        workTitleTypewriter.current = createTypewriter(workTitleElem.current, undefined, {
            charsPerSec: 20
        });
        titleBeingTypedIndex.current = 0;

        startTypingTitles();

        return () => {
            workTitleTypewriter.current.stopTyping?.();
        };
    }, []);

    function startTypingTitles(mode: 'appendChars' | 'removeChars' = 'appendChars') {
        workTitleTypewriter.current.startTyping?.(titles[titleBeingTypedIndex.current], {
            mode,
            onFinish: async(elem) => {
                if (mode === 'appendChars') {
                    titleBeingTypedIndex.current++;
                }

                if (titleBeingTypedIndex.current === titles.length) {
                    await sleep(50);
                    await blinkPipe(5);
                    removePipe(elem);
                    return;
                };

                await sleep(50);

                if (mode === 'appendChars') {
                    await blinkPipe(1);
                }

                startTypingTitles(mode === 'appendChars' ? 'removeChars' : 'appendChars');
            },
            onBeforeEveryChar: removePipe,
            onAfterEveryChar: appendPipe
        });
    }

    function removePipe<T extends HTMLElement>(elem: T) {
        elem.textContent = elem.textContent.slice(0, -1);
    }

    function appendPipe<T extends HTMLElement>(elem: T) {
        elem.textContent += '|';
    }

    async function blinkPipe(blinkAmount: number) {
        const timeBetweenBlink = 400;

        for (let i = 0; i < blinkAmount; i++) {
            if (!workTitleElem.current) return;

            removePipe(workTitleElem.current);
            await sleep(timeBetweenBlink);

            if (!workTitleElem.current) return;

            appendPipe(workTitleElem.current);
            await sleep(timeBetweenBlink);
        }
    }

    return (
        <>
            <div
                className="flex flex-col justify-center items-center lg:items-start opacity-100 w-fit h-full overflow-hidden calm"
                data-hero-text-container
            >
                <span className="text-shadow-heading backdrop-blur-2xs brightness-65 p-1 rounded-full w-fit h-fit text-white text-2xl leading-none">
                    Hello, my name is
                </span>
                <h1 className="text-shadow-heading backdrop-blur-2xs rounded-2xl font-normal text-[clamp(4rem,7.5vw,6.75rem)] text-white text-center leading-tight">
                    Giannis Nikolaou
                </h1>
                <h2
                    className="backdrop-blur-2xs before:pr-2 rounded-3xl font-normal text-[#6ABAFB] text-[clamp(2.375rem,5vw,4rem)] text-center lg:text-start text-wrap before:content-['>'] leading-tight"
                    ref={workTitleElem}
                />

                <div className="flex lg:flex-row flex-col items-center self-stretch gap-7 mt-12 lg:mt-8 h-fit">
                    <Link
                        href="/contact"
                        className="flex justify-center items-center bg-[#406ABF] hover:bg-[hsl(220,50%,30%)] shadow-none py-[clamp(8px,1.6vw,16px)]! border border-[#406ABF] border-2 hover:border-[hsl(220,50%,30%)] rounded-full w-full overflow-hidden text-[clamp(1.5rem,2vw,2rem)] text-white leading-tight scale-100 active:scale-95 cursor-pointer pointer-events-auto calm-fast"
                    >
                        Get in touch
                    </Link>

                    <DownloadCVButton />

                    <button
                        className="lg:hidden bg-transparent shadow-subtle backdrop-blur-2xs backdrop-brightness-60 p-1 border-none rounded-full w-fit h-max font-[var(--fira-code)] font-medium text-[#83ADE2] text-2xl animate-blink-underline underline underline-offset-6 leading-none cursor-pointer pointer-events-auto"
                        data-show-game-settings-button
                    >
                        Start-Game
                    </button>
                </div>
            </div>
        </>
    );
}