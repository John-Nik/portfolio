import { Milliseconds } from '../types/Milliseconds';

type HTMLElementStringOrNullProps<T extends HTMLElement> = {
    [Key in keyof T]: T[Key] extends (string | null)
        ? T[Key]
        : never
};

type HTMLElementStringOrNullPropKeys<T extends HTMLElement> = keyof HTMLElementStringOrNullProps<T>;

interface TypewriterOptions<T extends HTMLElement> {
    charsPerSec?: Milliseconds;
    mode?: 'add' | 'remove';
    elemKeyToModify?: HTMLElementStringOrNullPropKeys<T>;
}

export default function createTypewriter<T extends HTMLElement>(
    element: T | null | undefined,
    text?: string,
    options: TypewriterOptions<T> = {
        charsPerSec: 20,
        mode: 'add',
        elemKeyToModify: 'textContent' as HTMLElementStringOrNullPropKeys<T>
    }
) {
    let interval: ReturnType<typeof setInterval> | null = null;

    const opts: Required<TypewriterOptions<T>> = {
        charsPerSec: 20,
        mode: 'add',
        elemKeyToModify: 'textContent' as HTMLElementStringOrNullPropKeys<T>,
        ...options
    };
    const msPerChar = 1000 / opts.charsPerSec;


    function validateElement(el: unknown): el is HTMLElement {
        return el instanceof HTMLElement;
    }

    function startTyping(
        str: string | undefined = text,
        finishedTypingFunc?: () => void
    ) {
        interval = setInterval(() => {
            if (!validateElement(element)) {
                stopTyping();
                return;
            }

            if (typeof str === 'string') {
                processNextChar(str, finishedTypingFunc);
                return;
            }

            if (typeof text === 'string') {
                processNextChar(text, finishedTypingFunc);
                return;
            }

            // It is assumed both `str` and `text` are undefined
            throw new Error('No text was provided to start typing');
        }, msPerChar);
    }

    function stopTyping() {
        if (interval === null) return;

        clearTimeout(interval);
        interval = null;
    }

    function processNextChar(
        str: string,
        finishedTypingFunc?: () => void
    ) {
        if (opts.mode === 'add') {
            appendNextChar(str, finishedTypingFunc);
        } else {
            removeLastCharacter(finishedTypingFunc);
        }
    }

    function appendNextChar(
        str: string,
        finishedTypingFunc?: () => void
    ) {
        if (!validateElement(element)) {
            stopTyping();
            return;
        }

        const key = opts.elemKeyToModify;
        const current = element[key];

        if (typeof current !== 'string') {
            throw new Error(`HTMLElement has null set as it's value in the given ${String(key)} key. ${current}`);
        }

        if (current === str) {
            finishedTypingFunc?.();
            stopTyping();
            return;
        }

        const nextChar = str.charAt(current.length);

        Reflect.set(element, key, current + nextChar);
    }

    function removeLastCharacter(finishedTypingFunc?: () => void) {
        if (!validateElement(element)) {
            stopTyping();
            return;
        }

        const key = opts.elemKeyToModify;
        const current = element[key];

        if (typeof current !== 'string') {
            throw new Error(`HTMLElement has null set as it's value in the given ${String(key)} key. ${current}`);
        }

        if (current === '') {
            stopTyping();
            finishedTypingFunc?.();
        }

        const stringWithLastCharExcluded = current.slice(0, current.length - 2);

        Reflect.set(element, key, stringWithLastCharExcluded);
    }

    return {
        startTyping,
        stopTyping,
    };
}