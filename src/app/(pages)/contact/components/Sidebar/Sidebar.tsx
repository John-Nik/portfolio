import Link from 'next/link';
import DownloadCVButton from '../../../../components/buttons/DownloadCVButton';
import EmailIcon from '../../../../components/icons-components/EmailIcon';
import GithubIcon from '../../../../components/icons-components/GithubIcon';
import './styling.scss';

export default function Sidebar() {
    return (
        <aside id="sidebar">
            <div className="container">
                <div className="download-cv-button-container">
                    <DownloadCVButton />
                </div>

                <div className="contact-info-container">
                    <ul className="contact-info-wrapper">
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