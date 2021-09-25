import '../styles/globals.css'
import DefaultLayout from '../layouts/default'
import {appWithTranslation} from 'next-i18next';
import Head from 'next/head'

function MyApp({Component, pageProps}) {
    const getLayout = Component.getLayout || (
        page => <DefaultLayout>{page}</DefaultLayout>
    )

    return (
        <div>
            <Head>
                <title>Xenon Bot</title>
                <meta property="og:title" content="Xenon Bot" key="title" />
            </Head>
            {getLayout(<Component {...pageProps} />)}
        </div>
    )
}

export default appWithTranslation(MyApp)
