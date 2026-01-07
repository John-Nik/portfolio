/* eslint-disable react/jsx-no-comment-textnodes */

export default function IntroductorySection() {
    return (
        <section className="flex justify-center w-full h-[80dvh] min-h-[600px] max-h-[800px]">
            <div className="flex flex-col gap-45 px-4 w-full max-w-screen-2xl">
                <h1 className="page-title">
                    // About Me
                </h1>

                <div className="flex w-full items-center flex-col font-(family-name:--fira-code)">
                    <span className="max-w-[1000px] font-light text-[clamp(1.625rem,3.4vw,3rem)] text-white text-center">
                        My name is Giannis, and I&apos;m a front-end developer
                    </span>

                    <span className="text-[clam(1rem,1.5vw,1.5rem)] text-tint-1 text-center">
                        (and a part time philosopher)
                    </span>
                </div>
            </div>
        </section>
    );
}