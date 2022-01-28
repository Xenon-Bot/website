import DashboardLayout from "../../../../layouts/dashboard";
import {useToken} from "../../../../context/token";
import {useEffect, useState} from "react";
import apiRequest from "../../../../api";
import {toast} from "react-toastify";
import {useRouter} from "next/router";
import ReactLoading from "react-loading";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {makeRoleList, makeChannelList} from "../../../../components/templates/TemplatePreview";
import {guildIcon} from "../../../../util";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHashtag, faTag, faUser, faUserTimes, faCommentDots, faWeightHanging} from "@fortawesome/free-solid-svg-icons";
import {faClock} from "@fortawesome/free-regular-svg-icons";
import Link from "next/link";

export async function getServerSideProps({locale}) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['dashboard', 'common'])),
        },
    };
}

export default function DashboardBackup() {
    const [token] = useToken()
    const router = useRouter()

    const [backup, setBackup] = useState(null)
    const [data, setData] = useState(null)
    const [error, setError] = useState(false)

    useEffect(() => {
        if (!token) return
        if (!router.isReady) return

        apiRequest({
            path: `/backups/${router.query.bid}`,
            token
        })
            .then(async resp => {
                if (!resp.ok) {
                    toast.error('Unknown backup')
                    setError(true)
                    return
                }

                setError(false)
                setBackup(await resp.json())
            })

        apiRequest({
            path: `/backups/${router.query.bid}/data`,
            token
        })
            .then(async resp => {
                if (!resp.ok) {
                    toast.error('Unknown backup')
                    setError(true)
                    return
                }

                setError(false)
                setData(await resp.json())
            })
    }, [token, router])

    function handleDelete() {
        const confirmed = confirm(`Are you sure that you want to delete this backup?`)
        if (!confirmed) return

        apiRequest({
            method: 'DELETE',
            path: `/backups/${backup.id}`,
            token
        })
            .then(resp => {
                if (resp.ok) {
                    toast.success('The backup has been deleted')
                    setTimeout(() => router.push('/dashboard/backups'), 2000)
                } else {
                    toast.error('Failed to delete this backup')
                }
            })
    }

    return error ? (
        <div className="text-center text-xl">Unknown Backup</div>
    ) : backup && data ? (
        <div>
            <div className="bg-theme-darker p-5 md:p-8 rounded-md mb-5 flex flex-col lg:flex-row">
                <div className="lg:mr-10 mb-8 lg:mb-0 flex-shrink-0">
                    <img src={guildIcon(data, {size: 512})} alt=""
                         className="rounded-full w-36 h-36 bg-theme-dark mx-auto"/>
                </div>
                <div className="flex-auto overflow-hidden">
                    <div className="text-4xl font-bold truncate text-center lg:text-left">{backup.guild_name}</div>
                    <div className="text-gray-400 mb-8 text-center lg:text-left text-xl">{backup.id}</div>
                    <div
                        className="mb-10 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                        <div className="flex text-lg items-center">
                            <div
                                className="h-16 w-16 bg-theme-dark flex items-center justify-center rounded-full mr-3 flex-initial">
                                <FontAwesomeIcon icon={faHashtag} className="text-4xl"/>
                            </div>
                            <div className="flex-auto">
                                <div className="text-lg text-gray-400 font-thin">Channel Count</div>
                                <div className="text-xl">250</div>
                            </div>
                        </div>
                        <div className="flex text-lg items-center">
                            <div
                                className="h-16 w-16 bg-theme-dark flex items-center justify-center rounded-full mr-3 flex-initial">
                                <FontAwesomeIcon icon={faTag} className="text-3xl"/>
                            </div>
                            <div className="flex-auto">
                                <div className="text-lg text-gray-400 font-thin">Role Count</div>
                                <div className="text-xl">250</div>
                            </div>
                        </div>
                        <div className="flex text-lg items-center">
                            <div
                                className="h-16 w-16 bg-theme-dark flex items-center justify-center rounded-full mr-3 flex-initial">
                                <FontAwesomeIcon icon={faUser} className="text-3xl"/>
                            </div>
                            <div className="flex-auto">
                                <div className="text-lg text-gray-400 font-thin">Member Count</div>
                                <div className="text-xl">250</div>
                            </div>
                        </div>
                        <div className="flex text-lg items-center">
                            <div
                                className="h-16 w-16 bg-theme-dark flex items-center justify-center rounded-full mr-3 flex-initial">
                                <FontAwesomeIcon icon={faUserTimes} className="text-3xl"/>
                            </div>
                            <div className="flex-auto">
                                <div className="text-lg text-gray-400 font-thin">Ban Count</div>
                                <div className="text-xl">250</div>
                            </div>
                        </div>
                        <div className="flex text-lg items-center">
                            <div
                                className="h-16 w-16 bg-theme-dark flex items-center justify-center rounded-full mr-3 flex-initial">
                                <FontAwesomeIcon icon={faCommentDots} className="text-3xl"/>
                            </div>
                            <div className="flex-auto">
                                <div className="text-lg text-gray-400 font-thin">Message Count</div>
                                <div className="text-xl">250</div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center">
                        <div className="flex flex-auto mb-5 sm:mb-0">
                            <div
                                className={`flex bg-theme-dark rounded-full text-xl items-center pl-2 pr-4 py-1 mr-3 ${backup.interval ? '' : 'hidden'}`}>
                                <FontAwesomeIcon icon={faClock} className="mr-3"/>
                                <div className="font-thin text-gray-300">Automated</div>
                            </div>
                            <div
                                className={`flex bg-theme-dark rounded-full text-xl items-center pl-2 pr-4 py-1 mr-3 ${backup.large ? '' : 'hidden'}`}>
                                <FontAwesomeIcon icon={faWeightHanging} className="mr-3"/>
                                <div className="font-hin text-gray-300">Large</div>
                            </div>
                        </div>
                        <div className="flex-initial text-lg flex items-center">
                            <button
                                className="bg-red-400 hover:bg-red-300 text-black px-3 py-2 rounded-md mr-3" onClick={handleDelete}>Delete
                            </button>
                            <Link href={`/dashboard/backups/${backup.id}/load`} passHref>
                                <a className="block bg-blue-400 hover:bg-blue-300 text-black px-3 py-2 rounded-md">Load</a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-5">
                <div>
                    <div className="bg-theme-darker p-3 rounded-md flex flex-col">
                        {makeChannelList(data.channels)}
                    </div>
                </div>
                <div>
                    <div className="bg-theme-darker p-3 rounded-md flex flex-row flex-wrap">
                        {makeRoleList(data.roles)}
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <ReactLoading type='bars' color="#dbdbdb" height={128} width={100} className="mx-auto my-10"/>
    )
}

DashboardBackup.getLayout = page => {
    return <DashboardLayout>{page}</DashboardLayout>
}