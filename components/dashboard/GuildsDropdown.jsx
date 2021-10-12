import {useGuilds} from "../../context/guilds";
import {useSelectedGuild} from "../../context/selectedGuild";
import {guildIcon, userAvatar} from "../../util";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown, faCropAlt, faSignOutAlt, faUser} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import {useState} from "react";

export default function GuildsDropdown() {
    const guilds = useGuilds()
    const [selectedGuild, setSelectedGuild] = useSelectedGuild()

    const [visible, setVisible] = useState(false)

    function hasGuildAccess(guild) {
        return guild.owner || ((guild.permissions & 8) === 8)
    }

    return (
        <div className="relative">
            <div className="flex items-center cursor-pointer max-w-64 truncate" onClick={() => setVisible(!visible)}>
                <img src={guildIcon(selectedGuild ?? {}, {size: 128})} className="w-10 h-10 rounded-full mr-2 bg-theme-dark flex-shrink-0" alt=""/>
                <div className="text-xl mr-3 truncate">{selectedGuild ? selectedGuild.name : 'Select Server'}</div>
                <FontAwesomeIcon icon={faChevronDown} className="text-sm text-gray-300"/>
            </div>
            <div
                className={`absolute py-1 bg-theme-light shadow-xl rounded-md right-0 mt-3 flex flex-col w-64 max-h-96 overflow-auto ${visible ? '' : 'hidden'}`}
                onClick={() => setVisible(false)}>
                {guilds ? guilds
                    .sort((a, b)=> hasGuildAccess(a) && !hasGuildAccess(b) ? 0 : 1)
                    .map(guild => (
                    <div className={`flex items-center px-3 py-2 ${!hasGuildAccess(guild) ? 'text-gray-400' : 'cursor-pointer hover:bg-theme-lighter'}`}
                         key={guild.id} onClick={() => hasGuildAccess(guild) ? setSelectedGuild(guild) : ''}>
                        <img src={guildIcon(guild, {size: 128})}
                             className="w-10 h-10 rounded-full mr-2 bg-theme-dark flex-shrink-0"
                             alt=""/>
                        <div className="text-xl mr-3 truncate">{guild.name}</div>
                    </div>
                )) : <div/>}
            </div>
        </div>
    )
}