'use client';
import {
    useForm,
    ValidationError
} from '@formspree/react';
import {
    useRef,
    useContext,
    useEffect,
    useState
} from 'react';
import { ContactContext } from '../provide-inject/ContactContext';
import createTypewriter from '../../../helpers/typeStringInElem';

interface TypewriterControls {
    startTyping: null | ReturnType<typeof createTypewriter>['startTyping'];
    stopTyping: null | ReturnType<typeof createTypewriter>['stopTyping'];
}

export default function FormWrapper() {
    const [isFormAnimationFinished, setIsFormAnimationFinished] = useState<boolean>(false);
    const [showRequestResponse, setShowRequestResponse] = useState(false);

    const nameInput = useRef<HTMLInputElement | null>(null);
    const emailInput = useRef<HTMLInputElement | null>(null);
    const messageInput = useRef<HTMLTextAreaElement | null>(null);
    const thankYouSpan = useRef<HTMLSpanElement | null>(null);

    const messageTypewriterRef = useRef<TypewriterControls>({
        startTyping: null,
        stopTyping: null
    });
    const nameTypewriterRef = useRef<TypewriterControls>({
        startTyping: null,
        stopTyping: null
    });
    const emailTypewriterRef = useRef<TypewriterControls>({
        startTyping: null,
        stopTyping: null
    });
    const messageInputTypewriterRef = useRef<TypewriterControls>({
        startTyping: null,
        stopTyping: null
    });
    const terminalTypewriterRef = useRef<TypewriterControls>({
        startTyping: null,
        stopTyping: null,
    });

    const [state, handleSubmit] = useForm('mnqebkea');

    const {
        terminalElem,
        terminalFirstLine,
        setName,
        setEmail,
        setMessage
    } = useContext(ContactContext);

    useEffect(() => {
        if (!showRequestResponse) return;

        if (state.succeeded) {
            typeFeedbackMessage('success');
            appendTerminalResponse('success');
            return;
        }

        if (state.errors) {
            appendTerminalResponse('error');
            typeFeedbackMessage('error');
        }
    }, [isFormAnimationFinished, showRequestResponse, state]);

    useEffect(() => {
        messageTypewriterRef.current = createTypewriter(thankYouSpan.current);
        nameTypewriterRef.current = createTypewriter(nameInput.current, '', {
            mode: 'remove',
            elemKeyToModify: 'value',
        });
        emailTypewriterRef.current = createTypewriter(emailInput.current, '', {
            mode: 'remove',
            elemKeyToModify: 'value',
        });
        messageInputTypewriterRef.current = createTypewriter(messageInput.current, '', {
            mode: 'remove',
            elemKeyToModify: 'value',
        });
        terminalTypewriterRef.current = createTypewriter(terminalFirstLine, 'curl --json {message} -X POST https://john-nik.com/');

        return () => {
            messageTypewriterRef.current.stopTyping?.();
            nameTypewriterRef.current.stopTyping?.();
            emailTypewriterRef.current.stopTyping?.();
            messageInputTypewriterRef.current.stopTyping?.();
            terminalTypewriterRef.current.stopTyping?.();
        };
    }, [
        thankYouSpan,
        nameInput,
        emailInput,
        messageInput,
        terminalFirstLine
    ]);

    function onNameInput(event: React.InputEvent<HTMLInputElement>) {
        setName(event.currentTarget.value);
    }

    function onEmailInput(event: React.InputEvent<HTMLInputElement>) {
        setEmail(event.currentTarget.value);
    }

    function onMessageInput(event: React.InputEvent<HTMLTextAreaElement>) {
        setMessage(event.currentTarget.value);
    }

    function animateClearingInputs() {
        const { startTyping: removeCharsFromNameInput } = nameTypewriterRef.current;
        const { startTyping: removeCharsFromEmailInput } = emailTypewriterRef.current;
        const { startTyping: removeCharsFromMessageInput } = messageInputTypewriterRef.current;

        let finishedTypingNameInput = false;
        let finishedTypingEmailInput = false;
        let finishedTypingMessageInput = false;

        function finishedTypingInputs() {
            if (finishedTypingNameInput && finishedTypingEmailInput && finishedTypingMessageInput) {
                setIsFormAnimationFinished(true);
            }
        }

        if (!removeCharsFromNameInput) {
            throw new Error('No removeCharsFromNameInput function provided');
        }

        if (!removeCharsFromEmailInput) {
            throw new Error('No removeCharsFromEmailInput function provided');
        }

        if (!removeCharsFromMessageInput) {
            throw new Error('No removeCharsFromMessageInput function provided');
        }

        removeCharsFromNameInput(undefined, () => {
            finishedTypingNameInput = true;
            finishedTypingInputs();
        });
        removeCharsFromEmailInput(undefined, () => {
            finishedTypingEmailInput = true;
            finishedTypingInputs();
        });
        removeCharsFromMessageInput(undefined, () => {
            finishedTypingMessageInput = true;
            finishedTypingInputs();
        });
    }

    function typeFeedbackMessage(type: 'success' | 'error') {
        const { startTyping } = messageTypewriterRef.current;

        if (!startTyping) {
            throw new Error('No start function provided');
        }

        startTyping(type === 'success'
            ? 'Thank you for your message! I will get back to you soon.'
            : 'An error occurred while sending your message. Please try again later.'
        );
    }

    function typeTerminalFirstLine() {
        const { startTyping } = terminalTypewriterRef.current;

        if (!startTyping) {
            throw new Error('No startTyping function provided');
        }

        if (!(terminalFirstLine instanceof HTMLLIElement)) {
            throw new Error('No terminalFirstLine provided. Is it rendered?');
        }
        
        terminalFirstLine.style.display = 'flex';

        startTyping(undefined, () => {
            setShowRequestResponse(true);
        });
    }

    function appendTerminalResponse(status: 'success' | 'error') {
        const lines = [
            status === 'success' ? 'HTTP/2.0 200 OK' : 'HTTP/2.0 500 Internal Server Error',
            '&nbsp;',
            status === 'success' ? 'Your request was successful' : 'Your request was unsuccessful',
            ''
        ];

        lines.forEach(line => {
            terminalElem?.insertAdjacentHTML('beforeend', `<li>${line}</li>`);
        });
    }

    function onFormSubmit(event: React.FormEvent<HTMLFormElement>) {
        typeTerminalFirstLine();
        animateClearingInputs();
        handleSubmit(event);
    }

    return (
        <div className="flex justify-center w-full lg:w-1/2">
            <form
                className="flex flex-col items-center gap-4 w-full sm:w-4/5"
                onSubmit={onFormSubmit}
                name="contact"
                method="POST"
                data-netlify={true}
            >
                <input
                    type="hidden"
                    name="hidden"
                    value="contact"
                />

                <div className="flex flex-col gap-1.5 w-full">
                    <label
                        htmlFor="fname"
                        className="text-white text-xl"
                    >
                        Name
                    </label>

                    <input
                        className="bg-black/80 px-3 py-2 border border-[#83ADE2] rounded-xl w-full text-white text-base"
                        ref={nameInput}
                        onInput={onNameInput}
                        required={true}
                        id="fname"
                        name="nameInput"
                        type="text"
                        placeholder="Full Name"
                    />
                </div>

                <div className="flex flex-col gap-1.5 w-full">
                    <label
                        htmlFor="femail"
                        className="text-white text-xl"
                    >
                        Email
                    </label>

                    <input
                        className="bg-black/80 px-3 py-2 border border-[#83ADE2] rounded-xl w-full text-white text-base"
                        ref={emailInput}
                        onInput={onEmailInput}
                        required={true}
                        id="femail"
                        name="emailInput"
                        type="email"
                        placeholder="example@email.com"
                    />
                    <ValidationError
                        prefix="Email"
                        field="femail"
                        errors={state.errors}
                    />
                </div>

                <div className="flex flex-col gap-1.5 w-full">
                    <label
                        htmlFor="fmessage"
                        className="text-white text-xl"
                    >
                        Message
                    </label>

                    <textarea
                        onInput={onMessageInput}
                        required={true}
                        className="bg-black/80 px-3 py-2 border border-[#83ADE2] rounded-xl w-full text-white text-base"
                        rows={4}
                        ref={messageInput}
                        id="fmessage"
                        name="messageInput"
                        placeholder="Your message here... Anything relevant you have in mind"
                    />
                    <ValidationError
                        prefix="Message"
                        field="fmessage"
                        errors={state.errors}
                    />
                </div>

                <div className="relative flex items-start gap-4 mt-4 w-full">
                    <button
                        type="submit"
                        className="bg-[#83ADE2] hover:bg-[hsl(213,62%,60%)] opacity-0 rounded-full active:scale-95 animate-fade-in cursor-pointer calm-fast"
                        disabled={state.submitting}
                    >
                        <span className="font-(family-name:--press-start-font) block scale-y-180 origin-center px-5 py-3 text-black text-[0.5rem] tracking-[1px]">
                            Submit
                        </span>
                    </button>

                    <span
                        className="text-white text-[clamp(0.75rem,1vw,1rem)] font-light font-(family-name:--fira-code) flex items-center relative -mt-1"
                        ref={thankYouSpan}
                    />
                </div>
            </form>
        </div>
    );
}
