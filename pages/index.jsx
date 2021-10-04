import styles from '../styles/Home.module.css'
import {useTranslation} from 'next-i18next';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {InView} from "react-intersection-observer";
import Link from "next/link";
import Head from "next/head";
import QuestionAnswer from "../components/QuestionAnswer";

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
            title: t('sections.0.title'),
            description: t('sections.0.description'),
            image: '/create-backup.jpg'
        },
        {
            title: t('sections.1.title'),
            description: t('sections.1.description'),
            image: '/backup-interval.jpg'
        },
        {
            title: t('sections.2.title'),
            description: t('sections.2.description'),
            image: 'template-load.jpg'
        },
        {
            title: t('sections.3.title'),
            description: t('sections.3.description'),
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
