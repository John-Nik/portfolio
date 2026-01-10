'use client';
import { createContext, useState, ReactNode } from 'react';

type ContactContextType = {
    name: string;
    email: string;
    message: string;
    terminalElem: HTMLUListElement | null;
    terminalFirstLine: HTMLLIElement | null;
    setName: (v: string) => void;
    setEmail: (v: string) => void;
    setMessage: (v: string) => void;
    setTerminalElem: (v: HTMLUListElement | null) => void;
    setTerminalFirstLine: (v: HTMLLIElement | null) => void;
};

export const ContactContext = createContext<ContactContextType>({
    name: '',
    email: '',
    message: '',
    terminalElem: null,
    terminalFirstLine: null,
    setName: () => { return; },
    setEmail: () => { return; },
    setMessage: () => { return; },
    setTerminalElem: () => { return; },
    setTerminalFirstLine: () => { return; }
});

export function ContactProvider({ children }: { children: ReactNode }) {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [terminalElem, setTerminalElem] = useState<HTMLUListElement | null>(null);
    const [terminalFirstLine, setTerminalFirstLine] = useState<HTMLLIElement | null>(null);

    return (
        <ContactContext.Provider
            value={{
                name,
                email,
                message,
                terminalElem,
                terminalFirstLine,
                setName,
                setEmail,
                setMessage,
                setTerminalElem,
                setTerminalFirstLine
            }}
        >
            {children}
        </ContactContext.Provider>
    );
}

export default ContactProvider;
