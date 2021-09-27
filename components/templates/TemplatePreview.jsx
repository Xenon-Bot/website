import useApi from "../../hooks/api";
import ReactLoading from "react-loading";
import styles from './TemplatePreview.module.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown, faVolumeUp} from "@fortawesome/free-solid-svg-icons";
import React from "react";

function makeChannelList(channels) {
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

    for (let channel of channels) {
        if (channel.type === ChannelTypes.GUILD_CATEGORY) {
            result.push(
                <div className="uppercase font-bold pb-2 pt-4 flex items-center" key={channel.id}>
                    <FontAwesomeIcon icon={faChevronDown} className="mr-2"/>
                    <div>{channel.name}</div>
                </div>
            )
        } else if (channel.type === ChannelTypes.GUILD_VOICE) {
            result.push(
                <div className="pl-5 flex items-center" key={channel.id}>
                    <FontAwesomeIcon icon={faVolumeUp} className="mr-2"/>
                    <div>{channel.name}</div>
                </div>
            )
        } else {
            result.push(
                <div className="pl-5 flex items-center" key={channel.id}>
                    <div className="text-lg mr-2">#</div>
                    <div className="align-middle name">{channel.name}</div>
                </div>
            )
        }
    }

    return result
}

function makeRoleList(roles) {
    const result = []
    for (let role of roles.slice(1).reverse()) {
        let color
        if (role.color === 0) {
            color = "#000"
        } else {
            color = `#${role.color.toString(16)}`;
        }

        result.push(
            <div className="flex items-center flex-initial border-2 rounded-full m-1" style={{'borderColor': color, 'padding': '2px 10px'}} key={role.id}>
                <div style={{'backgroundColor': color}} className="w-4 h-4 rounded-full mr-2"/>
                <div>{role.name}</div>
            </div>
        );
    }

    return result
}

export default function TemplatePreview({id}) {
    const {data, error} = useApi({
        path: `/templates/${id}/structure`,
        requiresToken: false,
        depends: [id]
    })

    if (error) {
        return <div className="text-center text-xl my-5">Can&apos;t load the server structure for this template.</div>
    }
    if (!data) {
        return <ReactLoading type='bars' color="#dbdbdb" height={128} width={100} className="my-10 mx-auto"/>
    }

    const channelList = makeChannelList(data.channels)
    const roleList = makeRoleList(data.roles)

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
                <div className="bg-theme-dark p-3 rounded-md flex flex-col">
                    {channelList}
                </div>
            </div>
            <div>
                <div className="bg-theme-dark p-3 rounded-md flex flex-row flex-wrap">
                    {roleList}
                </div>
            </div>
        </div>
    )
}