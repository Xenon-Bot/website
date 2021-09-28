import {useRouter} from "next/router";
import {useEffect, useState} from 'react'

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

let loadedQuery = false

export default function TemplateFilters({showSort = false}) {
    const router = useRouter()

    const [search, setSearch] = useState('')
    const [tags, setTags] = useState([])
    const [language, setLanguage] = useState('')
    const [order, setOrder] = useState('popular')

    useEffect(() => {
        if (!loadedQuery && router.isReady) {
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

            loadedQuery = true
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
                       className="bg-theme-dark rounded-lg px-5 py-3 placeholder-gray-500 font-thin flex-auto w-5"
                       placeholder="What are you looking for?" name="search" value={search}
                       onChange={e => setSearch(e.target.value)}/>
                <button type="submit" className="bg-theme-light rounded-r-lg px-5 py-3 flex-initial font-normal">
                    Search
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
                    <div className="flex-auto">
                        <select className="bg-theme-light px-3 py-2 rounded-md w-full" value={language} onChange={handleLanguageChange}>
                            <option value="">Any Language</option>
                            <option value="en">English</option>
                            <option value="es">Spanish</option>
                            <option value="fr">French</option>
                            <option value="de">German</option>
                            <option value="tr">Turkish</option>
                            <option value="pt">Portuguese</option>
                        </select>
                    </div>
                    {showSort ? (
                        <div className="flex-auto ml-2">
                            <select className="bg-theme-light px-3 py-2 rounded-md w-full" value={order}
                                    onChange={handleOrderChange}>
                                <option value="popular">Popular</option>
                                <option value="new">New</option>
                            </select>
                        </div>
                    ) : ''}
                </div>
            </div>
        </div>
    )
}