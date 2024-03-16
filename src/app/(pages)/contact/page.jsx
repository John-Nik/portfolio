'use client'
import Header from "@/app/components/header/Header";
import Footer from "@/app/components/footer/footer";
import Sidebar from "./components/Sidebar/Sidebar";
import './styling.scss';
import CodeWrapper from "./components/CodeWrapper/CodeWrapper";


export default async function() {
    const handleSubmit = (event) => {
      
        const myForm = event.target;
        const formData = new FormData(myForm);
      
        fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams(formData).toString(),
        })
          .then(console.log('form submitted'))
          .catch((error) => alert(error));
      };

    return (
        <>
            <Header />

            <main id={'contact-me-main'}>
                <Sidebar />
                <div className={'main-content-container'}>
                    <div className={'content-wrapper'}>
                        <div className={'title-wrapper'}>
                            <h1>// ContactMe</h1>
                        </div>
                        <div className={'form-container'}>
                            <div className={'form-wrapper'}>
                                <form onSubmit={handleSubmit} name="contact" method="post" data-netlify="true">
                                    <input type="hidden" name="form-name" value="contact" />
                                    <div className={'form-input-box'}>
                                        <label htmlFor="fname">Name</label><br />
                                        <input required={true} id="fname" name="contact" type="text" />
                                    </div>
                                    
                                    <div className={'form-input-box'}>
                                        <label htmlFor="femail">Email</label><br />
                                        <input required={true} id="femail" name="contact" type="text" />
                                    </div>

                                    <div className={'form-input-box'}>
                                        <label htmlFor="fmessage">Message</label><br />
                                        <textarea required={true} className="fmessage" id="fmessage" name="contact" type="text" />
                                    </div>
                                    <div className="submit-button-container">
                                        <button type="submit" className={'start-game-button'}>Submit</button>
                                    </div>
                                </form>
                            </div>
                        <CodeWrapper />
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    )
}