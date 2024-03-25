'use client'
import { useForm, ValidationError } from '@formspree/react';

export default function FormWrapper() {
    const [state, handleSubmit] = useForm("mnqebkea");
    if (state.succeeded) {
        return <p>Thanks for joining!</p>;
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

    return (
        <div className={'form-wrapper'}>
            <form className="form" onSubmit={handleSubmit} name="contact" method="POST" data-netlify={true}>
                <input type="hidden" name="form-name" value="contact" />

                <div className={'form-input-box'}>
                    <label htmlFor="fname">Name</label><br />
                    <input onInput={handleNameInput} required={true} id="fname" name="nameInput" type="text" />
                </div>
                
                <div className={'form-input-box'}>
                    <label htmlFor="femail">Email</label><br />
                    <input onInput={handleEmailInput} required={true} id="femail" name="emailInput" type="text" />
                    <ValidationError prefix="Email" field="femail" errors={state.errors} />
                </div>

                <div className={'form-input-box'}>
                    <label htmlFor="fmessage">Message</label><br />
                    <textarea onInput={handleMessageInput} required={true} className="fmessage" id="fmessage" name="messageInput" type="text" />
                    <ValidationError prefix="Message" field="fmessage" errors={state.errors} />
                </div>
                
                <div className="submit-button-container">
                    <input type="submit" value="Submit" disabled={state.submitting} className={'start-game-button'} />
                </div>
            </form>
        </div>
    )
}