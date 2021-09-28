import Head from "next/head";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

export async function getStaticProps({locale}) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        },
    };
}

export default function Contact() {
    return (
        <div>
            <Head>
                <title>Contact | Xenon Bot</title>
            </Head>
            <div className="grid justify-items-center px-3 md:px-5">
                <div className="w-full xl:w-304 my-10">
                    <h3 className="text-5xl mb-5">Contact Information</h3>
                    <div className="bg-theme-darker rounded-md p-3 md:p-5 text-lg">
                        <div className="text-xl">
                            <div>Merlin Fuchs</div>
                            <div>Postbox 540919</div>
                            <div className="mb-5">11516 Berlin, Germany</div>
                            <div>Email: <span className="text-blue-400">contact (at) xenon (dot) bot</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}