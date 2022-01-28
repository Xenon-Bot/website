import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import apiRequest from "../../../api";
import FormsLayout from "../../../layouts/forms";
import React, {useState} from "react";
import {toast} from "react-toastify";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown, faVolumeUp} from "@fortawesome/free-solid-svg-icons";

export async function getServerSideProps({params, locale}) {
    const resp = await apiRequest({path: `/forms/${params.fid}`})
    if (resp.status === 404) {
        return {
            props: {},
            notFound: true
        }
    }

    return {
        props: {
            ...(await serverSideTranslations(locale, ['templates', 'common'])),
            form: await resp.json(),
            formId: params.fid
        },
    }
}

function roleColor({color}) {
    if (color === 0) {
        return "#000"
    } else {
        return `#${color.toString(16)}`;
    }
}

export function makeChannelList(channels, excluded, toggleExcluded) {
    const result = []

    const ChannelTypes = {
        GUILD_TEXT: 0,
        DM: 1,
        GUILD_VOICE: 2,
        GROUP_DM: 3,
        GUILD_CATEGORY: 4,
        GUILD_NEWS: 5,
        GUILD_STORE: 6
    };

    const noParent = channels
        .filter(c => !c.parent_id && c.type !== ChannelTypes.GUILD_CATEGORY)
        .sort((a, b) => a.type > b.type ? 1 : a.type < b.type ? -1 : a.position > b.position)

    for (let channel of noParent) {
        if (channel.type === ChannelTypes.GUILD_VOICE) {
            result.push(
                <div className="pl-5 flex items-center" key={channel.id}>
                    <input type="checkbox" checked={!excluded.includes(channel.id)}
                           onChange={() => toggleExcluded(channel.id)}
                           className="w-5 h-5 mr-2"/>
                    <div>{channel.name}</div>
                </div>
            )
        } else {
            result.push(
                <div className="pl-5 flex items-center" key={channel.id}>
                    <input type="checkbox" checked={!excluded.includes(channel.id)}
                           onChange={() => toggleExcluded(channel.id)}
                           className="w-5 h-5 mr-2"/>
                    <div className="align-middle name">{channel.name}</div>
                </div>
            )
        }
    }

    const categories = channels
        .filter(c => c.type === ChannelTypes.GUILD_CATEGORY)
        .sort((a, b) => a.type > b.type)

    for (let channel of categories) {
        result.push(
            <div className="uppercase font-bold pb-2 pt-4 flex items-center" key={channel.id}>
                <input type="checkbox" checked={!excluded.includes(channel.id)}
                           onChange={() => toggleExcluded(channel.id)}
                           className="w-5 h-5 mr-2"/>
                <div>{channel.name}</div>
            </div>
        )

        const children = channels
            .filter(c => c.parent_id && c.parent_id === channel.id)
            .sort((a, b) => a.type > b.type ? 1 : a.type < b.type ? -1 : a.position > b.position)

        for (let child of children) {
            if (child.type === ChannelTypes.GUILD_VOICE) {
                result.push(
                    <div className="pl-5 flex items-center" key={child.id}>
                        <input type="checkbox" checked={!excluded.includes(child.id)}
                           onChange={() => toggleExcluded(child.id)}
                           className="w-5 h-5 mr-2"/>
                        <div>{child.name}</div>
                    </div>
                )
            } else {
                result.push(
                    <div className="pl-5 flex items-center" key={child.id}>
                        <input type="checkbox" checked={!excluded.includes(child.id)}
                           onChange={() => toggleExcluded(child.id)}
                           className="w-5 h-5 mr-2"/>
                        <div className="align-middle name">{child.name}</div>
                    </div>
                )
            }
        }
    }

    return result
}

export default function AdvancedLoadOptionsForm({formId, form}) {
    const {guild, backup} = form.meta
    // guild.roles.sort((a, b) => a.position < b.position)

    const [excludeDelete, setExcludeDelete] = useState(form.data?.exclude_delete_ids || [])
    const [excludeLoad, setExcludeLoad] = useState(form.data?.exclude_load_ids || [])

    function toggleExcludeDelete(id) {
        if (excludeDelete.includes(id)) {
            setExcludeDelete(excludeDelete.filter(a => a !== id))
        } else {
            setExcludeDelete([...excludeDelete, id])
        }
    }

    function toggleExcludeLoad(id) {
        if (excludeLoad.includes(id)) {
            setExcludeLoad(excludeLoad.filter(a => a !== id))
        } else {
            setExcludeLoad([...excludeLoad, id])
        }
    }

    async function handleSave() {
        const resp = await apiRequest({
            method: "PUT", path: `/forms/${formId}`, data: {
                exclude_delete_ids: excludeDelete,
                exclude_load_ids: excludeLoad
            }
        })
        if (resp.ok) {
            toast.success("Changes have been saved! You can now continue in Discord.")
        } else if (resp.status === 404) {
            toast.error("This page has expired, please run the load command on discord again.")
        } else {
            toast.error("There was a problem while trying to save the changes.")
        }
    }

    return (
        <div className="flex justify-center mt-20 mb-10 px-3 md:px-5">
            <div className="w-full xl:w-256">
                <div className="mb-4">
                    <div className="text-3xl mb-1">Advanced Loading Options</div>
                    <div className="text-gray-300">You are editing advanced loading options. This page is only valid for
                        up to 10 minutes.
                    </div>
                </div>
                <div className="bg-theme-darker rounded-lg py-3 px-2 px-4 mb-3">
                    <div className="text-xl mb-3 text-gray-200">Delete the following:</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-theme-dark p-3 rounded-md flex flex-col space-y-1">
                            {guild.roles.filter(r => !r.managed && r.id !== guild.id).map(role => (
                                <div key={role.id} className="flex space-x-2 items-center">
                                    <input type="checkbox" checked={!excludeDelete.includes(role.id)}
                                           onChange={() => toggleExcludeDelete(role.id)}
                                           className="w-5 h-5"/>
                                    <div style={{color: roleColor(role)}}>{role.name}</div>
                                </div>
                            ))}
                        </div>
                        <div className="bg-theme-dark p-3 rounded-md flex flex-col space-y-1">
                            {makeChannelList(guild.channels, excludeDelete, toggleExcludeDelete)}
                        </div>
                    </div>
                </div>
                <div className="bg-theme-darker rounded-lg py-3 px-2 px-4 mb-4">
                    <div className="text-xl mb-3 text-gray-200">Load the following:</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-theme-dark p-3 rounded-md flex flex-col space-y-1">
                            {backup.roles.map(role => (
                                <div key={role.id} className="flex space-x-2 items-center">
                                    <input type="checkbox" checked={!excludeLoad.includes(role.id)}
                                           onChange={() => toggleExcludeLoad(role.id)}
                                           className="w-5 h-5"/>
                                    <div style={{color: roleColor(role)}}>{role.name}</div>
                                </div>
                            ))}
                        </div>
                        <div className="bg-theme-dark p-3 rounded-md flex flex-col space-y-1">
                            {makeChannelList(guild.channels, excludeLoad, toggleExcludeLoad)}
                        </div>
                    </div>
                </div>
                <div className="flex justify-end">
                    <button className="bg-green-500 hover:bg-green-600 px-3 py-2 rounded-md" onClick={handleSave}>
                        Save Options
                    </button>
                </div>
            </div>
        </div>
    )
}

AdvancedLoadOptionsForm.getLayout = page => {
    return <FormsLayout>{page}</FormsLayout>
}