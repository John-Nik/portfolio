'use client';
import useBringToView from '../composables/useBringToView';

export default function DescriptionSection() {
    const { ref } = useBringToView();

    return (
        <section className="flex justify-center items-center w-full h-[80dvh] min-h-[600px] max-h-[800px]">
            <p
                ref={ref}
                data-show="false"
                className="w-full max-w-screen-lg px-4 text-white text-[clamp(1.25rem,2vw,1.75rem)] font-(family-name:--fira-code) text-center opacity-0 data-[show=true]:opacity-100 data-[show=true]:translate-y-0 calm-super-slow delay-150 h-fit"
            >
                I am all about <span className="text-secondary-tint-1">non-stop learning,</span> whether I am tackling difficult subjects or understanding simple concepts
            </p>
        </section>
    );
}