import '../styles/globals.css'
import DefaultLayout from '../layouts/default'
import {appWithTranslation} from 'next-i18next';
import Head from 'next/head'
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify';
import {useEffect} from 'react'

function MyApp({Component, pageProps}) {
    const getLayout = Component.getLayout || (
        page => <DefaultLayout>{page}</DefaultLayout>
    )

    useEffect(() => {
        document.querySelector("body").classList.add("bg-theme-darkest")
    });

    return (
        <div>
            <Head>
                <title>Xenon Bot - Discord Backups and Templates</title>
                <meta name="description"
                      content="Backup, archive, copy, clone or synchronize your discord server and take advantage of hundreds of free templates."
                      key="description"/>
                <meta name="theme-color" content="#60a5fa" key="color"/>
                <meta property="og:title" content="Xenon Bot - Discord Backups and Templates" key="og_title"/>
                <meta property="og:description" key="og_description"
                      content="Use Xenon Bot to Backup, archive, copy, clone or synchronize your discord server and take advantage of hundreds of free templates."/>
                <meta property="og:image" content="https://xenon.bot/logo-big.png" key="og_image"/>
                <meta property="og:site_name" content="xenon.bot" key="og_site_name"/>
                <meta property="twitter:site" content="@xenon_bot"/>
                <meta property="twitter:creator" content="@merlin_fuchs"/>
            </Head>
            {getLayout(<Component {...pageProps} />)}
            <ToastContainer theme="colored"/>
        </div>
    )
}

export default appWithTranslation(MyApp)
