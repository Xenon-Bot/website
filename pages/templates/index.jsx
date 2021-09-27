import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import Head from "next/head";
import TemplateFilters from "../../components/templates/TemplateFilters";
import TemplateCard from "../../components/templates/TemplateCard";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowUp, faFlagUsa, faBook, faUserFriends, faGamepad} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import apiRequest from "../../api";

export async function getStaticProps({locale}) {
    async function getTemplates(tags, language) {
        language = language ?? ''
        tags = (tags ?? []).join(',')
        return await apiRequest({
            path: `/templates?limit=12&tags=${tags}&language=${language}`
        }).then(resp => resp.json())
    }

    const data = await Promise.all([
        getTemplates([], null),
        getTemplates([], 'en'),
        getTemplates(['community'], null),
        getTemplates(['gaming'], null),
        getTemplates(['school'], null),
    ])

    return {
        props: {
            ...(await serverSideTranslations(locale, ['templates'])),
            categories: [
                {
                    name: 'Top Templates',
                    description: 'The templates with the most upvotes!',
                    icon: faArrowUp,
                    templates: data[0],
                    query: ''
                },
                {
                    name: 'English Templates',
                    description: 'Templates made for english speaking people',
                    icon: faFlagUsa,
                    templates: data[1],
                    query: 'l=en'
                },
                {
                    name: 'Community Templates',
                    description: 'Templates made for communities of any type',
                    icon: faUserFriends,
                    templates: data[2],
                    query: 't=community'
                },
                {
                    name: 'Gaming Templates',
                    description: 'Templates made for gaming related servers',
                    icon: faGamepad,
                    templates: data[3],
                    query: 't=gaming'
                },
                {
                    name: 'School Templates',
                    description: 'Templates made for schools and classrooms',
                    icon: faBook,
                    templates: data[4],
                    query: 't=school'
                }
            ]
        },
        revalidate: 15 * 60
    };
}

export default function Templates({categories}) {
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
            <div className="grid justify-items-center pt-20 px-3 md:px-5">
                <div className="w-full xl:w-304">
                    {categories.map(category => (
                        <div key={category.name} className="mb-20">
                            <Link href={`/templates/search?${category.query}`} passHref>
                                <a className="block flex-grow flex items-center mb-10 ml-3">
                                    <div className="text-4xl">
                                        <FontAwesomeIcon icon={category.icon}/>
                                    </div>
                                    <div className="ml-5">
                                        <div className="text-4xl">{category.name}</div>
                                        <div className="font-thin text-xl text-gray-300">{category.description}</div>
                                    </div>
                                </a>
                            </Link>
                            <div className="grid grid-cols-6 gap-5">
                                {category.templates.map(template => (
                                    <div className="flex flex-col col-span-6 sm:col-span-3 lg:col-span-2"
                                         key={template.id}>
                                        <TemplateCard data={template}/>
                                    </div>
                                ))}
                            </div>
                            <div className="text-center mt-14">
                                <Link href={`/templates/search?${category.query}`} passHref>
                                    <a className="bg-theme-dark hover:bg-theme-light rounded-lg px-3 py-2 text-xl">View More</a>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}