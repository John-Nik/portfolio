'use client'
import { useForm, ValidationError } from '@formspree/react';
import { useState } from 'react';

export default function FormWrapper() {
    const [state, handleSubmit] = useForm("mnqebkea");
    const [isTerminalWriting, setIsTerminalWriting] = useState(true);

    if (state.succeeded) {
        if (isTerminalWriting == false) {
            displayThankYouMessage();
            successfulRequest();
        }
    } else if (state.errors != null) {
        unsuccessfulRequest();
        displayErrorMessage();
    }


    function handleNameInput(event) {
        let nameOutput = document.querySelector('.name-js-input');
        nameOutput.innerHTML = `"${event.target.value}"`;
    }


    function handleEmailInput(event) {
        let emailOutput = document.querySelector('.email-js-input');
        emailOutput.innerHTML = `"${event.target.value}"`;
    }


    function handleMessageInput(event) {
        let messageOutput = document.querySelector('.message-js-input');
        messageOutput.innerHTML = `"${event.target.value}"`;
    }


    function removeCharactersFromInputs() {
        let nameInput = document.querySelector('.nameInput'),
            emailInput = document.querySelector('.emailInput'),
            messageInput = document.querySelector('.fmessage'),
            isNameInputEmpty = false,
            isEmailInputEmpty = false,
            isMessageInputEmpty = false,
            interval = setInterval(removeChar, 50);

        function removeChar() {
            if (isNameInputEmpty && isEmailInputEmpty && isMessageInputEmpty) {
                clearInterval(interval);
                return;
            }

            if (nameInput.value.length != 0) {
                nameInput.value = nameInput.value.slice(0, -1);
            } else {
                isNameInputEmpty = true;
            }

            if (emailInput.value.length != 0) {
                emailInput.value = emailInput.value.slice(0, -1);
            } else {
                isEmailInputEmpty = true;
            }

            if (messageInput.value.length != 0) {
                messageInput.value = messageInput.value.slice(0, -1);
            } else {
                isMessageInputEmpty = true;
            }
        }
    }

    function displayThankYouMessage() {
        const thankYouSpan = document.querySelector('.thankYou');
        let string = 'Thank you! I will get back to you as soon as possible';
        let placeCharInterval = setInterval(placeChar, 75);
        let indexPosition = 0;

        thankYouSpan.textContent = ''; //reset the previous values if it had any
        
        function placeChar() {
            if (string.charAt(indexPosition) != undefined ) {
                thankYouSpan.textContent = thankYouSpan.textContent + string.charAt(indexPosition);
                indexPosition++;
            } else {
                clearInterval(placeCharInterval);
                isDisplayingTextWriting = false;
            }
        }
    }

    function displayErrorMessage() {
        const thankYouSpan = document.querySelector('.thankYou');
        let string = 'Something unexpected happened and caused an error. Try again later';
        let placeCharInterval = setInterval(placeChar, 75);
        let indexPosition = 0;

        thankYouSpan.textContent = ''; //reset the previous values if it had any
        
        function placeChar() {
            if (string.charAt(indexPosition) != undefined ) {
                thankYouSpan.textContent = thankYouSpan.textContent + string.charAt(indexPosition);
                indexPosition++;
            } else {
                clearInterval(placeCharInterval);
                isDisplayingTextWriting = false;
            }
        }
    }


    function displayTerminal() {
        const terminal = document.querySelector('.terminal');
        const terminalText = document.querySelector('.terminalText');
        const firstLine = 'curl --json {message} -X POST https://john-nik.com/'
        let indexPosition = 0;
        let interval = '';
        
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

    function successfulRequest() {
        const terminalText = document.querySelector('.terminalText');
        const secondLine = 'HTTP/2.0 200 OK';
        const thirdLine = '&nbsp;';
        const forthLine = 'Your request was successful';
        const fifthLine = '';

        setTimeout(() => {
            terminalText.insertAdjacentHTML('beforeEnd', `<li>${secondLine}</li>`);
            terminalText.insertAdjacentHTML('beforeEnd', `<li>${thirdLine}</li>`);
            terminalText.insertAdjacentHTML('beforeEnd', `<li>${forthLine}</li>`);
            terminalText.insertAdjacentHTML('beforeEnd', `<li>${fifthLine}</li>`);
            displayThankYouMessage();
        }, 1500)
    }

    function unsuccessfulRequest() {
        const terminalText = document.querySelector('.terminalText');
        const secondLine = 'HTTP/2.0 500 Internal Server Error';
        const thirdLine = '&nbsp;';
        const forthLine = 'Your request was unsuccessful';
        const fifthLine = '';

        setTimeout(() => {
            terminalText.insertAdjacentHTML('beforeEnd', `<li>${secondLine}</li>`);
            terminalText.insertAdjacentHTML('beforeEnd', `<li>${thirdLine}</li>`);
            terminalText.insertAdjacentHTML('beforeEnd', `<li>${forthLine}</li>`);
            terminalText.insertAdjacentHTML('beforeEnd', `<li>${fifthLine}</li>`);
            displayErrorMessage();
        }, 1500)
    }


    return (
        <div className={'form-wrapper'}>
            <form className="form" onSubmit={handleSubmit} name="contact" method="POST" data-netlify={true}>
                <input type="hidden" name="form-name" value="contact" />

                <div className={'form-input-box'}>
                    <label htmlFor="fname">Name</label><br />
                    <input className='nameInput' onInput={handleNameInput} required={true} id="fname" name="nameInput" type="text" />
                </div>
                
                <div className={'form-input-box'}>
                    <label htmlFor="femail">Email</label><br />
                    <input className='emailInput' onInput={handleEmailInput} required={true} id="femail" name="emailInput" type="email" />
                    <ValidationError prefix="Email" field="femail" errors={state.errors} />
                </div>

                <div className={'form-input-box'}>
                    <label htmlFor="fmessage">Message</label><br />
                    <textarea onInput={handleMessageInput} required={true} className="fmessage" id="fmessage" name="messageInput" type="text" />
                    <ValidationError prefix="Message" field="fmessage" errors={state.errors} />
                </div>
                
                <div className="submit-button-container">
                    <input type="submit" value="Submit" onClick={() => {displayTerminal(); removeCharactersFromInputs()}} disabled={state.submitting} className={'start-game-button'} />
                    <span className='thankYou'></span>
                </div>
            </form>
        </div>
    )
}