import Head from "next/head";
import {useEffect} from "react";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

export async function getStaticProps({locale}) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        },
    };
}

export default function Privacy() {
    useEffect(() => {
        if (!process.browser) return

        const script = document.createElement("script");
        script.type = "text/javascript";
        script.innerHTML =
            '(function (w,d) {var loader = function () {var s = d.createElement("script"), tag = d.getElementsByTagName("script")[0]; s.src="https://cdn.iubenda.com/iubenda.js"; tag.parentNode.insertBefore(s,tag);}; if(w.addEventListener){w.addEventListener("load", loader, false);}else if(w.attachEvent){w.attachEvent("onload", loader);}else{w.onload = loader;}})(window, document);';
        script.async = true;

        if (document.body != null) document.body.appendChild(script);
    })

    return (
        <div>
            <Head>
                <title>Privacy Policy | Xenon Bot</title>
            </Head>
            <div className="grid justify-items-center">
                <div className="w-full xl:w-304 my-10">
                    <h3 className="text-5xl mb-5">Privacy Policy</h3>
                    <div className="bg-theme-darker rounded-md p-5">
                        <a href="https://www.iubenda.com/privacy-policy/88601334"
                           className="iubenda-black no-brand iubenda-embed iub-no-markup iub-body-embed"
                           title="Privacy Policy">Privacy Policy</a>
                    </div>
                </div>
            </div>
        </div>
    )
}