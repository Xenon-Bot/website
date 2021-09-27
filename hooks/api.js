import useSWRImmutable from 'swr/immutable'
import {useEffect, useState} from 'react'

import apiRequest from "../api";
import {useRouter} from "next/router";
import {useToken} from "../context/token";

export default function useApi({redirectUnauthorized = true, requiresToken = false, depends, ...args}) {
    const [result, setResult] = useState({data: null, error: null})
    const router = useRouter()

    const [token, setToken] = useToken()

    depends = depends ?? []
    if (requiresToken) {
        depends.push(token)
    }

    useEffect(() => {
        if (!token && requiresToken) {
            if (redirectUnauthorized) {
                router.push('/login')
                return
            }
            return
        }

        apiRequest({...args, token})
            .then(resp => {
                if (resp.status === 401) {
                    setToken(null)
                    setResult({data: null, error: resp})
                    if (redirectUnauthorized) router.push('/login')
                } else if (resp.status >= 300 || resp.status < 200) {
                    setResult({data: null, error: resp})
                } else {
                    resp.json()
                        .then(res => setResult({data: res, error: null}))
                }
            })
    }, depends)

    return result
}