import './styling.scss';
import Image from 'next/image';

export default function DescriptionSection() {
    return (
        <section id={'description-section'}>
            <div className={'container'}>
                <div className={'text-content'}>
                    <p>I am all about <span className={'colored-text'}>non-stop learning,</span> whether I am tackling difficult subjects or understanding simple concepts.</p>
                </div>
                {/* <div className={'image-wrapper'}>
                    <Image src="/images/about-me-picture.png" width={600} height={600} alt="Placeholder picture" />
                </div> */}
            </div>
        </section>
    )
}