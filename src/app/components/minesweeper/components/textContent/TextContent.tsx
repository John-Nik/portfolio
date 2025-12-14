'use client';
import { useRef, useEffect } from 'react';
import DownloadCVButton from '../../../buttons/DownloadCVButton';
import Link from 'next/link';
import { sleep } from '../../../../../../public/scripts/minesweeper/helpers';

export default function TextContent() {
    const isWritingChars = useRef(false);
    const workTitleElem = useRef<HTMLHeadingElement | null>(null);
    const pipeCharElem = useRef<HTMLSpanElement | null>(null);

    const timeInterval = 70;
    const titles = ['a Front-End Devel', 'a Back-End Dev', 'a Full-Stack Developer'];

    useEffect(() => {
        startWritingChars();
    }, []);

    async function startWritingChars() {
        if (isWritingChars.current) return;
        if (!workTitleElem.current || !pipeCharElem.current) return;

        isWritingChars.current = true;
        pipeCharElem.current.style.animationPlayState = 'paused';

        for (const title of titles) {
            if (!isWritingChars.current) {
                resetWorkTitle();
                return;
            }

            await typeOutCharsFor(title);

            handlePipeCharAnim('run');
            await sleep(1000);
            handlePipeCharAnim('pause');

            if (title !== titles.at(-1)) {
                await removeCharsFromTitle();
            }
        }

        handlePipeCharAnim('run');
        await sleep(2500);
        handlePipeCharAnim('pause');

        isWritingChars.current = false;
    }

    function handlePipeCharAnim(status: 'run' | 'pause') {
        if (!pipeCharElem.current) return;

        if (status === 'run') {
            pipeCharElem.current.style.animationPlayState = 'running';
            return;
        }

        pipeCharElem.current.style.animationPlayState = 'paused';
    }

    async function typeOutCharsFor(text: string) {
        if (!workTitleElem.current) return;

        for (let i = 0; i < text.length; i++) {
            if (!isWritingChars.current) {
                resetWorkTitle();
                return;
            }

            if (!workTitleElem.current) return;

            workTitleElem.current.textContent += text.charAt(i);
            await sleep(timeInterval);
        }
    }

    async function removeCharsFromTitle() {
        if (!workTitleElem.current) return;

        while ((workTitleElem.current?.textContent.length ?? 0) > 0) {
            if (!isWritingChars.current) {
                resetWorkTitle();
                return;
            }

            if (!workTitleElem.current) return;

            workTitleElem.current.textContent = workTitleElem.current.textContent.slice(0, -1);
            await sleep(timeInterval / 1.5);
        }
    }

    function resetWorkTitle() {
        if (!workTitleElem.current) return;
        workTitleElem.current.textContent = '';
    }

    return (
        <>
            <div className="textContent">
                <span className="topper">Hello, my name is</span>
                <h1 className="title">Giannis Nikolaou</h1>
                <span className="work-wrapper">
                    <h2
                        className="work"
                        ref={workTitleElem}
                    />
                    <span
                        ref={pipeCharElem}
                        className="work-pipe"
                    >
                        |
                    </span>
                </span>

                <div className="buttons-container">
                    <Link
                        href="/contact"
                        className="get-in-touch-button"
                    >
                        <div className="GIT-wrapper">
                            <span>Get in touch</span>
                        </div>
                    </Link>

                    <DownloadCVButton />

                    <button className="show-settings-panel-button">
                        Start-Game
                    </button>
                </div>
            </div>
        </>
    );
}