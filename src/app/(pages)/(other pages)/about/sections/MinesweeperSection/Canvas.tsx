'use client';
import { useEffect, useState } from 'react';
import { destroyCanvas, resetCanvas } from './minesweeperCanvasManager';

export default function Canvas() {
    const [initializedCanvas, setInitializedCanvas] = useState(false);

    useEffect(() => {
        // If (initializedCanvas) return;

        resetCanvas();
        setInitializedCanvas(true);

        return () => {
            destroyCanvas();
        };
    }, []);

    return (
        <canvas
            aria-hidden="true"
            id="minesweeper-canvas"
            className="z-0 absolute grid blur-xs w-full h-[240dvh] min-h-[1600px] max-h-[2400px] [mask-image:linear-gradient(to_bottom,rgba(0,0,0,1)_0%,rgba(0,0,0,1)_50%,rgba(0,0,0,0)_85%)] [mask-repeat:no-repeat] [mask-size:100%_100%]"
        />
    );
}
