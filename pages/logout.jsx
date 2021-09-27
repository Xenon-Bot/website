import {useToken} from "../context/token";
import React, {useEffect} from "react";
import {useRouter} from "next/router";
import Head from "next/head";

export default function Logout() {
    const [token, setToken] = useToken()
    const router = useRouter()

    useEffect(() => {
        setToken(null)
    })

    setTimeout(() => router.push('/'), 3000)
    return (
        <div className="my-20 text-center">
            <Head>
                <title>Logout | Xenon Bot</title>
            </Head>
            <div className="text-5xl mb-5">You have been logged out!</div>
            <div className="text-xl text-gray-300">We will redirect you back in a few seconds.</div>
        </div>
    )
}