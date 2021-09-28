import {useState} from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faMinus} from "@fortawesome/free-solid-svg-icons";
import Markdown from "./Markdown";

export default function QuestionAnswer({question, answer}) {
    const [expanded, setExpanded] = useState(false)

    return (
        <div className="border-b-2 border-theme-light">
            <div className="flex cursor-pointer py-6 px-4 items-center" onClick={() => setExpanded(!expanded)}>
                <div className="flex-auto text-xl">{question}</div>
                <FontAwesomeIcon icon={expanded ? faMinus : faPlus} className="opacity-60 text-xl"/>
            </div>
            {expanded ? (
                <div className="text-lg text-gray-400 pb-6 px-4 font-light">
                    <Markdown>{answer}</Markdown>
                </div>
            ) : ''}
        </div>
    )
}