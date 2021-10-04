import Document, {Html, Head, Main, NextScript} from 'next/document'

class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    {/* Google Analytics */}
                    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-148005769-2"/>
                    <script dangerouslySetInnerHTML={{
                        __html: `
                            window.dataLayer = window.dataLayer || [];
                            function gtag() {
                                dataLayer.push(arguments);
                            }
                            gtag('js', new Date());
                            gtag('config', 'UA-148005769-2');
                        `
                    }}/>

                    {/* CF Analytics */}
                    <script defer src='https://static.cloudflareinsights.com/beacon.min.js'
                            data-cf-beacon='{"token": "2332cbd67f8c4cea84302d71b7fc95c4"}'/>

                    {/* NitroPay */}
                    <script dangerouslySetInnerHTML={{
                        __html: `
                            window['nitroAds'] = window['nitroAds'] || {
                                createAd: function () {
                                    window.nitroAds.queue.push(["createAd", arguments])
                                }, queue: []
                            };
                        `
                    }}/>
                    <script async src="https://s.nitropay.com/ads-593.js"/>
                </Head>
                <body>
                <Main/>
                <NextScript/>
                </body>
            </Html>
        )
    }
}

export default MyDocument
