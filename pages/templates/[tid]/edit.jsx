import apiRequest from "../../../api";
import {useRouter} from "next/router";
import {useState} from "react";
import TemplatePreview from "../../../components/templates/TemplatePreview";
import {toast} from "react-toastify";
import {useToken} from "../../../context/token";
import Head from "next/head";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useTranslation} from "next-i18next";

export async function getServerSideProps({params, locale}) {
    const resp = await apiRequest({path: `/templates/${params.tid}`})
    if (resp.status === 404) {
        return {
            props: {},
            notFound: true
        }
    }

    return {
        props: {
            ...(await serverSideTranslations(locale, ['templates', 'common'])),
            template: await resp.json()
        },
    }
}

export default function EditTemplate({template}) {
    const router = useRouter()
    const {t} = useTranslation(['templates', 'common'])
    const [token] = useToken()

    const [tags, setTags] = useState(template.tags)
    const [language, setLanguage] = useState(template.language)

    function handleTagsSelected(e) {
        setTags([...e.target.options].filter(o => o.selected).map(o => o.value))
    }

    function handleSaveClicked() {
        apiRequest({
            method: 'PATCH',
            path: `/templates/${template.id}`,
            token,
            data: {
                tags: tags,
                language: language ?? null
            }
        })
            .then(async resp => {
                const data = await resp.json()
                if (resp.ok) {
                    router.push(`/templates/${data.id}`)
                    toast.success('Your template has been updated')
                } else {
                    toast.error(data.text)
                }
            })
    }

    return (
        <div className="my-10 grid justify-items-center px-3 md:px-5">
            <Head>
                <title>Edit {template.name} | Xenon Bot</title>
            </Head>
            <div className="w-full xl:w-304">
                <h3 className="text-4xl mb-5">Edit Template</h3>
                <div className="bg-theme-darker rounded-md p-5 mb-5">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
                        <div>
                            <div className="text-xl">Template Link</div>
                            <div className="text-gray-400 text-md mb-3">The template url or id from discord</div>
                            <input type="text" className="bg-theme-light px-3 py-2 rounded-md w-full"
                                   value={template.id}
                                   placeholder="https://discord.new/GNH75Jtr3rJa" disabled/>
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
                            <input type="text" className="bg-theme-light px-3 py-2 rounded-md w-full"
                                   value={template.name}
                                   disabled/>
                        </div>
                        <div>
                            <div className="text-xl">Description</div>
                            <div className="text-gray-400 text-md mb-3">Set the description in the discord template
                                settings
                            </div>
                            <textarea className="bg-theme-light px-3 py-2 rounded-md w-full"
                                      value={template.description}
                                      disabled/>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button className="bg-theme-light hover:bg-theme-dark px-3 py-2 rounded-md mr-3"
                                onClick={router.back}>
                            Cancel
                        </button>
                        <button className="bg-green-500 hover:bg-green-600 px-3 py-2 rounded-md"
                                onClick={handleSaveClicked}>
                            Save Template
                        </button>
                    </div>
                </div>
                <TemplatePreview id={template.id}/>
            </div>
        </div>
    )
}