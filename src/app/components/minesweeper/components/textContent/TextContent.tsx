'use client';
import { ReactElement, useRef, useEffect } from "react";
import DownloadCVButton from "../../../buttons/DownloadCVButton";
import Link from "next/link";
import { sleep } from "../../../../../../public/scripts/minesweeper/helpers";
import { is } from "@react-three/fiber/dist/declarations/src/core/utils";
import { time } from "console";

export default function TextContent(): ReactElement {
    const isWritingChars = useRef<boolean>(false);
    const workTitle = useRef(null);
    const timeInterval = 70;
    const titles = [' a Front-End Devel', ' a Back-End Dev', ' a Full-Stack Developer'];

    async function startWritingChars() {
        isWritingChars.current = true;
        let timeout: NodeJS.Timeout | null = null;

        for (let i = 0; i < titles.length; i++) {
            if (!isWritingChars.current) return; // this is used to stop the writing of characters. See implementation in useEffect

            const title = titles[i];
            let string = '';

            while (string.length < title.length) {
                const index = string.length;
                
                string += title[index];
                workTitle.current.textContent = string + '|';

                await sleep(timeInterval);
            }

            await sleep(500);
            workTitle.current.textContent = string; // remove the last character (the pipe)
            await sleep(500);

            // if this is the last title, we stop reversing the string, and start blinking the pipe
            if (i === titles.length - 1) {
                workTitle.current.textContent = string + '|'; // add the pipe again

                let shouldAddPipe = 0;

                timeout = setInterval(async () => {
                    workTitle.current.textContent = !!shouldAddPipe ? string + '|' : string;
                    shouldAddPipe = (shouldAddPipe + 1) % 2; // toggle between 0 and 1
                }, 500);

                await sleep(2500);
                clearInterval(timeout);
                timeout = null;
                return;
            }

            while (string !== '') {
                string = string.slice(0, -1);
                workTitle.current.textContent = string + '|';

                await sleep(timeInterval);
            }
        }

        isWritingChars.current = false;
    }

    useEffect(() => {
        const homepageMinesweeper = document.querySelector('.is-minesweeper-playing-in-homepage');
        const aboutMePageMinesweeper = document.querySelector('.is-minesweeper-playing-in-about-page');
        
        homepageMinesweeper.innerHTML = '<div></div>';
        aboutMePageMinesweeper.innerHTML = '';

        startWritingChars();
        
        return () => {
            isWritingChars.current = false
        };
    }, []);

    return (
        <>
            <div className={'textContent'}>
                <span className={'topper'}>Hello, my name is</span>
                <h1 className={'title'}>Giannis Nikolaou</h1>
                <h2 className={'work'} ref={workTitle}></h2>
                <div className={'buttons-container'}>
                    <Link href={'/contact'} className={'get-in-touch-button'}>
                        <div className={'GIT-wrapper'}>
                            <span>Get in touch</span>
                        </div>
                    </Link>
                    <DownloadCVButton />
                    <button className={'show-settings-panel-button'}>
                        Start-Game
                    </button>
                </div>
            </div>
        </>
    )
}