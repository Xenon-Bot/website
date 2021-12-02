import {useRouter} from "next/router";
import {useEffect, useState} from 'react'
import apiRequest from "../api";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes, faSpinner, faCheck} from "@fortawesome/free-solid-svg-icons";
import {guildIcon} from "../util";
import ErrorBoundary from "../components/ErrorBoundary";
// import YouTube from "react-youtube";
// import youTubeStyles from '../styles/YouTube.module.css'

export async function getStaticProps({locale}) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        },
    };
}

export default function Invited() {
    // const {t} = useTranslation(['common'])

    const router = useRouter()

    const [result, setResult] = useState([null, false])
    const [data, error] = result

    useEffect(() => {
        if (!router.isReady) return

        const code = router.query.code
        if (!code) {
            setResult([null, true])
            return
        }

        apiRequest({
            method: 'POST',
            path: '/auth/invite',
            data: {code}
        })
            .then(async resp => {
                if (!resp.ok) {
                    setResult([null, true])
                } else {
                    setResult([await resp.json(), false])
                }
            })
    }, [router])

    return (
        <div className="grid justify-items-center px-3 md:px-5 my-10">
            <div className="w-full md:w-160">
                <div className="bg-theme-darker py-8 px-5 rounded-md mb-5 text-center">
                    <div className="text-5xl mb-16">
                        {error ? (
                            'Something went wrong ...'
                        ) : data ? (
                            'Thanks for inviting Xenon!'
                        ) : (
                            'Loading ..'
                        )}
                    </div>
                    <div className="flex items-center justify-center mb-16">
                        <img src="/logo-big.png" alt="Xenon" className="rounded-full w-20 h-20 sm:w-32 sm:h-32"/>
                        <div className="ml-10 w-2 h-2 rounded-full bg-gray-300"/>
                        <div className="mx-2 w-2 h-2 rounded-full bg-gray-300"/>
                        <div className="mr-10 w-2 h-2 rounded-full bg-gray-300"/>
                        <div>
                            {error ? (
                                <div
                                    className="flex w-20 h-20 sm:w-32 sm:h-32 rounded-full bg-red-400 items-center justify-center">
                                    <FontAwesomeIcon icon={faTimes} className="text-7xl"/>
                                </div>
                            ) : data ? (
                                data.guild && data.guild.icon ? (
                                    <img src={guildIcon(data.guild)} alt="Xenon"
                                         className="rounded-full w-20 h-20 sm:w-32 sm:h-32"/>
                                ) : (
                                    <div
                                        className="flex w-20 h-20 sm:w-32 sm:h-32 rounded-full bg-green-400 items-center justify-center">
                                        <FontAwesomeIcon icon={faCheck} className="text-7xl"/>
                                    </div>
                                )
                            ) : (
                                <div
                                    className="flex w-20 h-20 sm:w-32 sm:h-32 rounded-full bg-theme-light items-center justify-center">
                                    <FontAwesomeIcon icon={faSpinner} className="text-7xl"/>
                                </div>
                            )}
                        </div>
                    </div>
                    {error ? (
                        <div className="text-center">
                            <a href="/invite"
                               className="inline-block text-lg px-3 py-2 rounded-md bg-blue-400 text-black transition-transform transform hover:scale-105 mr-5">
                                Try Again
                            </a>
                        </div>
                    ) : (
                        <div className="text-center">
                            <a href="/docs" target="_blank"
                               className="inline-block text-lg px-3 py-2 rounded-md bg-blue-400 text-black transition-transform transform hover:scale-105 mr-5">
                                Documentation
                            </a>
                            <a href="/docs" target="_blank"
                               className="inline-block text-lg px-3 py-2 rounded-md bg-theme-light transition-transform transform hover:scale-105">
                                Support
                            </a>
                        </div>
                    )}
                </div>
                <ErrorBoundary fallback={<div/>}>
                    <div className="bg-theme-darker p-5 rounded-md">
                        <a href="https://www.youtube.com/watch?v=Z0JSyOLuCD4" target="_blank" rel="noreferrer">
                            <img src="/tutorial-thumbnail.png" alt="tutorial" className="w-full filter hover:brightness-90 transition-all"/>
                        </a>
                        {/* <YouTube videoId="Z0JSyOLuCD4" containerClassName={youTubeStyles.container}/> */}
                    </div>
                </ErrorBoundary>
            </div>
        </div>
    )
}