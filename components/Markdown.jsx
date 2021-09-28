import ReactMarkdown from "react-markdown";

export default function Markdown({children}) {
    return (
        <ReactMarkdown components={{
            strong: props => <span className="font-bold" {...props}/>,
            a: props => <a target="_blank" className="text-blue-400 hover:text-blue-500" rel="noreferrer" {...props}/>
        }}>
            {children}
        </ReactMarkdown>
    )
}