import DashboardLayout from "../../../../layouts/dashboard";
import {useToken} from "../../../../context/token";
import {useEffect, useState} from "react";
import apiRequest from "../../../../api";
import {toast} from "react-toastify";
import {useRouter} from "next/router";
import ReactLoading from "react-loading";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {makeRoleList, makeChannelList} from "../../../../components/templates/TemplatePreview";

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

    return error ? (
        <div className="text-center text-xl">Unknown Backup</div>
    ) : backup ? (
        <div>
            <div className="bg-theme-darker p-5 rounded-md mb-5">

            </div>
            {data ? (
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
            ) : ''}
        </div>
    ) : (
        <ReactLoading type='bars' color="#dbdbdb" height={128} width={100} className="mx-auto my-10"/>
    )
}

DashboardBackup.getLayout = page => {
    return <DashboardLayout>{page}</DashboardLayout>
}