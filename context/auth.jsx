import {createContext, useContext, useReducer} from 'react'

const initialState = {
    authenticated: false,
    token: null,
    user: null,
    guilds: null
}

const Reducer = (state, action) => {
    switch (action) {
        default:
            return state
    }
}

const Context = createContext(initialState)

export const AuthProvider = ({children}) => {
    const [state, dispatch] = useReducer(Reducer, initialState)
    return (
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    )
}

export function useAuth() {
    return useContext(Context)
}