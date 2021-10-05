import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import Head from "next/head";
import TemplateFilters from "../../components/templates/TemplateFilters";
import TemplateCard from "../../components/templates/TemplateCard";
import useApi from "../../hooks/api";
import {useRouter} from "next/router";
import ReactLoading from 'react-loading';
import {useEffect, useState} from "react";
import apiRequest from "../../api";
import {useToken} from "../../context/token";

export async function getStaticProps({locale}) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['templates', 'common'])),
        },
    };
}

const PER_PAGE = 12

export default function TemplateSearch() {
    const router = useRouter();

    const search = router.query['s'] ?? ''
    const tags = router.query['t'] ?? ''
    const language = router.query['l'] ?? ''
    const order = router.query['o'] ?? ''

    let page = parseInt(router.query['p'] ?? '1')
    if (isNaN(page) || page < 1) page = 1

    function handlePageChange(newPage) {
        router.push(`/templates/search?s=${search}&t=${tags}&l=${language}&p=${newPage}`)
    }

    const [data, setData] = useState(null)

    useEffect(() => {
        if (!router.isReady) return

        apiRequest({
            path: `/templates?limit=${PER_PAGE}&skip=${(page - 1) * PER_PAGE}&search=${search}&tags=${tags}&language=${language}&order=${order}`,
        })
            .then(resp => resp.json())
            .then(data => setData(data))
    }, [router])

    let templateList
    if (!data) {
        templateList = (
            <ReactLoading type='bars' color="#dbdbdb" height={128} width={100} className="mx-auto my-10"/>
        )
    } else {
        let pageCount = Math.ceil(data.total / PER_PAGE)
        if (pageCount === 0) pageCount = 1

        templateList = (
            <div>
                <div className="grid grid-cols-6 gap-5 mb-10">
                    {data.templates.map(template => (
                        <div className="flex flex-col col-span-6 sm:col-span-3 lg:col-span-2" key={template.id}>
                            <TemplateCard data={template}/>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center text-xl items-center mb-5 select-none">
                    <button
                        className="px-3 py-1 bg-theme-light hover:bg-theme-dark border-theme-darker border rounded-l-md"
                        onClick={() => handlePageChange(page - 1)}>&lt;</button>
                    {page > 1 ?
                        <button className="px-3 py-1 bg-theme-light hover:bg-theme-dark border-theme-darker border"
                                onClick={() => handlePageChange(page - 1)}>{page - 1}</button> : ''}
                    <div className="px-3 py-1 bg-theme-dark border-theme-darker border-2">{page}</div>
                    {page < pageCount ?
                        <button className="px-3 py-1 bg-theme-light hover:bg-theme-dark border-theme-darker border"
                                onClick={() => handlePageChange(page + 1)}>{page + 1}</button> : ''}
                    {page < (pageCount - 1) ? (
                        <div className="px-3 py-1 bg-theme-light border-theme-darker border">...</div>) : ''}
                    {page < (pageCount - 2) ? (
                        <button className="px-3 py-1 bg-theme-light hover:bg-theme-dark border-theme-darker border"
                                onClick={() => handlePageChange(pageCount)}>{pageCount}</button>) : ''}
                    <button
                        className="px-3 py-1 bg-theme-light hover:bg-theme-dark border-theme-darker border rounded-r-md"
                        onClick={() => handlePageChange(page + 1)}>&gt;</button>
                </div>
            </div>
        )
    }

    return (
        <div>
            <Head>
                <title>Templates | Xenon Bot</title>
                <meta name="description" key="description"
                      content="Choose from hundreds of different discord templates and find the right one for your new server."/>
                <meta property="og:title" content="Discord Templates" key="og_title"/>
                <meta property="og:description" key="og_description"
                      content="Choose from hundreds of different discord templates and find the right one for your new server."/>
            </Head>
            <div className="grid justify-items-center py-10 px-3 md:px-5">
                <div className="w-full xl:w-304">
                    <div className="mb-10">
                        <TemplateFilters showSort={true}/>
                    </div>

                    {templateList}
                </div>
            </div>
        </div>
    )
}