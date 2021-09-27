import {useRouter} from "next/router";
import {useState} from 'react'

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

export default function TemplateFilters() {
    const router = useRouter()

    const [search, setSearch] = useState('')
    if (router.query['s'] && !search) {
        setSearch(router.query['s'])
    }

    const [tags, setTags] = useState([])
    if (router.query['t'] && tags.length === 0) {
        setTags(router.query['t'].split(','))
    }

    function pushRoute(newSearch, newTags) {
        router.push(`/templates/search?s=${newSearch}&t=${newTags.join(',')}`)
    }

    function handleTagClicked(newTag) {
        let newTags
        if (tags.includes(newTag)) {
            newTags = tags.filter(t => t !== newTag)
        } else {
            newTags = [...tags, newTag]
        }
        setTags(newTags)
        pushRoute(search, newTags)
    }

    function handleSubmit(e) {
        e.preventDefault()
        pushRoute(search, tags)
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
            <div className="px-3 flex flex-wrap mt-3">
                {availableTags.map(t => (
                    <div
                        className={`px-2 py-1 rounded-md mr-2 mb-2 cursor-pointer ${tags.includes(t) ? 'bg-blue-500' : 'bg-theme-light'}`}
                        onClick={() => handleTagClicked(t)} key={t}>{t}</div>
                ))}
            </div>
        </div>
    )
}