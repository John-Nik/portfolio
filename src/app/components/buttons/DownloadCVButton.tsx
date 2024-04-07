import { ReactElement } from 'react';
import './styling.scss';

export default function DownloadCVButton(): ReactElement {
    return (
        <a href={'/cv/Giannis_Nikolaou_CV.pdf'} download className={'download-cv-button'}>
        <div className={'DC-wrapper'}>
            <div className={'background'}></div>
            <span>Download CV</span>
        </div>
        </a>
    )
}