import './styling.scss';

export default function IntroductorySection() {
    return (
        <section id="introduction">
            <div className={"container"}>
                <h1 className={'title'}>// About Me</h1>
                <div className={'about-me-wrapper'}>
                    <span className={'about-me'}>My name is Giannis, and I'm a front-end developer</span>
                    <span className={'smalltext'}>(and a part time philosopher)</span>
                </div>
            </div>
        </section>
    )
}