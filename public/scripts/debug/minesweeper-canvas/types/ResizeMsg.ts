import CssSize from './CssSize';

type ResizeMsg = {
    type: 'resize';
} & CssSize;

export default ResizeMsg;