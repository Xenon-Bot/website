import {apiUrl} from "../api";
import useApi from "../hooks/api";
import ReactLoading from "react-loading";
import React, {useEffect} from "react";
import {useRouter} from "next/router";
import {useToken} from "../context/token";
import Head from "next/head";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";


export async function getServerSideProps({query, locale}) {
    if (!query.code) {
        return {
            redirect: {
                destination: apiUrl('/auth/redirect', true),
                permanent: false
            }
        }
    }

    return {
        ...(await serverSideTranslations(locale, ['common'])),
        props: {code: query.code}
    }
}

export default function Login({code, from}) {
    const router = useRouter()
    const [token, setToken] = useToken()

    const {data, error} = useApi({
        method: 'POST',
        path: '/auth/exchange',
        data: {code}
    })

    useEffect(() => {
        if (data) {
            setToken(data.token)
        }
    }, [data])

    if (error) {
        if (process.browser) {
            setTimeout(() => router.push('/login'), 3000)
        }
        return (
            <div className="my-20 text-center">
                <div className="text-5xl mb-5">Something went wrong ...</div>
                <div className="text-xl text-gray-300">We will try again in a few seconds.</div>
            </div>
        )
    }

    if (!data) {
        return (
            <div className="my-20 text-center">
                <div className="text-5xl mb-16">Logging you in ...</div>
                <ReactLoading type='spinningBubbles' color="#dbdbdb" height={128} width={100} className="mx-auto"/>
            </div>
        )
    }

    if (process.browser) {
        setTimeout(() => router.push('/'), 3000)
    }
    return (
        <div className="my-20 text-center">
            <Head>
                <title>Login | Xenon Bot</title>
            </Head>
            <div className="text-5xl mb-5">You are logged in!</div>
            <div className="text-xl text-gray-300">We will redirect you back in a few seconds.</div>
        </div>
    )
}