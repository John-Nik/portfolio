import CssSize from './CssSize';

type InitMsg = {
    type: 'init';
    canvas: OffscreenCanvas;
} & CssSize;

export default InitMsg;