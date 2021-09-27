import styles from '../styles/Home.module.css'
import {useTranslation} from 'next-i18next';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {InView} from "react-intersection-observer";
import Link from "next/link";
import Head from "next/head";

export async function getStaticProps({locale}) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        },
    };
}

export default function Home() {
    // TODO: localization
    const sections = [
        {
            title: 'Backup your discord server and go back in time when you need it',
            description: 'Use server backups to save the current state of your discord server including roles, channels, and server settings. Get Xenon Premium to save messages, members, and bans as well. Backups are stored forever and can be loaded on any server at any time.',
            image: 'https://xenon.bot/static/img/examples/backup_create.jpg'
        },
        {
            title: 'Automatically create backups every day without having to think about it',
            description: 'Are you tired creating backups of your server manually. Xenon allows you to automatically create backups of your server every few hours. Get Xenon Premium to keep multiple automatic backups.',
            image: 'https://xenon.bot/static/img/examples/backup_create.jpg'
        },
        {
            title: 'Access thousands of free templates for your discord server',
            description: 'Xenon was the first bot to offer server templates on discord. We have one of the largest collection of server templates available for free. Contribute by creating and sharing a template yourself.',
            image: 'https://xenon.bot/static/img/examples/backup_create.jpg'
        },
        {
            title: 'Synchronize messages, bans and role assignments across servers',
            description: 'Get Xenon Premium to synchronize messages, bans, and role assignments between servers. Use it to connect multiple channels and server together or to keep your backup servers updated.',
            image: 'https://xenon.bot/static/img/examples/backup_create.jpg'
        }
    ]

    return (
        <div>
            <Head>
                <title>Xenon Bot</title>
            </Head>
            <div className="grid justify-items-center bg-theme-darker px-5 pt-20 pb-28 mb-20">
                <div className="text-center max-w-2xl">
                    <h1 className="text-6xl sm:text-7xl font-bold mb-5">Xenon Bot</h1>
                    <div className="text-gray-400 text-2xl mb-10">Backup, archive, copy, clone or synchronize your
                        discord server and take advantage of hundreds of free
                        templates.
                    </div>
                    <a href="/invite" target="_blank"
                       className="bg-blue-500 hover:bg-blue-600 transition-colors px-8 py-2 rounded-md text-2xl mr-4">Invite</a>
                    <a href="/discord" target="_blank"
                       className="bg-theme-light hover:bg-theme-lighter transition-colors px-8 py-2 rounded-md text-2xl">Support</a>
                </div>
            </div>
            <div className="grid justify-items-center px-5">
                <div className="w-full xl:w-304">
                    {sections.map((section, i) => (
                        <InView key={i}>
                            {({inView, ref}) => (
                                <section
                                    className={`mb-28 flex flex-wrap-reverse lg:flex-nowrap ${i % 2 !== 0 ? 'flex-row-reverse' : ''} ${styles.section} ${inView ? styles.sectionVisible : styles.sectionHidden}`}
                                    ref={ref}>
                                    <div
                                        className={`flex-initial w-full lg:w-11/12 text-center flex items-center ${i % 2 !== 0 ? 'lg:pl-32' : 'lg:pr-32'}`}>
                                        <div>
                                            <div className="text-3xl font-bold mb-8"
                                                 style={{'lineHeight': '1.3em'}}>
                                                {section.title}
                                            </div>
                                            <div className="text-lg text-gray-400">
                                                {section.description}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex-initial w-full mb-10 lg:mb-0">
                                        <img src={section.image} alt=""
                                             className="w-full rounded-md"/>
                                    </div>
                                </section>
                            )}
                        </InView>
                    ))}
                </div>
            </div>
            <div className={`bg-gray-900 py-16 text-center px-5 ${styles.preFooter}`}>
                <div className="text-5xl mb-4">Ready to start?</div>
                <div className="text-2xl text-gray-300 mb-10">Invite the bot for free or get premium to take advantage of all features.</div>
                <a className="bg-blue-400 hover:bg-blue-500 px-3 py-2 rounded-md text-black text-xl mr-3" href="/invite" target="_blank">Invite</a>
                <Link href="/premium" passHref>
                    <a className="bg-yellow-400 hover:bg-yellow-500 px-3 py-2 rounded-md text-black text-xl">Get Premium</a>
                </Link>
            </div>
        </div>
    )
}
