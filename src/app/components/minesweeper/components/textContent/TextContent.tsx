'use client';
import { useRef, useEffect } from 'react';
import DownloadCVButton from '../../../buttons/DownloadCVButton';
import Link from 'next/link';
import { sleep } from '../../../../../../public/scripts/minesweeper/helpers';

export default function TextContent() {
    const isWritingChars = useRef(false);
    const workTitleElem = useRef<HTMLHeadingElement | null>(null);

    const timeInterval = 70;
    const titles = ['a Front-End Devel', 'a Back-End Dev', 'a Full-Stack Developer'];

    useEffect(() => {
        startWritingChars();
    }, []);

    async function startWritingChars() {
        if (isWritingChars.current) return;
        if (!workTitleElem.current) {
            isWritingChars.current = false;
            return;
        };

        isWritingChars.current = true;

        for (const title of titles) {
            if (!isWritingChars.current) {
                return;
            }

            await typeOutCharsFor(title);

            await sleep(250);
            await handlePipeCharAnim(1);

            if (title !== titles.at(-1)) {
                await removeCharsFromTitle();
            }
        }

        await handlePipeCharAnim(3);

        // Due to the asynchronous nature of everything, we must verify this exists before setting a new value
        if (!workTitleElem.current) {
            isWritingChars.current = false;
            return;
        };

        // We must remove the pipe character from the final title displayed
        workTitleElem.current.textContent = workTitleElem.current.textContent.slice(0, -1);

        isWritingChars.current = false;
    }

    async function handlePipeCharAnim(blinkAmount: number) {
        const timeBetweenBlink = 500;

        for (let i = 0; i < blinkAmount; i++) {
            if (!workTitleElem.current) return;

            workTitleElem.current.textContent = workTitleElem.current.textContent.slice(0, -1);
            await sleep(timeBetweenBlink);

            if (!workTitleElem.current) return;

            workTitleElem.current.textContent += '|';
            await sleep(timeBetweenBlink);
        }
    }

    async function typeOutCharsFor(text: string) {
        if (!workTitleElem.current) return;

        for (let i = 0; i < text.length + 1; i++) { // It's text.length + 1 because the last character is the pipe char
            if (!isWritingChars.current) {
                resetWorkTitle();
                return;
            }

            if (!workTitleElem.current) return;

            const [textContent] = workTitleElem.current.textContent.split('|');
            workTitleElem.current.textContent = `${textContent}${text.charAt(i)}|`;

            await sleep(timeInterval);
        }
    }

    async function removeCharsFromTitle() {
        if (!workTitleElem.current) return;

        // The reason it's workTitleElem.current.textContent.length - 1 is because we count the pipe char
        while ((workTitleElem.current?.textContent.length ?? 0) - 1 > 0) {
            if (!isWritingChars.current) {
                resetWorkTitle();
                return;
            }

            if (!workTitleElem.current) return;

            const [textContent] = workTitleElem.current.textContent.split('|');

            workTitleElem.current.textContent = `${textContent.slice(0, -1)}|`;
            await sleep(timeInterval / 1.5);
        }
    }

    function resetWorkTitle() {
        if (!workTitleElem.current) return;
        workTitleElem.current.textContent = '';
    }

    return (
        <>
            <div className="flex flex-col justify-center items-center lg:items-start opacity-100 w-full lg:w-fit h-full overflow-hidden textContent calm">
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

                <div className="flex lg:flex-row flex-col items-center self-stretch gap-7 mt-8 h-fit">
                    <Link
                        href="/contact"
                        className="flex justify-center items-center bg-[#406ABF] hover:bg-[hsl(220,50%,30%)] shadow-none py-[clamp(8px,1.6vw,16px)]! border border-[#406ABF] border-2 hover:border-[hsl(220,50%,30%)] rounded-full w-full overflow-hidden text-[clamp(1.5rem,2vw,2rem)] text-white leading-tight scale-100 active:scale-95 cursor-pointer pointer-events-auto calm-fast"
                    >
                        Get in touch
                    </Link>

                    <DownloadCVButton />

                    <button className="lg:hidden bg-transparent shadow-subtle backdrop-blur-2xs backdrop-brightness-60 p-1 border-none rounded-full w-fit h-max font-[var(--fira-code)] font-medium text-[#83ADE2] text-2xl animate-blink-underline underline underline-offset-6 leading-none pointer-events-auto">
                        Start-Game
                    </button>
                </div>
            </div>
        </>
    );
}