import TemplatePreview from "../../components/templates/TemplatePreview";
import {useEffect, useState} from 'react'
import {useRouter} from "next/router";
import apiRequest from "../../api";
import {toast} from "react-toastify";
import {useToken} from "../../context/token";
import Head from "next/head";

let debounceIdTimeout

function extractTemplateId(value) {
    return value
}

export default function AddTemplate() {
    const [token] = useToken()
    const router = useRouter()

    const [idOrUrl, setIdOrUrl] = useState('')
    const [id, setId] = useState(null)
    const [found, setFound] = useState(false)

    const [tags, setTags] = useState([])
    const [language, setLanguage] = useState('')

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    function handleTagsSelected(e) {
        setTags([...e.target.options].filter(o => o.selected).map(o => o.value))
    }

    useEffect(() => {
        clearTimeout(debounceIdTimeout)
        debounceIdTimeout = setTimeout(() => {
            const id = extractTemplateId(idOrUrl)
            if (id) {
                setId(id)
                fetch(`https://discord.com/api/v9/guilds/templates/${id.trim()}`)
                    .then(async resp => {
                        if (resp.ok) {
                            setFound(true)
                            const data = await resp.json()
                            setName(data.name)
                            setDescription(data.description)
                        } else {
                            setFound(false)
                            setName('')
                            setDescription('')
                        }
                    })
            } else {
                setFound(false)
                setName('')
                setDescription('')
            }
        }, 1000)
    }, [idOrUrl])

    function handleAddClicked() {
        if (!found) return

        apiRequest({
            method: 'POST',
            path: `/templates`,
            token,
            data: {
                id: id,
                tags: tags,
                language: language ?? null
            }
        })
            .then(async resp => {
                const data = await resp.json()
                if (resp.ok) {
                    router.push(`/templates/${data.id}`)
                } else {
                    toast.error(data.text)
                }
            })
    }

    return (
        <div className="my-10 grid justify-items-center px-3 md:px-5">
            <Head>
                <title>Add Template | Xenon Bot</title>
            </Head>
            <div className="w-full xl:w-304">
                <h3 className="text-4xl mb-3">Add Template</h3>
                <div className="text-xl text-gray-300 mb-5">
                    <span>Not sure how to create a template? Check the </span>
                    <a href="https://wiki.xenon.bot/templates#creating-a-template" target="_blank" rel="noreferrer"
                       className="text-blue-400 hover:text-blue-500">guide here</a>
                    <span>.</span>
                </div>
                <div className="bg-theme-darker rounded-md p-5 mb-5">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
                        <div>
                            <div className="text-xl">Template Link</div>
                            <div className="text-gray-400 text-md mb-3">The template url or id from discord</div>
                            <input type="text" className="bg-theme-light px-3 py-2 rounded-md w-full" value={idOrUrl}
                                   onChange={e => setIdOrUrl(e.target.value)}
                                   placeholder="https://discord.new/GNH75Jtr3rJa"/>
                        </div>
                        <div>
                            <div className="text-xl">Tags</div>
                            <div className="text-gray-400 text-md mb-3">Tags help people to find your template</div>
                            <select className="bg-theme-light rounded-md px-3 py-2 w-full"
                                    onChange={handleTagsSelected} value={tags} multiple>
                                <option value="school">school</option>
                                <option value="gaming">gaming</option>
                                <option value="roleplay">roleplay</option>
                                <option value="development">development</option>
                                <option value="support">support</option>
                                <option value="community">community</option>
                                <option value="clan">clan</option>
                                <option value="meme">meme</option>
                            </select>
                        </div>
                        <div>
                            <div className="text-xl">Language</div>
                            <div className="text-gray-400 text-md mb-3">Tags help people to find your template</div>
                            <select className="bg-theme-light rounded-md px-3 py-2 w-full" value={language}
                                    onChange={e => setLanguage(e.target.value)}>
                                <option value="">Not Specified</option>
                                <option value="em">English</option>
                                <option value="es">Spanish</option>
                                <option value="fr">French</option>
                                <option value="de">German</option>
                                <option value="tr">Turkish</option>
                                <option value="pt">Portuguese</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
                        <div>
                            <div className="text-xl">Name</div>
                            <div className="text-gray-400 text-md mb-3">Set this name in the discord template settings
                            </div>
                            <input type="text" className="bg-theme-light px-3 py-2 rounded-md w-full" value={name}
                                   disabled/>
                        </div>
                        <div>
                            <div className="text-xl">Description</div>
                            <div className="text-gray-400 text-md mb-3">Set the description in the discord template
                                settings
                            </div>
                            <textarea className="bg-theme-light px-3 py-2 rounded-md w-full" value={description}
                                      disabled/>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button className="bg-theme-light hover:bg-theme-dark px-3 py-2 rounded-md mr-3"
                                onClick={router.back}>Cancel
                        </button>
                        {found ? (
                            <button className="bg-green-500 hover:bg-green-600 px-3 py-2 rounded-md"
                                    onClick={handleAddClicked}>Add
                                Template</button>
                        ) : (
                            <div className="bg-green-500 px-3 py-2 rounded-md opacity-70">Add
                                Template</div>
                        )}
                    </div>
                </div>
                {id ? <TemplatePreview id={id}/> : ''}
            </div>
        </div>
    )
}