import {createContext, useContext, useState, useEffect} from 'react'
import useApi from "../hooks/api";

const Context = createContext(false)

export const TierProvider = ({children}) => {
    const {data: tier, error} = useApi({
        path: '/users/@me/tier',
        requiresToken: true,
        redirectUnauthorized: false
    })

    return (
        <Context.Provider value={tier}>
            {children}
        </Context.Provider>
    )
}

export function useTier() {
    return useContext(Context)
}