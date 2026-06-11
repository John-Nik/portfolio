import Image from 'next/image';

export function NginxIcon() {
    return (
        <div className="@container w-full aspect-square threeD-icon targetHover">
            <div
                className="relative w-full h-full text-[8cqw] text-white transform-3d -rotate-x-30 has-[.nginx-side:hover]:rotate-x-0 -rotate-y-30 has-[.nginx-side:hover]:rotate-y-0 scale-3d has-[.nginx-side:hover]:scale-x-120 has-[.nginx-side:hover]:scale-y-120 has-[.nginx-side:hover]:scale-z-120 has-[.nginx-side:hover]:-translate-y-8 has-[.nginx-side:hover]:translate-x-4 calm-super-slow [transition-property:transform,translate,scale]"
            >
                <Image
                    className="absolute w-[12.5em] h-[12.5em] translate-z-[3em] nginx-side [clip-path:_polygon(48%_0,52%_0,_100%_22%,_100%_78%,_52%_100%,_48%_100%,_0_78%,_0_22%)]"
                    src="icons/nginx.svg"
                    width={200}
                    height={200}
                    alt=""
                />
                <div className="top-0 left-0 absolute flex bg-green-800 w-[5.9375em] h-[2em] rotate-x-90 rotate-y-30 translate-x-[6em] translate-y-[0.5em] translate-z-[2em] nginx-side" />
                <div className="top-0 left-0 absolute flex bg-green-800 w-[5.9375em] h-[2em] rotate-x-90 -rotate-y-30 translate-x-[0.5em] translate-y-[0.5em] translate-z-[2em] nginx-side" />
                <div className="top-0 left-0 absolute flex bg-green-800 w-[5.9375em] h-[2em] rotate-x-90 rotate-y-90 translate-x-[8.75em] translate-y-[5.25em] translate-z-[2em] nginx-side" />
                <div className="top-0 left-0 absolute flex bg-green-800 w-[5.9375em] h-[2em] rotate-x-90 rotate-y-90 -translate-x-[2.25em] translate-y-[5.25em] translate-z-[2em] nginx-side" />
                <div className="top-[-6.25em] left-1/2 absolute flex bg-green-800 w-[0.3125em] h-[2em] rotate-x-90 rotate-y-160 -translate-x-4/5 translate-y-[5.5em] translate-z-[2em] nginx-side" />
                <div className="top-[-6.25em] left-1/2 absolute flex bg-green-800 w-[0.3125em] h-[2em] rotate-x-90 rotate-y-30 -translate-x-1/5 translate-y-[5.5em] translate-z-[2em] nginx-side" />
                <div className="top-[-6.25em] left-1/2 absolute flex bg-green-800 w-[0.3125em] h-[2em] rotate-x-90 rotate-y-0 -translate-x-1/2 translate-y-[5.25em] translate-z-[2em] nginx-side" />
                <div className="-top-[4.2em] left-56/60 absolute flex bg-green-800 w-[0.3125em] h-[2em] rotate-x-88 rotate-y-30 -translate-x-9/10 translate-y-[6.25em] translate-z-[2em] nginx-side" />
                <div className="-top-[4.2em] left-56/60 absolute flex bg-green-800 w-[0.3125em] h-[2em] rotate-x-88 rotate-y-90 -translate-x-3/10 translate-y-[6.5em] translate-z-[2em] nginx-side" />
                <div className="-top-[4.2em] left-56/60 absolute flex bg-green-800 w-[0.3125em] h-[2em] rotate-x-88 rotate-y-60 -translate-x-5/10 translate-y-[6.5em] translate-z-[2em] nginx-side" />
            </div>
        </div>
    );
}