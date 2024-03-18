'use client'
export default function FormWrapper() {
    function handleSubmit(formEvent) {
        formEvent.preventDefault();

        const form = document.querySelector('form');
        const formData = new FormData(form);

        fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: encodeURI( {'form-name': 'contact', ...formData })
        })
        .then(() => console.log('Success!'))
        .catch(error => console.log(error))
    }

    return (
        <div className={'form-wrapper'}>
            <form onSubmit={handleSubmit} name="contact" method="POST" data-netlify={true}>
                <input type="hidden" name="form-name" value="contact" />
                <div className={'form-input-box'}>
                    <label htmlFor="fname">Name</label><br />
                    <input required={true} id="fname" name="nameInput" type="text" />
                </div>
                
                <div className={'form-input-box'}>
                    <label htmlFor="femail">Email</label><br />
                    <input required={true} id="femail" name="emailInput" type="text" />
                </div>

                <div className={'form-input-box'}>
                    <label htmlFor="fmessage">Message</label><br />
                    <textarea required={true} className="fmessage" id="fmessage" name="messageInput" type="text" />
                </div>
                <div className="submit-button-container">
                    <button type="submit" className={'start-game-button'}>Submit</button>
                </div>
            </form>
        </div>
    )
}