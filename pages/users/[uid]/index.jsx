import {apiRequest} from "../../../api";
import {userAvatar, hasBitFlag} from "../../../util";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTools, faCropAlt, faStar, faDove} from "@fortawesome/free-solid-svg-icons";
import useApi from "../../../hooks/api";
import TemplateCard from "../../../components/templates/TemplateCard";
import ReactLoading from "react-loading";
import Head from "next/head";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useTranslation} from "next-i18next";
import Tooltip from "../../../components/Tooltip";

export async function getServerSideProps({params, res, locale}) {
    res.setHeader(
        'Cache-Control',
        'public, s-maxage=60, stale-while-revalidate=120'
    )

    const resp = await apiRequest({
        path: `/users/${params.uid}`
    })

    if (resp.status === 404) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            ...(await serverSideTranslations(locale, ['users', 'common'])),
            user: await resp.json()
        }
    }
}

export default function User({user}) {
    const {t} = useTranslation('users')

    const {data, error} = useApi({
        path: `/templates?creator=${user.id}`,
        depends: [user]
    }, [user.id])

    return (
        <div className="grid justify-items-center mt-10 mb-20 px-3 md:px-5">
            <Head>
                <title>{user.username} | Xenon Bot</title>
                <meta property="og:title" key="og_title" content={user.username}/>
                <meta property="twitter:title" key="tw_title" content={user.username}/>
                <meta property="og:image" key="og_image" content={userAvatar(user, {size: 512})}/>
                <meta property="twitter:image:src" key="tw_image" content={userAvatar(user, {size: 512})}/>
            </Head>
            <div className="w-full xl:w-304 grid grid-cols-7 gap-10">
                <div className="col-span-7 lg:col-span-2">
                    <div className="text-center bg-theme-darker rounded-md p-5">
                        <img src={userAvatar(user, {size: 512})} alt="User Avatar"
                             className="rounded-full w-48 h-48 mx-auto mb-5"/>
                        <div className="mb-3 overflow-hidden truncate">
                            <span className="font-bold text-3xl">{user.username}</span>
                            <span className="text-2xl text-gray-400">#{user.discriminator}</span>
                        </div>
                        <div className="text-xl flex flex-wrap justify-center items-center">
                            {hasBitFlag(user.internal_flags, 0) ?
                                <Tooltip title="Template Creator">
                                    <FontAwesomeIcon icon={faCropAlt}
                                                     className="text-green-400 my-1 mr-3"/>
                                </Tooltip> : ''}
                            {user.tier ?
                                <Tooltip title="Premium">
                                    <FontAwesomeIcon icon={faStar}
                                                     className="text-yellow-400 my-1 mr-3"/>
                                </Tooltip> : ''}
                            {hasBitFlag(user.internal_flags, 3) ?
                                <Tooltip title="Early Bird">
                                    <FontAwesomeIcon icon={faDove}
                                                     className="text-red-400 my-1 mr-3"/>
                                </Tooltip> : ''}
                            {hasBitFlag(user.internal_flags, 2) ?
                                <Tooltip title="Staff">
                                    <FontAwesomeIcon icon={faTools}
                                                     className="text-blue-400 my-1 mr-3"/>
                                </Tooltip> : ''}
                        </div>
                    </div>
                </div>
                <div className="col-span-7 lg:col-span-5">
                    <h3 className="text-4xl mb-5">Server Templates</h3>
                    {data ? (
                        data.total ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                {data.templates.map(template => (
                                    <div className="flex flex-col" key={template.id}>
                                        <TemplateCard data={template}/>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-xl text-gray-400">{t('noTemplates')}</div>
                        )
                    ) : (
                        <ReactLoading type='bars' color="#dbdbdb" height={128} width={100} className="mx-auto my-10"/>
                    )}
                </div>
            </div>
        </div>
    )
}