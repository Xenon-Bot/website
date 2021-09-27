import {createContext, useContext, useState, useEffect} from 'react'
import {useToken} from "./token";
import useApi from "../hooks/api";

const Context = createContext(false)

export const UserProvider = ({children}) => {
    const {data: user, error} = useApi({
        path: '/users/@me',
        requiresToken: true,
        redirectUnauthorized: false
    })

    return (
        <Context.Provider value={user}>
            {children}
        </Context.Provider>
    )
}

export function useUser() {
    return useContext(Context)
}