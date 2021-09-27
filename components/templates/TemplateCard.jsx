import {faArrowUp, faDownload} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function TemplateCard({data}) {
    return (
        <Link href={`/templates/${data.id}`} passHref>
            <a className="flex-auto group block bg-theme-darker rounded-lg flex flex-col transform hover:scale-102 transition-transform transition-300 group">
                <div className="p-6 flex-grow">
                    <div className="mb-5">
                        <div className="text-xl mb-2">{data.name}</div>
                        <div className="font-thin text-normal text-gray-300">{data.description}</div>
                    </div>

                    <div className="flex flex-wrap text-gray-300">
                        {data.tags.map(tag => <div className="bg-theme-dark px-2 py-1 rounded-md mr-2 mb-2"
                                                   key={tag}>{tag}</div>)}
                    </div>
                </div>

                <div
                    className="grid grid-cols-2 bg-theme-dark justify-items-center gap-3 p-5 text-xl text-gray-300 rounded-b-lg">
                    <div className="text-right">
                        <span><FontAwesomeIcon icon={faArrowUp}/></span>
                        <span className="align-middle ml-2">{data.upvote_count}</span>
                    </div>
                    <div className="text-left">
                        <span><FontAwesomeIcon icon={faDownload}/></span>
                        <span className="align-middle ml-2">{data.usage_count}</span>
                    </div>
                </div>
            </a>
        </Link>
    )
}