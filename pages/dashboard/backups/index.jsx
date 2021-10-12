import DashboardLayout from "../../../layouts/dashboard";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import apiRequest from "../../../api";
import {useEffect, useState} from 'react'
import {useToken} from "../../../context/token";
import ReactLoading from "react-loading";
import Link from "next/link";
import {formatTimestamp} from "../../../util";
import {faCheck} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClock} from "@fortawesome/free-regular-svg-icons";
import CreateBackup from "../../../components/dashboard/backups/CreateBackup";
import ManageInterval from "../../../components/dashboard/backups/ManageInterval";
import {toast} from "react-toastify";

export async function getStaticProps({locale}) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['dashboard', 'common'])),
        },
    };
}

const PER_PAGE = 5

export default function DashboardBackups() {
    const [token] = useToken()

    const [reload, setReload] = useState(0)
    const [data, setData] = useState(null)
    const [page, setPage] = useState(1)
    const [selected, setSelected] = useState([])

    function toggleSelected(backupId) {
        if (selected.includes(backupId)) {
            setSelected(selected.filter(bid => bid !== backupId))
        } else {
            setSelected([backupId, ...selected])
        }
    }

    function handleDeleteSelected() {
        if (!selected.length) return
        const confirmed = confirm(`Are you sure that you want to delete ${selected.length} of your backups?`)
    }

    function handleDelete(backupId) {
        const confirmed = confirm(`Are you sure that you want to delete this backup?`)
        if (!confirmed) return

        apiRequest({
            method: 'DELETE',
            path: `/backups/${backupId}`,
            token
        })
            .then(resp => {
                if (resp.ok) {
                    setReload(reload + 1)
                    toast.success('The backup has been deleted')
                } else {
                    toast.error('Failed to delete this backup')
                }
            })
    }

    function handleNewBackup() {
        setPage(1)
        setReload(reload + 1)
    }

    useEffect(() => {
        if (!token) return

        setData(null)
        apiRequest({
            path: `/backups?limit=${PER_PAGE}&skip=${(page - 1) * PER_PAGE}`,
            token
        })
            .then(async resp => {
                const data = await resp.json()
                setData(data)
            })
    }, [token, page, reload])

    let backupList
    if (!data) {
        backupList = (
            <ReactLoading type='bars' color="#dbdbdb" height={128} width={100} className="mx-auto my-10"/>
        )
    } else {
        let pageCount = Math.ceil(data.total / PER_PAGE)
        if (pageCount === 0) pageCount = 1

        backupList = (
            <div>
                <div className="mb-5">
                    {data.backups.map(backup => (
                        <div className="mb-3 flex items-center" key={backup.id}>
                            <div className="flex-initial mr-6 ml-3">
                                <button
                                    className={`w-5 h-5 rounded-full flex items-center justify-center ${selected.includes(backup.id) ? 'bg-blue-400' : 'bg-gray-300'}`}
                                    onClick={() => toggleSelected(backup.id)}>
                                    <FontAwesomeIcon icon={faCheck}
                                                     className={`text-xs ${!selected.includes(backup.id) ? 'hidden' : ''}`}/>
                                </button>
                            </div>
                            <div
                                className="px-5 py-4 bg-theme-darker rounded-md grid grid-cols-2 md:grid-cols-3 flex-auto">
                                <div className="mr-5 flex-auto">
                                    <div className="text-lg font-bold truncate">{backup.guild_name}</div>
                                    <div className="text-gray-400">{backup.id}</div>
                                </div>
                                <div
                                    className="text-lg flex-auto text-gray-300 flex items-center flex items-center">
                                    <div className="mr-3">{formatTimestamp(backup.timestamp)}</div>
                                    {backup.interval ? <FontAwesomeIcon icon={faClock} className="text-blue-300"
                                                                        title="Automated Backup"/> : ''}
                                </div>
                                <div className="flex items-center md:justify-end col-span-2 md:col-span-1 mt-3 md:mt-0">
                                    <div className="flex items-center md:justify-end flex-auto">
                                        <button
                                            className="px-3 py-2 rounded-md bg-red-400 hover:bg-red-300 mr-2 text-black flex-auto md:flex-initial text-center"
                                            onClick={() => handleDelete(backup.id)}>Delete
                                        </button>
                                        <Link href={`/dashboard/backups/${backup.id}`} passHref>
                                            <a className="block px-3 py-2 rounded-md bg-theme-light hover:bg-theme-lighter flex-auto md:flex-initial text-center">View</a>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center items-center">
                    <button
                        className={`bg-theme-dark px-3 py-2 rounded-l-md hover:bg-theme-light ${page === 1 ? 'hidden' : ''}`}
                        onClick={() => setPage(page - 1)}>Previous
                    </button>
                    <div
                        className={`bg-theme-darker px-3 py-2 ${page === 1 ? 'rounded-l-md' : ''} ${page >= pageCount ? 'rounded-r-md' : ''}`}>Page {page} of {pageCount}</div>
                    <button
                        className={`bg-theme-dark px-3 py-2 rounded-r-md hover:bg-theme-light ${page >= pageCount ? 'hidden' : ''}`}
                        onClick={() => setPage(page + 1)}>Next
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div>
            <div className="mb-3">
                <div className="text-2xl font-bold">Create a Backup</div>
                <div className="font-thin text-gray-300">Manually create a backup of the selected server</div>
            </div>
            <div className="mb-10 p-5 bg-theme-darker rounded-md">
                <CreateBackup newBackup={handleNewBackup}/>
            </div>

            <div className="mb-3">
                <div className="text-2xl font-bold">Automated Backups</div>
                <div className="font-thin text-gray-300">Setup automated backups for the selected server</div>
            </div>
            <div className="mb-10 p-5 bg-theme-darker rounded-md">
                <ManageInterval/>
            </div>

            <div className="flex flex-col lg:flex-row mb-5 lg:items-center">
                <div className="flex-auto mb-3 lg:mb-0">
                    <div>
                        <div className="text-2xl font-bold">Your Backups</div>
                        <div className="font-thin text-gray-300">
                            All your backups across all servers
                        </div>
                    </div>
                </div>
                <div className="flex flex-initial">
                    <button
                        className={`block bg-red-400 px-3 py-2 rounded-md text-black text-lg flex-auto mr-3 text-center hover:bg-red-300 ${!selected.length ? 'hidden' : ''}`}
                        onClick={handleDeleteSelected}>
                        Delete Selected
                    </button>
                </div>
            </div>
            {backupList}
        </div>
    )
}

DashboardBackups.getLayout = page => {
    return <DashboardLayout>{page}</DashboardLayout>
}