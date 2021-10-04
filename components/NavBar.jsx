import {useTranslation} from "next-i18next";
import Link from 'next/link'
import {faSignInAlt, faBars, faTimes} from "@fortawesome/free-solid-svg-icons";
import {faDiscord, faTwitter, faMedium} from "@fortawesome/free-brands-svg-icons";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {useUser} from "../context/user";
import {useEffect, useState} from 'react'
import UserDropdown from "./UserDropdown";
import {useRouter} from "next/router";
import {useToken} from "../context/token";
import apiRequest from "../api";

export default function NavBar() {
    const {t} = useTranslation('common')
    const user = useUser()
    const [token] = useToken()
    const router = useRouter()

    // TODO: replace with proper retrieval UI
    useEffect(() => {
        window.getApiToken = () => {
            apiRequest({
                method: 'POST',
                path: '/auth/token',
                token
            })
                .then(resp => resp.json())
                .then(data => console.log(data.token))
        }
    }, [token])

    function isPathActive(path) {
        return router.pathname.startsWith(path)
    }

    const [visible, setVisible] = useState(false)

    return (
        <div className="py-5 bg-theme-darker grid justify-items-center text-gray-100 px-5">
            <div className="w-full xl:w-304">
                <div className="flex items-center">
                    <div className="flex flex-initial items-center mr-7">
                        <Link href="/" passHref>
                            <a>
                                <img src="/logo-small.png" alt="Xenon Logo" className="rounded-full w-16"/>
                            </a>
                        </Link>
                    </div>
                    <div className="flex flex-auto items-center text-xl hidden md:block">
                        <Link href="/templates" passHref>
                            <a className={`mr-7 hover:text-blue-300 transition-colors ${isPathActive('/templates') ? 'text-blue-300' : 'text-gray-300'}`}>Templates</a>
                        </Link>
                        <Link href="/premium" passHref>
                            <a className={`mr-7 hover:text-yellow-500 transition-colors ${isPathActive('/premium') ? 'text-yellow-500' : 'text-gray-300'}`}>Premium</a>
                        </Link>
                        <a href="/docs" target="_blank" className={`mr-7 hover:text-blue-300 transition-colors ${isPathActive('/docs') ? 'text-blue-300' : 'text-gray-300'}`}>{t('documentation')}</a>
                    </div>
                    <div className="flex flex-auto md:flex-initial items-center md:mr-5">
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
                    <div className="flex flex-initial items-center hidden md:block">
                        {user ? (
                            <UserDropdown user={user}/>
                        ) : (
                            <Link href="/login" passHref>
                                <a className="text-xl bg-blue-500 hover:bg-blue-600 transition-colors rounded-md px-3 py-2 flex items-center">
                                    <FontAwesomeIcon icon={faSignInAlt} className="mr-2"/>
                                    <div>{t('login')}</div>
                                </a>
                            </Link>
                        )}
                    </div>
                    <div className="block md:hidden">
                        <button className="text-3xl px-2 py-1 hover:bg-theme-dark rounded-md"
                                onClick={() => setVisible(!visible)}>
                            <FontAwesomeIcon icon={visible ? faTimes : faBars}/>
                        </button>
                    </div>
                </div>
                <div
                    className={`flex flex-col md:hidden px-5 py-5 mt-5 bg-theme-dark rounded-md ${visible ? '' : 'hidden'}`}>
                    <div className="flex flex-col text-xl" onClick={() => setVisible(false)}>
                        <Link href="/templates" passHref>
                            <a className="mr-7 text-gray-300 hover:text-blue-300 transition-colors mb-3">Templates</a>
                        </Link>
                        <Link href="/premium" activeClass="text-white" passHref>
                            <a className="mr-7 text-gray-300 hover:text-yellow-500 transition-colors mb-3">Premium</a>
                        </Link>
                        <a href="/docs" target="_blank" className="mr-7 text-gray-300 hover:text-blue-300 transition-colors">{t('documentation')}</a>
                    </div>

                    <div className="mt-5">
                        {user ? (
                            <UserDropdown user={user} above={false}/>
                        ) : (
                            <Link href="/login" passHref>
                                <a className="text-xl bg-blue-500 hover:bg-blue-600 transition-colors rounded-md px-3 py-2 flex items-center">
                                    <FontAwesomeIcon icon={faSignInAlt} className="mr-2"/>
                                    <div>{t('login')}</div>
                                </a>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}