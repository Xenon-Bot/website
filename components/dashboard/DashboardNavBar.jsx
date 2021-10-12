import {useTranslation} from "next-i18next";
import Link from 'next/link'
import {faBars} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import GuildsDropdown from "./GuildsDropdown";

export default function DashboardNavBar({toggleSideBar}) {
    const {t} = useTranslation('common')

    return (
        <div className="bg-theme-darker text-gray-100 px-5 fixed top-0 left-0 right-0 w-screen h-20 w-screen flex items-center">
            <div className="flex flex-auto md:flex-initial items-center mr-7 md:hidden">
                <FontAwesomeIcon icon={faBars} className="text-3xl cursor-pointer" onClick={toggleSideBar}/>
            </div>
            <div className="flex flex-auto items-center text-xl hidden md:block">
                <Link href="/" passHref>
                    <a className="mr-7 hover:text-blue-300 transition-colors">Home</a>
                </Link>
                <a href="/discord" target="_blank"
                   className="mr-7 hover:text-blue-300 transition-colors">{t('support')}</a>
                <a href="/docs" target="_blank"
                   className="mr-7 hover:text-blue-300 transition-colors">{t('documentation')}</a>
            </div>
            <div className="flex flex-initial items-center">
                <GuildsDropdown/>
            </div>
        </div>
    )
}