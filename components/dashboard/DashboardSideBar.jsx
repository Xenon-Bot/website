import Link from "next/link";
import {useRouter} from "next/router";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFileDownload, faCropAlt, faStar, faEnvelopeOpenText, faShare} from "@fortawesome/free-solid-svg-icons";

export default function DashboardSideBar({visible, toggleSideBar}) {
    const router = useRouter()

    function isPathActive(path) {
        return router.pathname.startsWith(path)
    }

    return (
        <div
            className={`fixed top-0 left-0 w-64 mt-20 z-50 bg-theme-darker h-screen shadow-xl border-t-2 border-theme-darkest transition-all flex flex-col ${visible ? 'left-0' : '-left-64 md:left-0'}`}>
            <div className="flex-initial flex flex-col pt-3 text-gray-200" onClick={toggleSideBar}>
                <Link href="/dashboard/backups" passHref>
                    <a className={`px-5 py-3 hover:bg-theme-light flex items-center ${isPathActive('/dashboard/backups') ? 'bg-theme-dark' : ''}`}>
                        <div className={`w-6 mr-2 block text-xl ${isPathActive('/dashboard/backups') ? 'text-blue-400' : 'text-gray-400'}`}>
                            <FontAwesomeIcon icon={faFileDownload}/>
                        </div>
                        <div className="text-lg">Backups</div>
                    </a>
                </Link>
                <Link href="/dashboard/templates" passHref>
                    <a className={`px-5 py-3 hover:bg-theme-light flex items-center ${isPathActive('/dashboard/templates') ? 'bg-theme-dark' : ''}`}>
                        <div className={`w-6 mr-2 block text-xl ${isPathActive('/dashboard/templates') ? 'text-blue-400' : 'text-gray-400'}`}>
                            <FontAwesomeIcon icon={faCropAlt}/>
                        </div>
                        <div className="text-lg">Templates</div>
                    </a>
                </Link>
                <Link href="/dashboard/chatlogs" passHref>
                    <a className={`px-5 py-3 hover:bg-theme-light flex items-center ${isPathActive('/dashboard/chatlogs') ? 'bg-theme-dark' : ''}`}>
                        <div className={`w-6 mr-2 block text-xl ${isPathActive('/dashboard/chatlogs') ? 'text-yellow-400' : 'text-gray-400'}`}>
                            <FontAwesomeIcon icon={faEnvelopeOpenText}/>
                        </div>
                        <div className="text-lg">Chatlogs</div>
                    </a>
                </Link>
                <Link href="/dashboard/syncs" passHref>
                    <a className={`px-5 py-3 hover:bg-theme-light flex items-center ${isPathActive('/dashboard/syncs') ? 'bg-theme-dark' : ''}`}>
                        <div className={`w-6 mr-2 block text-xl ${isPathActive('/dashboard/syncs') ? 'text-yellow-400' : 'text-gray-400'}`}>
                            <FontAwesomeIcon icon={faShare}/>
                        </div>
                        <div className="text-lg">Syncs</div>
                    </a>
                </Link>
                <Link href="/dashboard/premium" passHref>
                    <a className={`px-5 py-3 hover:bg-theme-light flex items-center ${isPathActive('/dashboard/premium') ? 'bg-theme-dark' : ''}`}>
                        <div className={`w-6 mr-2 block text-xl ${isPathActive('/dashboard/premium') ? 'text-yellow-400' : 'text-gray-400'}`}>
                            <FontAwesomeIcon icon={faStar}/>
                        </div>
                        <div className="text-lg">Premium</div>
                    </a>
                </Link>
            </div>
        </div>
    )
}