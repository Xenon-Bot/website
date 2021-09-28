import styles from '../styles/Home.module.css'
import {useTranslation} from 'next-i18next';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {InView} from "react-intersection-observer";
import Link from "next/link";
import Head from "next/head";
import QuestionAnswer from "../components/QuestionAnswer";

// TODO: localization
// TODO: main faq answers
// TODO: premium feature showcase
// TODO: light theme?

export async function getStaticProps({locale}) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['home', 'common'])),
        },
    };
}

export default function Home() {
    const {t} = useTranslation(['home', 'common'])

    // TODO: localization
    const sections = [
        {
            title: 'Backup your discord server and go back in time when you need it',
            description: 'Use server backups to save the current state of your discord server including roles, channels, and server settings. Get Xenon Premium to save messages, members, and bans as well. Backups are stored forever and can be loaded on any server at any time.',
            image: '/create-backup.jpg'
        },
        {
            title: 'Automatically create backups every day without having to think about it',
            description: 'Are you tired creating backups of your server manually. Xenon allows you to automatically create backups of your server every few hours. Get Xenon Premium to keep multiple automatic backups.',
            image: '/backup-interval.jpg'
        },
        {
            title: 'Access thousands of free templates for your discord server',
            description: 'Xenon was the first bot to offer server templates on discord. We have one of the largest collection of server templates available for free. Contribute by creating and sharing a template yourself.',
            image: 'template-load.jpg'
        },
        {
            title: 'Synchronize messages, bans and role assignments across servers',
            description: 'Get Xenon Premium to synchronize messages, bans, and role assignments between servers. Use it to connect multiple channels and server together or to keep your backup servers updated.',
            image: 'sync-messages.jpg'
        }
    ]

    const faq = t('faq', {returnObjects: true})

    return (
        <div>
            <Head>
                <title>Xenon Bot</title>
            </Head>
            <div className="grid justify-items-center bg-theme-darker px-5 pt-20 pb-28 mb-20">
                <div className="text-center max-w-2xl">
                    <h1 className="text-6xl sm:text-7xl font-bold mb-5">Xenon Bot</h1>
                    <div className="text-gray-400 text-2xl mb-10">
                        {t('common:longDescription')}
                    </div>
                    <a href="/invite" target="_blank"
                       className="bg-blue-400 text-black transform hover:scale-105 transition-transform transition-300 inline-block transition-colors px-8 py-2 rounded-md text-2xl mr-4">
                        {t('common:invite')}
                    </a>
                    <a href="/discord" target="_blank"
                       className="bg-theme-light transform hover:scale-105 transition-transform transition-300 inline-block transition-colors px-8 py-2 rounded-md text-2xl">
                        {t('common:support')}
                    </a>
                </div>
            </div>
            <div className="grid justify-items-center px-5">
                <div className="w-full xl:w-304">
                    {sections.map((section, i) => (
                        <InView key={i} triggerOnce={true}>
                            {({inView, ref}) => (
                                <section
                                    className={`mb-28 sm:px-10 lg:px-0 flex flex-wrap-reverse lg:flex-nowrap ${i % 2 !== 0 ? 'flex-row-reverse' : ''} ${styles.section} ${inView ? styles.sectionVisible : styles.sectionHidden}`}
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

                    <div className="my-28">
                        <div className="text-4xl text-center mb-10 font-bold">{t('common:faqTitle')}</div>
                        {faq.map(({question, answer}, i) => (
                            <QuestionAnswer question={question} answer={answer} key={i}/>
                        ))}
                        <div className="text-center mt-16">
                            <div className="text-xl text-gray-300 mb-5">
                                {t('common:faqFooter')}
                            </div>
                            <a href="/discord" target="_blank"
                               className="inline-block bg-blue-400 px-3 py-2 rounded-md text-lg text-black transform hover:scale-105 transition-transform transition-300">
                                {t('common:joinDiscord')}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`bg-gray-900 py-16 text-center px-5 ${styles.preFooter}`}>
                <div className="text-5xl mb-4">{t('preFooterTitle')}</div>
                <div className="text-2xl text-gray-300 mb-10">{t('preFooterText')}</div>
                <a className="bg-blue-400 transform hover:scale-105 transition-transform transition-300 inline-block px-3 py-2 rounded-md text-black text-xl mr-3"
                   href="/invite" target="_blank">{t('common:invite')}</a>
                <Link href="/premium" passHref>
                    <a className="bg-yellow-400 transform hover:scale-105 transition-transform transition-300 inline-block px-3 py-2 rounded-md text-black text-xl">
                        {t('common:getPremium')}
                    </a>
                </Link>
            </div>
        </div>
    )
}
