import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown, faCropAlt, faSignOutAlt, faUser} from "@fortawesome/free-solid-svg-icons";
import {userAvatar} from "../util";
import {useState} from 'react'
import Link from "next/link";
import {useTranslation} from "next-i18next";

export default function UserDropdown({user, above = true}) {
    const [visible, setVisible] = useState(false)
    const {t} = useTranslation('common')

    return (
        <div className="relative">
            <div className="flex items-center cursor-pointer" onClick={() => setVisible(!visible)}>
                <img src={userAvatar(user, {size: 128})} className="w-10 h-10 rounded-full mr-2" alt=""/>
                <div className="text-xl mr-3">{user.username}</div>
                <FontAwesomeIcon icon={faChevronDown} className="text-sm text-gray-300"/>
            </div>
            <div className={`${above ? 'absolute': ''} z-10 bg-theme-light shadow-xl rounded-md right-0 mt-3 flex flex-col ${visible ? '' : 'hidden'}`} onClick={() => setVisible(false)}>
                <Link href={`/users/${user.id}`} passHref>
                    <a className="flex items-center px-4 pt-2 pb-1 rounded-t-md hover:bg-theme-dark">
                        <FontAwesomeIcon icon={faUser} className="mr-2 text-gray-400"/>
                        <div className="text-lg whitespace-nowrap">{t('profile')}</div>
                    </a>
                </Link>
                <Link href="/templates/add" passHref>
                    <a className="flex items-center px-4 py-2 rounded-t-md hover:bg-theme-dark">
                        <FontAwesomeIcon icon={faCropAlt} className="mr-2 text-gray-400"/>
                        <div className="text-lg whitespace-nowrap">{t('addTemplate')}</div>
                    </a>
                </Link>
                <div className="h-0.5 bg-theme-lightest"/>
                <Link href="/logout" passHref>
                    <a className="flex items-center px-4 pt-1 pb-2 rounded-b-md hover:bg-theme-dark">
                        <FontAwesomeIcon icon={faSignOutAlt} className="mr-2 text-red-300"/>
                        <div className="text-lg whitespace-nowrap">{t('logout')}</div>
                    </a>
                </Link>
            </div>
        </div>
    )
}