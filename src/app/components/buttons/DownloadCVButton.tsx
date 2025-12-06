import { ReactElement } from 'react';
import './styling.scss';
import Link from 'next/link';

export default function DownloadCVButton(): ReactElement {
    return (
        <Link
            href="/cv/giannis_nikolaou_cv.pdf"
            download
            className="download-cv-button"
        >
            <div className="DC-wrapper">
                <div className="background" />
                <span>
                    Download CV
                </span>
            </div>
        </Link>
    );
}