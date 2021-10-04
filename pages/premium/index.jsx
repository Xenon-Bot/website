import Head from "next/head";
import styles from '../../styles/Premium.module.css'
import {useState} from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimesCircle, faCheckCircle} from "@fortawesome/free-solid-svg-icons";
import QuestionAnswer from "../../components/QuestionAnswer";
import Markdown from "../../components/Markdown";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useTranslation} from "next-i18next";

const tierPrices = {
    1: '4.99',
    2: '9.99',
    3: '14.99'
}

const tierUrls = {
    1: 'https://www.patreon.com/join/merlinfuchs/checkout?rid=4409325',
    2: 'https://www.patreon.com/join/merlinfuchs/checkout?rid=4837411',
    3: 'https://www.patreon.com/join/merlinfuchs/checkout?rid=3820460'
}

export async function getStaticProps({locale}) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common', 'premium'])),
        },
    };
}

export default function Premium() {
    const {t} = useTranslation(['premium', 'common'])

    const [selectedTier, setSelectedTier] = useState(2)

    const faq = t('faq', {returnObjects: true})

    return (
        <div>
            <Head>
                <title>Premium | Xenon Bot</title>
            </Head>
            <div className={`bg-theme-darker pt-20 pb-72 -mb-48 text-center px-5 ${styles.header}`}>
                <h3 className="text-7xl font-bold mb-4">Xenon Premium</h3>
                <div className="text-2xl text-gray-300 mb-10">{t('catchLine')}</div>
                <a href="/patreon" target="_blank"
                   className="inline-block bg-yellow-400 text-black transform hover:scale-105 transition-transform transition-300 px-5 py-2 rounded-md text-2xl">
                    {t('subscribeNow')}
                </a>
            </div>
            <div className="grid justify-items-center mb-20">
                <div className="w-full xl:w-304 px-3 md:px-5">
                    <div className="grid justify-items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 xl:gap-16 mb-32 px-2">
                        <div className="bg-theme-dark rounded-md shadow-xl flex flex-col">
                            <div className="pt-5 pb-10 px-5 text-center flex-auto items-center">
                                <div className="text-3xl font-bold text-gray-200">Backup role assignments & nicknames</div>
                            </div>
                            <img src="/template-load.jpg" alt=""
                                 className="flex-initial transform scale-105 xl:scale-110 rounded-md shadow-xl"/>
                        </div>
                        <div className="bg-theme-dark rounded-md shadow-xl flex flex-col">
                            <div className="pt-5 pb-10 px-5 text-center flex-auto items-center">
                                <div className="text-3xl font-bold text-gray-200">Backup messsages</div>
                            </div>
                            <img src="/template-load.jpg" alt=""
                                 className="flex-initial transform scale-105 xl:scale-110 rounded-md shadow-xl"/>
                        </div>
                        <div className="bg-theme-dark rounded-md shadow-xl flex flex-col">
                            <div className="pt-5 pb-10 px-5 text-center flex-auto items-center">
                                <div className="text-3xl font-bold text-gray-200">Synchronize messages, bans and role assignments</div>
                            </div>
                            <img src="/template-load.jpg" alt=""
                                 className="flex-initial transform scale-105 xl:scale-110 rounded-md shadow-xl"/>
                        </div>
                    </div>
                    <div className="flex flex-col lg:flex-row mb-36">
                        <div className="bg-theme-darker rounded-md flex flex-col flex-auto lg:mr-5 mb-5 lg:mb-0">
                            <div className="flex flex-initial flex-row flex-wrap justify-between">
                                <div
                                    className={`flex relative items-center justify-center cursor-pointer flex-auto border-r-2 border-theme-lighter rounded-tl-md px-3 py-2 ${selectedTier === 0 ? 'bg-theme-light' : 'bg-theme-dark'}`}
                                    onClick={() => setSelectedTier(0)}>
                                    <div className="text-xl fond-bold">Free Tier</div>
                                </div>
                                <div
                                    className={`flex relative items-center justify-center cursor-pointer flex-auto border-r-2 border-theme-lighter px-3 py-2 ${selectedTier === 1 ? 'bg-theme-light' : 'bg-theme-dark'}`}
                                    onClick={() => setSelectedTier(1)}>
                                    <div className="text-xl fond-bold">Premium 1</div>
                                </div>
                                <div
                                    className={`flex relative items-center justify-center cursor-pointer flex-auto border-r-2 border-theme-lighter px-3 py-2 ${selectedTier === 2 ? 'bg-theme-light' : 'bg-theme-dark'}`}
                                    onClick={() => setSelectedTier(2)}>
                                    <div className="text-xl fond-bold">Premium 2</div>
                                </div>
                                <div
                                    className={`flex relative items-center justify-center cursor-pointer flex-auto rounded-tr-md px-3 py-2 ${selectedTier === 3 ? 'bg-theme-light' : 'bg-theme-dark'}`}
                                    onClick={() => setSelectedTier(3)}>
                                    <div className="text-xl fond-bold">Premium 3</div>
                                </div>
                            </div>
                            <div className="flex-auto justify-evenly flex flex-col py-5 px-10 text-xl">
                                <div className="flex items-center">
                                    <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 mr-2 text-2xl"/>
                                    <div className="text-gray-300">
                                        <Markdown>{t('perks.backupBase')}</Markdown>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 mr-2 text-2xl"/>
                                    <div className="text-gray-300">
                                        <Markdown>
                                            {t('perks.backupCount', {count: selectedTier === 0 ? '15' : (selectedTier === 1 ? '50' : (selectedTier === 2 ? '100' : '250'))})}
                                        </Markdown>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 mr-2 text-2xl"/>
                                    <div className="text-gray-300">
                                        <Markdown>
                                            {t('perks.backupAutomaticKeep', {count: selectedTier === 0 ? '1' : (selectedTier === 1 ? '2' : (selectedTier === 2 ? '4' : '8'))})}
                                        </Markdown>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    {selectedTier > 0 ? (
                                        <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 mr-2 text-2xl"/>
                                    ) : (
                                        <FontAwesomeIcon icon={faTimesCircle} className="text-red-500 mr-2 text-2xl"/>
                                    )}
                                    <div className="text-gray-300">
                                        <Markdown>
                                            {t('perks.backupPremium')}
                                        </Markdown>
                                    </div>
                                </div>
                                {selectedTier > 0 ? (
                                    <div className="flex items-center">
                                        < FontAwesomeIcon icon={faCheckCircle}
                                                          className="text-green-500 mr-2 text-2xl"/>
                                        <div className="text-gray-300">
                                            <Markdown>
                                                {t('perks.backupMessageCount', {count: selectedTier === 1 ? '50' : (selectedTier === 2 ? '100' : '250')})}
                                            </Markdown>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex items-center">
                                        <FontAwesomeIcon icon={faTimesCircle} className="text-red-500 mr-2 text-2xl"/>
                                        <div className="text-gray-300">
                                            <Markdown>{t('perks.backupMessages')}</Markdown>
                                        </div>
                                    </div>
                                )}
                                <div className="flex items-center mb-3">
                                    {selectedTier > 0 ? (
                                        <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 mr-2 text-2xl"/>
                                    ) : (
                                        <FontAwesomeIcon icon={faTimesCircle} className="text-red-500 mr-2 text-2xl"/>
                                    )}
                                    <div className="text-gray-300">
                                        <Markdown>{t('perks.synchronize')}</Markdown>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex-auto lg:flex-initial">
                            {selectedTier === 0 ? (
                                <div className="bg-theme-darker rounded-md px-5 py-10 text-center">
                                    <div className="text-5xl mb-10 font-bold">Free Tier</div>
                                    <div
                                        className="text-8xl text-gray-300 mb-2 font-bold">$0.00
                                    </div>
                                    <div className="text-gray-300 text-xl mb-10">{t('perMonth')}</div>
                                    <a href="/invite" target="_blank"
                                       className="inline-block bg-blue-400 text-black transform hover:scale-105 transition-transform transition-300 px-3 py-2 rounded-md text-2xl">
                                        {t('common:inviteNow')}
                                    </a>
                                </div>
                            ) : (
                                <div className="bg-theme-darker rounded-md px-5 py-10 text-center">
                                    <div className="text-5xl mb-10 font-bold">Premium {selectedTier}</div>
                                    <div
                                        className="text-8xl text-blue-400 mb-2 font-bold">${tierPrices[selectedTier]}</div>
                                    <div className="text-gray-300 text-xl mb-10">{t('perMonth')}</div>
                                    <a href={tierUrls[selectedTier]} target="_blank" rel="noreferrer"
                                       className="inline-block bg-yellow-400 text-black transform hover:scale-105 transition-transform transition-300 px-3 py-2 rounded-md text-2xl">
                                        {t('subscribeNow')}
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="mb-10">
                        <div className="text-4xl text-center mb-10 font-bold">{t('common:faqTitle')}</div>
                        {faq.map(({question, answer}, i) => (
                            <QuestionAnswer question={question} answer={answer} key={i}/>
                        ))}
                        <div className="text-center mt-16">
                            <div className="text-xl text-gray-300 mb-5">
                                {t('common:faqFooter')}
                            </div>
                            <a href="/discord" target="_blank"
                               className="inline-block bg-blue-400 px-3 py-2 rounded-md text-lg text-black transform hover:scale-105 transition-transform transition-300">{t('common:joinDiscord')}</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}