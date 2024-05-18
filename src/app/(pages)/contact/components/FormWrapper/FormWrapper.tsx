'use client'
import { useForm, ValidationError } from '@formspree/react';
import { ReactElement, useState, useRef } from 'react';

export default function FormWrapper(): ReactElement {
    const [state, handleSubmit] = useForm("mnqebkea");
    const [isTerminalWriting, setIsTerminalWriting] = useState<boolean>(true);
    const nameInput = useRef(null);
    const emailInput = useRef(null);
    const messageInput = useRef(null);
    const thankYouSpan = useRef(null);

    if (state.succeeded) {
        if (isTerminalWriting == false) {
            displayThankYouMessage();
            successfulRequest();
        }
    } else if (state.errors != null) {
        unsuccessfulRequest();
        displayErrorMessage();
    }


    function handleNameInput(event): void {
        let nameOutput: HTMLSpanElement = document.querySelector('.name-js-input');
        nameOutput.innerHTML = `"${event.target.value}"`;
    }


    function handleEmailInput(event): void {
        let emailOutput = document.querySelector('.email-js-input');
        emailOutput.innerHTML = `"${event.target.value}"`;
    }


    function handleMessageInput(event): void {
        let messageOutput = document.querySelector('.message-js-input');
        messageOutput.innerHTML = `"${event.target.value}"`;
    }


    function removeCharactersFromInputs(): void {
        let isNameInputEmpty: boolean = false,
            isEmailInputEmpty: boolean = false,
            isMessageInputEmpty: boolean = false,
            interval: NodeJS.Timeout = setInterval(removeChar, 50);

        function removeChar(): void {
            if (isNameInputEmpty && isEmailInputEmpty && isMessageInputEmpty) {
                clearInterval(interval);
                return;
            }

            if (nameInput.current.value.length != 0) {
                nameInput.current.value = nameInput.current.value.slice(0, -1);
            } else {
                isNameInputEmpty = true;
            }

            if (emailInput.current.value.length != 0) {
                emailInput.current.value = emailInput.current.value.slice(0, -1);
            } else {
                isEmailInputEmpty = true;
            }

            if (messageInput.current.value.length != 0) {
                messageInput.current.value = messageInput.current.value.slice(0, -1);
            } else {
                isMessageInputEmpty = true;
            }
        }
    }

    function displayThankYouMessage(): void {
        const thankYouSpan: HTMLSpanElement = document.querySelector('.thankYou');
        thankYouSpan.textContent = ''; //reset the previous values if it had any
        let string: string = 'Thank you! I will get back to you as soon as possible';
        let placeCharInterval: NodeJS.Timeout = setInterval(placeChar, 75);
        let indexPosition: number = 0;

        
        function placeChar(): void {
            if (string.charAt(indexPosition) != undefined ) {
                thankYouSpan.textContent = thankYouSpan.textContent + string.charAt(indexPosition);
                indexPosition++;
            } else {
                clearInterval(placeCharInterval);
            }
        }
    }

    function displayErrorMessage(): void {
        thankYouSpan.current.textContent = ''; //reset the previous values if it had any
        let string: string = 'Something unexpected happened and caused an error. Try again later';
        let placeCharInterval: NodeJS.Timeout = setInterval(placeChar, 75);
        let indexPosition: number = 0;

        
        function placeChar(): void {
            if (string.charAt(indexPosition) != undefined ) {
                thankYouSpan.current.textContent = thankYouSpan.current.textContent + string.charAt(indexPosition);
                indexPosition++;
            } else {
                clearInterval(placeCharInterval);
            }
        }
    }


    function displayTerminal(): void {
        const terminal: HTMLDivElement = document.querySelector('.terminal');
        const terminalText: HTMLUListElement = document.querySelector('.terminalText');
        const firstLine: string = 'curl --json {message} -X POST https://john-nik.com/'
        let indexPosition: number = 0;
        let interval: NodeJS.Timeout;
        
        terminal.style.width = '70%';
        terminal.style.display = 'flex';
        
        setTimeout(() => {
            interval = setInterval(placeChar, 50);
        }, 300)
        
        function placeChar() {
            if (firstLine.length != terminalText.lastElementChild.textContent.length) {
                terminalText.lastElementChild.textContent = terminalText.lastElementChild.textContent + firstLine.charAt(indexPosition);
                indexPosition++;
            } else {
                setIsTerminalWriting(false);
                clearInterval(interval);
            }
        }
    }

    function successfulRequest(): void {
        const terminalText: HTMLUListElement = document.querySelector('.terminalText');
        const secondLine: string = 'HTTP/2.0 200 OK';
        const thirdLine: string = '&nbsp;';
        const forthLine: string = 'Your request was successful';
        const fifthLine: string = '';

        terminalText.insertAdjacentHTML('beforeend', `<li>${secondLine}</li>`);
        terminalText.insertAdjacentHTML('beforeend', `<li>${thirdLine}</li>`);
        terminalText.insertAdjacentHTML('beforeend', `<li>${forthLine}</li>`);
        terminalText.insertAdjacentHTML('beforeend', `<li>${fifthLine}</li>`);
    }

    function unsuccessfulRequest(): void {
        const terminalText: HTMLUListElement = document.querySelector('.terminalText');
        const secondLine: string = 'HTTP/2.0 500 Internal Server Error';
        const thirdLine: string = '&nbsp;';
        const forthLine: string = 'Your request was unsuccessful';
        const fifthLine: string = '';

        terminalText.insertAdjacentHTML('beforeend', `<li>${secondLine}</li>`);
        terminalText.insertAdjacentHTML('beforeend', `<li>${thirdLine}</li>`);
        terminalText.insertAdjacentHTML('beforeend', `<li>${forthLine}</li>`);
        terminalText.insertAdjacentHTML('beforeend', `<li>${fifthLine}</li>`);
    }


    return (
        <div className={'form-wrapper'}>
            <form className="form" onSubmit={handleSubmit} name="contact" method="POST" data-netlify={true}>
                <input type="hidden" name="form-name" value="contact" />

                <div className={'form-input-box'}>
                    <label htmlFor="fname">Name</label><br />
                    <input className='nameInput' ref={nameInput} onInput={handleNameInput} required={true} id="fname" name="nameInput" type="text" />
                </div>
                
                <div className={'form-input-box'}>
                    <label htmlFor="femail">Email</label><br />
                    <input className='emailInput' ref={emailInput} onInput={handleEmailInput} required={true} id="femail" name="emailInput" type="email" />
                    <ValidationError prefix="Email" field="femail" errors={state.errors} />
                </div>

                <div className={'form-input-box'}>
                    <label htmlFor="fmessage">Message</label><br />
                    <textarea onInput={handleMessageInput} required={true} className="fmessage" ref={messageInput} id="fmessage" name="messageInput" />
                    <ValidationError prefix="Message" field="fmessage" errors={state.errors} />
                </div>
                
                <div className="submit-button-container">
                    <input type="submit" value="Submit" onClick={() => {displayTerminal(); removeCharactersFromInputs()}} disabled={state.submitting} className={'start-game-button'} />
                    <span className='thankYou' ref={thankYouSpan}></span>
                </div>
            </form>
        </div>
    )
}