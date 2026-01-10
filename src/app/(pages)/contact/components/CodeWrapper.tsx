'use client';
import { ReactElement, useContext, useEffect, useRef } from 'react';
import { ContactContext } from '../provide-inject/ContactContext';

export default function CodeWrapper(): ReactElement {
    const date = new Date();
    const fulldate = `${padTo2Digits(date.getDate())}/${padTo2Digits(date.getMonth() + 1)}/${date.getFullYear()}`;

    const terminalElem = useRef<HTMLUListElement | null>(null);
    const firstTerminalLineElem = useRef<HTMLLIElement | null>(null);

    const {
        name,
        email,
        message,
        setTerminalElem,
        setTerminalFirstLine,
    } = useContext(ContactContext);

    useEffect(() => {
        setTerminalElem(terminalElem.current);
        setTerminalFirstLine(firstTerminalLineElem.current);

        return () => {
            setTerminalElem(null);
            setTerminalFirstLine(null);
        };
    }, [terminalElem, firstTerminalLineElem]);

    function padTo2Digits(num: number): string {
        return num.toString().padStart(2, '0');
    }

    return (
        <div
            aria-hidden="true"
            className="hidden lg:flex flex-col items-center mt-11 w-1/2 max-w-[64ch]"
        >
            <ol className="w-full lg:w-full code">
                <li className="codeline">
                    <span className="text-white">
                        <span className="text-[#AA0000]">const </span>
                        <span className="text-[#0349D2]">button </span>
                        <span className="text-[#D92644]">= </span>
                        <span className="text-[#0349D2]">document</span>
                        <span className="text-[#D92644]">.</span>
                        <span className="text-[#0349D2]">querySelector(&quot;</span>
                        <span className="text-[#D98026]">#form-button</span>
                        <span className="text-[#0349D2]">&quot;)</span>;
                    </span>
                </li>

                <li className="select-none codeline">
                    &nbsp;
                </li>

                <li className="codeline">
                    <span className="text-[#AA0000]">const </span><span className="text-[#0349D2]">message </span><span className="text-[#D92644]">= </span><span className="text-[#0349D2]">{'{'}</span>
                </li>

                <li className="codeline">
                    &nbsp;&nbsp;<span className="text-[#3679FC]">name</span><span className="text-white/50">: </span><span className="text-[#D98026] name-js-input">{`"${name}"`}</span><span className="text-white">,</span>
                </li>

                <li className="codeline">
                    &nbsp;&nbsp;<span className="text-[#3679FC]">email</span><span className="text-white/50">: </span><span className="text-[#D98026] email-js-input">{`"${email}"`}</span><span className="text-white">,</span>
                </li>

                <li className="codeline">
                    &nbsp;&nbsp;<span className="text-[#3679FC]">message</span><span className="text-white/50">: </span><span className="text-[#D98026] message-js-input">{`"${message}"`}</span><span className="text-white">,</span>
                </li>

                <li className="codeline">
                    &nbsp;&nbsp;<span className="text-[#3679FC]">date</span><span className="text-white/50">: </span><span className="text-[#D98026] date-js-input">{`"${fulldate}"`}</span>
                </li>

                <li className="codeline">
                    <span className="text-[#0349D2]">{'}'}</span><span className="text-white">;</span>
                </li>

                <li className="select-none codeline">
                    &nbsp;
                </li>

                <li className="codeline">
                    <span className="text-[#0349D2]">button</span><span className="text-white">.</span><span className="text-[#D92644]">addEventListener</span><span className="text-[#62D926]">(</span><span className="text-[#D9BB26]">&quot;click&quot;</span><span className="text-white/50">, </span><span className="text-[#D926D9]">() </span><span className="text-[#D92644]">{'=>'} </span><span className="text-[#26D980]">{'{'}</span>
                </li>

                <li className="codeline">
                    &nbsp;&nbsp;<span className="text-white">form.</span><span className="text-[#D92644]">send</span><span className="text-[#D926D9]">(</span><span className="text-[#0349D2]">message</span><span className="text-[#D926D9]">)</span><span className="text-white">;</span>
                </li>

                <li className="codeline">
                    <span className="text-[#26D980]">{'}'}</span><span className="text-[#62D926]">)</span>
                </li>
            </ol>

            <div className="mt-4 w-full max-w-[60ch] bg-black calm h-fit relative font-(family-name:--fira-code)">
                <ul
                    className="text-white text-xs"
                    ref={terminalElem}
                >
                    <li
                        ref={firstTerminalLineElem}
                        className="hidden before:inline before:text-white after:text-white last:before:content-['>'] last:after:content-['|'] after:animate-blink"
                    />
                </ul>
            </div>
        </div>
    );
}