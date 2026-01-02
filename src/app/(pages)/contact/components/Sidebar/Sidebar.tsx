import Link from 'next/link';
import DownloadCVButton from '../../../../components/buttons/DownloadCVButton';
import EmailIconLink from '../../../../components/icons-components/EmailIconLink';
import GithubIconLink from '../../../../components/icons-components/GithubIconLink';
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
                            <EmailIconLink />
                            <Link
                                className="email-link"
                                href="mailto:nikolaou.giannis@yahoo.com?subject=Cool website"
                            >
                                nikolaou.giannis@yahoo.com
                            </Link>
                        </li>
                        <li className="contact">
                            <GithubIconLink link="https://www.github.com/John-Nik" />
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