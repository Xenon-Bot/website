import styles from '../styles/Home.module.css'
import {useTranslation} from 'next-i18next';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';

export async function getStaticProps({locale}) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        },
    };
}

export default function Home() {
    return (
        <div className="grid justify-items-center bg-theme-darker px-5 pt-20 pb-28">
            <div className="text-center max-w-2xl">
                <h1 className="text-7xl font-bold mb-5">Xenon Bot</h1>
                <div className="text-gray-400 text-2xl mb-10">Backup, archive, copy, clone or synchronize your discord server and take advantage of hundreds of free
                    templates.
                </div>
                <a href="/invite" target="_blank" className="bg-blue-500 hover:bg-blue-600 transition-colors px-8 py-2 rounded-md text-2xl mr-4">Invite</a>
                <a href="/discord" target="_blank" className="bg-theme-light hover:bg-theme-lighter transition-colors px-8 py-2 rounded-md text-2xl">Support</a>
            </div>
        </div>
    )
}
