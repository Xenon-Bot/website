import {createContext, useContext, useState, useEffect} from 'react'
import useApi from "../hooks/api";

const Context = createContext([null, null])

export const GuildsProvider = ({children}) => {
    const {data: guilds, error} = useApi({
        path: '/guilds',
        requiresToken: true,
        redirectUnauthorized: false
    })

    return (
        <Context.Provider value={guilds}>
            {children}
        </Context.Provider>
    )
}

export function useGuilds() {
    return useContext(Context)
}