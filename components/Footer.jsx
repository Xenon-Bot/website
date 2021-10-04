import Link from 'next/link'
import {useTranslation} from "next-i18next";
import {useRouter} from "next/router";
import Cookies from 'universal-cookie'
import {useEffect} from "react";

export default function Footer() {
    const {t} = useTranslation('common')
    const router = useRouter()

    function handleLocaleChange(e) {
        const newLocale = e.target.value

        const cookies = new Cookies()
        cookies.set('NEXT_LOCALE', newLocale, {path: '/', sameSite: 'strict'})
        router.push({
            pathname: router.pathname,
            query: router.query
        }, '', {locale: newLocale})
    }

    return (
        <div className="py-10 bg-theme-darker grid justify-items-center text-gray-100 px-5">
            <div className="w-full xl:w-304 flex flex-col md:flex-row">
                <div className="flex flex-col flex-auto mb-10 md:mb-0">
                    <div className="flex-auto pb-5 md:mb-0">
                        <div className="flex items-center mb-5">
                            <img src="/logo-small.png" alt="" className="w-10 rounded-full mr-3"/>
                            <div className="text-2xl">Xenon Bot</div>
                        </div>
                        <div className="text-gray-400">{t('shortDescription')}</div>
                    </div>
                    <div className="flex-initial">
                        <select className="bg-theme-light px-2 py-1 rounded-md mb-2 text-gray-300 text-lg w-32"
                                value={router.locale} onChange={handleLocaleChange}>
                            <option value="en">🇺🇸 English</option>
                            <option value="de">🇩🇪 German</option>
                        </select>
                        <div className="font-light text-gray-500">Copyright 2021 © Merlin Fuchs</div>
                    </div>
                </div>
                <div className="flex flex-initial">
                    <div className="mr-16 md:mr-24">
                        <div className="mb-4">Links</div>
                        <div className="mb-2">
                            <a href="/discord" target="_blank"
                               className="text-gray-400 hover:text-blue-300">Discord</a>
                        </div>
                        <div className="mb-2">
                            <a href="/twitter" target="_blank"
                               className="text-gray-400 hover:text-blue-300">Twitter</a>
                        </div>
                        <div className="mb-2">
                            <a href="/docs" target="_blank"
                               className="text-gray-400 hover:text-blue-300">{t('documentation')}</a></div>
                    </div>
                    <div>
                        <div className="mb-4">Legal</div>
                        <div className="mb-2">
                            <Link href="/terms" passHref>
                                <a className="text-gray-400 hover:text-blue-300">Terms of Service</a>
                            </Link>
                        </div>
                        <div className="mb-2">
                            <Link href="/privacy" passHref>
                                <a className="text-gray-400 hover:text-blue-300">Privacy Policy</a>
                            </Link>
                        </div>
                        <div className="mb-2">
                            <Link href="/contact" passHref>
                                <a className="text-gray-400 hover:text-blue-300">Contact</a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}