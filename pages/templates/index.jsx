import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import TemplateCard from "../../components/templates/TemplateCard";
import Head from "next/head";

export async function getStaticProps({locale}) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['templates'])),
        },
    };
}

export default function Templates() {
    return (
        <div>
            <Head>
                <title>Xenon Bot - Templates</title>
            </Head>
            <div className="bg-theme-darker px-5 py-10 grid justify-items-center">
                <div className="w-full xl:w-304">
                    <div className="max-w-2xl">
                        <h2 className="text-5xl font-bold mb-2">Discord Templates</h2>
                        <div className="font-thin text-lg text-gray-300 mb-10">
                            Find the best <span className="font-normal">templates</span> for your <span
                            className="font-normal">discord server</span>.
                        </div>
                        <form action="/templates" method="GET" className="flex text-xl">
                            <input type="text"
                                   className="bg-theme-dark rounded-l-lg px-5 py-3 placeholder-gray-500 font-thin flex-auto w-5"
                                   placeholder="What are you looking for?" name="search"/>
                            <button type="submit"
                                    className="bg-theme-light rounded-r-lg px-5 py-3 flex-initial font-normal">
                                Search
                            </button>
                        </form>
                        <div className="px-3 flex flex-wrap mt-3">
                            <a className="bg-theme-light px-2 py-1 rounded-md mr-2 mb-2"
                               href="/templates?tag=school">school</a>

                            <a className="bg-theme-light px-2 py-1 rounded-md mr-2 mb-2"
                               href="/templates?tag=gaming">gaming</a>

                            <a className="bg-theme-light px-2 py-1 rounded-md mr-2 mb-2"
                               href="/templates?tag=roleplay">roleplay</a>

                            <a className="bg-theme-light px-2 py-1 rounded-md mr-2 mb-2"
                               href="/templates?tag=development">development</a>

                            <a className="bg-theme-light px-2 py-1 rounded-md mr-2 mb-2"
                               href="/templates?tag=support">support</a>

                            <a className="bg-theme-light px-2 py-1 rounded-md mr-2 mb-2"
                               href="/templates?tag=community">community</a>

                            <a className="bg-theme-light px-2 py-1 rounded-md mr-2 mb-2"
                               href="/templates?tag=clan">clan</a>

                            <a className="bg-theme-light px-2 py-1 rounded-md mr-2 mb-2"
                               href="/templates?tag=meme">meme</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid justify-items-center py-10 px-5">
                <div className="w-full xl:w-304">
                    <div className="grid grid-cols-6 gap-5">
                        <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                            <TemplateCard data={{
                                name: 'Starter Templates',
                                description: 'Some cool starter template',
                                tags: ['roleplay', 'support'],
                                upvote_count: 10,
                                usage_count: 200
                            }}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}