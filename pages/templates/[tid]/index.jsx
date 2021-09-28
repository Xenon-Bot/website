import apiRequest from "../../../api";
import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faArrowUp,
    faChevronRight,
    faExclamation,
    faExternalLinkAlt,
    faEye,
    faPen,
    faTrash
} from "@fortawesome/free-solid-svg-icons";
import TemplatePreview from "../../../components/templates/TemplatePreview";
import TemplateCreator from "../../../components/templates/TemplateCreator";
import {toast} from 'react-toastify';
import {useState} from 'react'
import Head from "next/head";
import {useUser} from "../../../context/user";
import {useToken} from "../../../context/token";
import useApi from "../../../hooks/api";
import {useRouter} from "next/router";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

export async function getServerSideProps({params, locale}) {
    const resp = await apiRequest({path: `/templates/${params.tid}`})
    if (resp.status === 404) {
        return {
            props: {},
            notFound: true
        }
    }

    return {
        props: {
            ...(await serverSideTranslations(locale, ['templates', 'common'])),
            template: await resp.json()
        },
    }
}

export default function Template({template}) {
    const [token] = useToken()
    const user = useUser()
    const router = useRouter()

    const {data: upvoteStatus} = useApi({
        path: `/templates/${template.id}/vote`,
        requiresToken: true,
        redirectUnauthorized: false
    })

    const [upvoted, setUpvoted] = useState(false);

    if (upvoteStatus && upvoteStatus.upvoted && !upvoted) {
        setUpvoted(true)
    }

    function handleUpvote() {
        apiRequest({method: 'POST', path: `/templates/${template.id}/vote`, token})
            .then(resp => {
                if (resp.ok) {
                    template.upvote_count++
                    setUpvoted(true)
                    toast.success('Your vote has been counted')
                } else {
                    toast.error('You need to be logged in to upvote a template')
                }
            })
    }

    function handleDelete() {
        const result = confirm('Are you sure that you want to delete this template?')
        if (result) {
            apiRequest({method: 'DELETE', path: `/templates/${template.id}`, token})
                .then(async resp => {
                    if (resp.ok) {
                        router.push(`/users/${user.id}`)
                        toast.success('Your template has been deleted')
                    } else {
                        const data = await resp.json()
                        toast.error(data.text)
                    }
                })
        }
    }

    // <meta property="twitter:url" key="twitter_url" content={``}/>
    return (
        <div>
            <Head>
                <title>{template.name} | Xenon Bot</title>
                <meta property="og:title" key="og_title" content={template.name}/>
                <meta property="og:description" key="og_description" content={template.description}/>
                <meta property="twitter:title" key="tw_title" content={template.name}/>
                <meta property="twitter:description" key="tw_description" content={template.description}/>
                <meta property="og:image" key="og_image"
                      content={`https://templates.xenon.bot/api/templates/${template.id}/preview?usage_count=${template.usage_count}`}/>
                <meta property="twitter:image:src" key="tw_image"
                      content={`https://templates.xenon.bot/api/templates/${template.id}/preview?usage_count=${template.usage_count}`}/>
                <meta property="twitter:card" key="tw_card" content="summary_large_image"/>
            </Head>
            <div className="grid justify-items-center px-3 md:px-5 my-10">
                <div className="w-full xl:w-304">
                    <div className="bg-theme-darker py-4 px-2 sm:p-4 md:p-8 rounded-lg mb-5">
                        <div className="font-bold flex mb-3">
                            <div className="flex-auto text-3xl">{template.name}</div>
                            <div className="flex-shrink-0 flex-grow-0">
                                {upvoted ? (
                                    <div className="bg-theme-light text-xl px-3 py-2 rounded-lg">
                                        <FontAwesomeIcon icon={faArrowUp} className="text-blue-400"/>
                                        <span className="ml-2 text-gray-200">{template.upvote_count}</span>
                                    </div>
                                ) : (
                                    <button className="bg-theme-light text-xl px-3 py-2 rounded-lg hover:bg-theme-dark"
                                            type="button"
                                            onClick={handleUpvote}>
                                        <FontAwesomeIcon icon={faArrowUp}/>
                                        <span className="ml-2 text-gray-200">{template.upvote_count}</span>
                                    </button>
                                )}
                            </div>
                        </div>
                        <div className="font-thin text-gray-300 mb-5">
                            {template.description}
                        </div>
                        <div className="flex flex-wrap text-gray-300 mb-10">
                            {template.tags.map(tag => (
                                <Link passHref key={tag} href={`/templates/search?tags=${tag}`}>
                                    <a className="bg-theme-dark px-2 py-1 rounded-md mr-2 mb-2"
                                       data-google-interstitial="false">{tag}</a>
                                </Link>
                            ))}
                        </div>

                        <div className="grid justify-items-center my-20 md:my-32">
                            <div className="w-full md:w-176 ">
                                <div className="flex flex-wrap sm:flex-nowrap text-xl">
                                    <button
                                        className="text-left bg-theme-dark pl-5 pr-3 py-4 rounded-t-md sm:rounded-t-none sm:rounded-l-md flex-auto"
                                        id="copy">
                                <span className="text-gray-500 mr-3">
                                    <FontAwesomeIcon icon={faChevronRight}/>
                                </span>
                                        <span className="font-thin">/template load <span
                                            className="text-gray-400">name_or_id:</span> {template.id}</span>
                                    </button>
                                    <a href="/invite"
                                       data-google-interstitial="false"
                                       className="bg-theme-light px-4 py-4 rounded-b-md sm:rounded-b-none sm:rounded-r-md flex-auto sm:flex-initial hover:bg-gray-lighter text-center"
                                       target="_blank">
                                        Invite Bot
                                    </a>
                                </div>
                                {template.internal ? '' : (
                                    <a className="bg-blue-500 hover:bg-blue-600 rounded-md text-xl block mt-5 py-3 px-4 text-center"
                                       href={`https://discord.new/${template.id}`} target="_blank" rel="noreferrer">
                                        <FontAwesomeIcon icon={faExternalLinkAlt}/>
                                        <span className="ml-2">Create New Server</span>
                                    </a>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                            <div className="flex">
                                <TemplateCreator id={template.creator_id}/>
                            </div>
                            <div className="flex items-end justify-end">
                                <a className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md text-lg mr-2 hidden lg:inline"
                                   href="/view/?code={{ template.code }}" target="_blank">
                                    <FontAwesomeIcon icon={faEye}/>
                                    <span className="ml-2">Preview</span>
                                </a>
                                {user && user.id === template.creator_id ? (
                                    <div className="flex">
                                        <Link href={`/templates/${template.id}/edit`} passHref>
                                            <a className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-md text-lg mr-2"
                                               data-google-interstitial="false">
                                                <FontAwesomeIcon icon={faPen}/>
                                                <span className="ml-2">Edit</span>
                                            </a>
                                        </Link>
                                        <button className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md text-lg"
                                                type="button"
                                                onClick={handleDelete}>
                                            <FontAwesomeIcon icon={faTrash}/>
                                            <span className="ml-2">Delete</span>
                                        </button>
                                    </div>
                                ) : (
                                    <a className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md text-lg"
                                       href="/discord"
                                       data-google-interstitial="false"
                                       target="_blank">
                                        <FontAwesomeIcon icon={faExclamation}/>
                                        <span className="ml-2">Report</span>
                                    </a>
                                )}
                            </div>
                        </div>

                        <TemplatePreview id={template.id}/>
                    </div>
                </div>
            </div>
        </div>
    )
}