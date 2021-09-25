import {useTranslation} from "next-i18next";
import Link from 'next/link'
import {faSignInAlt} from "@fortawesome/free-solid-svg-icons";
import {faDiscord, faTwitter, faMedium} from "@fortawesome/free-brands-svg-icons";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {useAuth} from "../context/auth";

export default function NavBar() {
    const {t} = useTranslation('common')
    const [auth] = useAuth()

    return (
        <div className="py-5 bg-theme-darker grid justify-items-center text-gray-100 px-5">
            <div className="w-full xl:w-304 flex flex-col md:flex-row items-center">
                <div className="flex flex-auto">
                    <div className="flex flex-auto items-center">
                        <Link href="/" passHref>
                            <a>
                                <img src="/logo.png" alt="Xenon Logo" className="rounded-full w-16 mr-7"/>
                            </a>
                        </Link>
                        <div className="flex items-center text-xl">
                            <Link href="/templates" passHref>
                                <a className="mr-7 text-gray-300 hover:text-gray-100 transition-colors">Templates</a>
                            </Link>
                            <Link href="/docs" passHref>
                                <a className="mr-7 text-gray-300 hover:text-gray-100 transition-colors">Docs</a>
                            </Link>
                            <Link href="/docs" passHref>
                                <a className="mr-7 text-gray-300 hover:text-gray-100 transition-colors">Status</a>
                            </Link>
                        </div>
                    </div>
                    <div className="flex flex-initial items-center mr-5">
                        <a href="/discord" target="_blank"
                           className="mr-3 bg-theme-light rounded-full w-8 h-8 flex items-center justify-center hover:bg-theme-lighter"><FontAwesomeIcon
                            icon={faDiscord}/></a>
                        <a href="/twitter" target="_blank"
                           className="mr-3 bg-theme-light rounded-full w-8 h-8 flex items-center justify-center hover:bg-theme-lighter"><FontAwesomeIcon
                            icon={faTwitter}/></a>
                        <a href="/blog" target="_blank"
                           className="mr-3 bg-theme-light rounded-full w-8 h-8 flex items-center justify-center hover:bg-theme-lighter"><FontAwesomeIcon
                            icon={faMedium}/></a>
                    </div>
                </div>
                <div className="flex flex-initial items-center">
                    <Link href="/dashboard" passHref>
                        <a className="text-xl bg-blue-500 hover:bg-blue-600 transition-colors rounded-md px-3 py-2 flex items-center">
                            <FontAwesomeIcon icon={faSignInAlt} className="mr-2"/>
                            <div>{auth.authenticated ? 'Dashboard' : 'Login'}</div>
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    )
}