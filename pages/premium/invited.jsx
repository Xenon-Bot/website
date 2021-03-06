import {useRouter} from "next/router";
import {useEffect, useState} from 'react'
import apiRequest from "../../api";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes, faSpinner, faCheck} from "@fortawesome/free-solid-svg-icons";
import {guildIcon} from "../../util";

export async function getStaticProps({locale}) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        },
    };
}

export default function PremiumInvited() {
    const router = useRouter()
    const code = router.query.code

    const [result, setResult] = useState([null, false])
    const [data, error] = result

    useEffect(() => {
        if (!code) {
            setResult([null, true])
            return
        }

        apiRequest({
            method: 'POST',
            path: '/auth/premium/invite',
            data: {code}
        })
            .then(async resp => {
                if (!resp.ok) {
                    setResult([null, true])
                } else {
                    setResult([await resp.json(), false])
                }
            })
    }, [code])

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
                        <img src="/premium-big.png" alt="Xenon" className="rounded-full w-20 h-20 sm:w-32 sm:h-32"/>
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
                <div className="bg-theme-darker p-5 rounded-md">
                    <iframe src="https://www.youtube.com/embed/Z0JSyOLuCD4" className="w-full h-48 sm:h-80"
                            title="YouTube video player" frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen/>
                </div>
            </div>
        </div>
    )
}