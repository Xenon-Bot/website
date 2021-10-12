import {createContext, useContext, useState, useEffect} from 'react'
import {useGuilds} from "./guilds";

const Context = createContext([null, null])

export const SelectedGuildProvider = ({children}) => {
    const guilds = useGuilds()
    const [guildId, setGuildId] = useState(null)

    let selectedGuild = null
    if (guilds) {
        selectedGuild = guilds.find(g => g.id === guildId)
    }

    useEffect(() => {
        if (process.browser) {
            const savedGuildId = localStorage.getItem('selectedGuild')
            if (!guildId && savedGuildId) {
                setGuildId(savedGuildId)
            }
        }
    }, [])

    function setSelectedGuild(guild) {
        localStorage.setItem('selectedGuild', guild.id)
        setGuildId(guild.id)
    }

    return (
        <Context.Provider value={[selectedGuild, setSelectedGuild]}>
            {children}
        </Context.Provider>
    )
}

export function useSelectedGuild() {
    return useContext(Context)
}