import {useRouter} from "next/router";
import {useEffect, useState} from 'react'
import {useTranslation} from "next-i18next";

const availableTags = [
    'school',
    'gaming',
    'roleplay',
    'development',
    'support',
    'community',
    'clan',
    'meme'
]

export default function TemplateFilters({showSort = false}) {
    const router = useRouter()
    const {t} = useTranslation('templates')

    const [search, setSearch] = useState('')
    const [tags, setTags] = useState([])
    const [language, setLanguage] = useState('')
    const [order, setOrder] = useState('popular')

    useEffect(() => {
        if (!router.isReady) return

        if (router.query['t']) {
                setTags(router.query['t'].split(','))
            }

            if (router.query['s']) {
                setSearch(router.query['s'])
            }

            if (router.query['l']) {
                setLanguage(router.query['l'])
            }

            if (router.query['o']) {
                setOrder(router.query['o'])
            }
    }, [router])

    function pushRoute(newSearch, newTags, newLanguage, newOrder) {
        if (!process.browser) return
        router.push(`/templates/search?s=${newSearch}&t=${newTags.join(',')}&l=${newLanguage}&o=${newOrder}`)
    }

    function handleTagClicked(newTag) {
        let newTags
        if (tags.includes(newTag)) {
            newTags = tags.filter(t => t !== newTag)
        } else {
            newTags = [...tags, newTag]
        }
        setTags(newTags)
        pushRoute(search, newTags, language, order)
    }

    function handleLanguageChange(e) {
        setLanguage(e.target.value)
        pushRoute(search, tags, e.target.value, order)
    }

    function handleOrderChange(e) {
        setOrder(e.target.value)
        pushRoute(search, tags, language, e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        pushRoute(search, tags, language, order)
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="flex text-xl">
                <input type="text"
                       className="bg-theme-dark rounded-l-lg px-5 py-3 placeholder-gray-500 font-thin flex-auto w-5"
                       placeholder={t('searchPlaceholder')} name="search" value={search}
                       onChange={e => setSearch(e.target.value)}/>
                <button type="submit" className="bg-theme-light rounded-r-lg px-5 py-3 flex-initial font-normal">
                    {t('search')}
                </button>
            </form>
            <div className="flex flex-col-reverse sm:flex-row mt-3">
                <div className="px-3 flex-auto flex flex-wrap">
                    {availableTags.map(t => (
                        <div
                            className={`px-2 py-1 rounded-md mr-2 mb-2 cursor-pointer ${tags.includes(t) ? 'bg-blue-500' : 'bg-theme-light'}`}
                            onClick={() => handleTagClicked(t)} key={t}>{t}</div>
                    ))}
                </div>
                <div className="flex-initial flex mb-3 sm:mb-0">
                    <div className="flex-grow flex-shrink-0">
                        <select className="bg-theme-light px-3 py-2 rounded-md w-full" value={language} onChange={handleLanguageChange}>
                            <option value="">{t('anyLanguage')}</option>
                            <option value="en">English</option>
                            <option value="es">Spanish</option>
                            <option value="fr">French</option>
                            <option value="de">German</option>
                            <option value="tr">Turkish</option>
                            <option value="pt">Portuguese</option>
                        </select>
                    </div>
                    {showSort ? (
                        <div className="flex-grow flex-shrink-0 ml-2">
                            <select className="bg-theme-light px-3 py-2 rounded-md w-full" value={order}
                                    onChange={handleOrderChange}>
                                <option value="popular">{t('popular')}</option>
                                <option value="new">{t('new')}</option>
                            </select>
                        </div>
                    ) : ''}
                </div>
            </div>
        </div>
    )
}