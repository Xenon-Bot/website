import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import Head from "next/head";
import TemplateFilters from "../../components/templates/TemplateFilters";
import TemplateCard from "../../components/templates/TemplateCard";
import useApi from "../../hooks/api";
import {useRouter} from "next/router";
import ReactLoading from 'react-loading';

export async function getStaticProps({locale}) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['templates'])),
        },
    };
}

export default function TemplateSearch() {
    const router = useRouter();
    const search = router.query['s'] ?? ''
    const tags = router.query['t'] ?? ''
    const language = router.query['l'] ?? ''

    const {data, error} = useApi({
        path: `/templates?limit=12&search=${search}&tags=${tags}&language=${language}`,
        requiresToken: false,
        depends: [search, tags, language]
    })

    let templateList
    if (!data) {
        templateList = (
            <ReactLoading type='bars' color="#dbdbdb" height={128} width={100} className="mx-auto my-10"/>
        )
    } else {
        templateList = (
            <div className="grid grid-cols-6 gap-5">
                {data.map(template => (
                    <div className="flex flex-col col-span-6 sm:col-span-3 lg:col-span-2" key={template.id}>
                        <TemplateCard data={template}/>
                    </div>
                ))}
            </div>
        )
    }

    return (
        <div>
            <Head>
                <title>Templates | Xenon Bot</title>
            </Head>
            <div className="bg-theme-darker px-3 md:px-5 py-10 grid justify-items-center">
                <div className="max-w-2xl text-center">
                    <h2 className="text-5xl font-bold mb-2">Discord Templates</h2>
                    <div className="font-thin text-lg text-gray-300 mb-10 px-3">
                        Find the best <span className="font-normal">templates</span> for your <span
                        className="font-normal">discord server</span>.
                    </div>
                    <TemplateFilters/>
                </div>
            </div>
            <div className="grid justify-items-center py-10 px-3 md:px-5">
                <div className="w-full xl:w-304">
                    {templateList}
                </div>
            </div>
        </div>
    )
}