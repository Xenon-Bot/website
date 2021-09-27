import {apiRequest} from "../../../api";
import {userAvatar, hasBitFlag} from "../../../util";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTools, faCropAlt, faStar} from "@fortawesome/free-solid-svg-icons";
import useApi from "../../../hooks/api";
import TemplateCard from "../../../components/templates/TemplateCard";
import ReactLoading from "react-loading";
import Head from "next/head";

export async function getServerSideProps({params, res}) {
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
            user: await resp.json()
        }
    }
}

export default function User({user}) {
    const {data: templates, error} = useApi({
        path: `/templates?creator=${user.id}`,
        depends: [user]
    })

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
                                <div
                                    className="flex cursor-pointer transition-all items-center group hover:bg-green-400 mr-3 rounded-md px-1 hover:px-2">
                                    <FontAwesomeIcon icon={faCropAlt}
                                                     className="text-green-400 group-hover:text-gray-100 my-1"
                                                     title="Template Creator"/>
                                    <div
                                        className="transition-all w-auto max-w-0 group-hover:max-w-sm text-gray-100 group-hover:block group-hover:pl-2 whitespace-nowrap truncate">Template
                                        Creator
                                    </div>
                                </div> : ''}
                            {hasBitFlag(user.internal_flags, 1) ?
                                <div
                                    className="flex cursor-pointer transition-all items-center group hover:bg-yellow-400 mr-3 rounded-md px-1 hover:px-2">
                                    <FontAwesomeIcon icon={faStar}
                                                     className="text-yellow-400 group-hover:text-gray-100 my-1"
                                                     title="Premium"/>
                                    <div
                                        className="transition-all w-auto max-w-0 group-hover:max-w-sm text-gray-100 group-hover:block group-hover:pl-2 whitespace-nowrap truncate">
                                        Premium
                                    </div>
                                </div> : ''}
                            {hasBitFlag(user.internal_flags, 2) ?
                                <div
                                    className="flex cursor-pointer transition-all items-center group hover:bg-blue-400 mr-3 rounded-md px-1 hover:px-2">
                                    <FontAwesomeIcon icon={faTools}
                                                     className="text-blue-400 group-hover:text-gray-100 my-1"
                                                     title="Staff"/>
                                    <div
                                        className="transition-all w-auto max-w-0 group-hover:max-w-sm text-gray-100 group-hover:block group-hover:pl-2 whitespace-nowrap truncate">
                                        Staff
                                    </div>
                                </div> : ''}
                        </div>
                    </div>
                </div>
                <div className="col-span-7 lg:col-span-5">
                    <h3 className="text-4xl mb-5">Server Templates</h3>
                    {templates ? (
                        templates.length ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                {templates.map(template => (
                                    <div className="flex flex-col" key={template.id}>
                                        <TemplateCard data={template}/>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-xl text-gray-400">This user does not have any templates yet.</div>
                        )
                    ) : (
                        <ReactLoading type='bars' color="#dbdbdb" height={128} width={100} className="mx-auto my-10"/>
                    )}
                </div>
            </div>
        </div>
    )
}