import Image from 'next/image';

export function VueIcon() {
    return (
        <div className="@container w-full aspect-square threeD-icon targetHover">
            <div className="top-8 relative w-full h-full text-[8cqw] text-white transform-3d -rotate-x-30 has-[.surface:hover]:rotate-x-0 -rotate-y-30 has-[.surface:hover]:rotate-y-0 scale-3d scale-80 has-[.surface:hover]:scale-x-100 has-[.surface:hover]:scale-y-100 has-[.surface:hover]:scale-z-100 has-[.surface:hover]:-translate-y-8 has-[.surface:hover]:translate-x-4 calm-super-slow [transition-property:transform,translate,scale]">
                <Image
                    className="absolute transform-3d translate-z-[3em] surface [clip-path:_polygon(0_0,38%_0,50%_10%,62%_0,100%_0,50%_100%)]"
                    src="icons/vue.svg"
                    width={200}
                    height={200}
                    alt=""
                />
                <div className="absolute flex bg-vue-highlight-side w-[5em] h-[12.125em] transform-3d -rotate-x-90 rotate-y-60 -rotate-z-90 origin-center translate-x-[6.875em] translate-y-[-0.875em] translate-z-[0.5em] surface" />
                <div className="top-0 left-0 absolute flex bg-vue-highlight-side w-[5em] h-[2.25em] transform-3d rotate-x-90 rotate-z-90 origin-center translate-x-[-1.25em] translate-y-[-1.125em] translate-z-[0.5em] surface" />
                <div className="top-0 left-0 absolute flex bg-vue-shadow-side w-[5em] h-[2.25em] transform-3d rotate-x-90 rotate-z-90 origin-center translate-x-[1em] translate-y-[-1.125em] translate-z-[0.5em] surface" />
                <div className="top-0 left-0 absolute flex bg-vue-highlight-side w-[5em] h-[2.375em] transform-3d rotate-x-90 rotate-z-90 origin-center translate-x-[8.75em] translate-y-[-1.125em] translate-z-[0.5em] surface" />
                <div className="top-0 left-0 absolute flex bg-vue-shadow-side w-[5em] h-[2.25em] transform-3d rotate-x-90 rotate-z-90 origin-center translate-x-[6.5em] translate-y-[-1.125em] translate-z-[0.5em] surface" />
                <div className="top-0 left-0 absolute flex bg-vue-shadow-side w-[5em] h-[3.25em] transform-3d rotate-x-90 rotate-y-60 rotate-z-90 origin-center translate-x-[2.75em] translate-y-[-0.125em] translate-z-[0.5em] surface" />
            </div>
        </div>
    );
}