import Link from 'next/link';
import DownloadCVButton from '../../../../components/buttons/DownloadCVButton';
import CallIcon from '../../../../components/icons-components/CallIcon';
import EmailIcon from '../../../../components/icons-components/EmailIcon';
import GithubIcon from '../../../../components/icons-components/GithubIcon';
import './styling.scss';
import { ReactElement } from 'react';

export default function Sidebar(): ReactElement {
    return (
        <aside id="sidebar">
            <div className="container">
                <div className="download-cv-button-container">
                    <DownloadCVButton />
                </div>

                <div className="contact-info-container">
                    <ul className="contact-info-wrapper">
                        <li className="contact">
                            <CallIcon />
                            <Link
                                className="call-link"
                                href="tel:0035799475294"
                            >
                                +357 99475294
                            </Link>
                        </li>
                        <li className="contact">
                            <EmailIcon />
                            <Link
                                className="email-link"
                                href="mailto:nikolaou.giannis@yahoo.com?subject=Cool website"
                            >
                                nikolaou.giannis@yahoo.com
                            </Link>
                        </li>
                        <li className="contact">
                            <GithubIcon link="https://www.github.com/John-Nik" />
                            <Link
                                className="github-link"
                                href="https://www.github.com/John-Nik"
                            >
                                github.com/John-Nik
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </aside>
    );
}