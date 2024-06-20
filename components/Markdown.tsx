import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

interface MarkdownProps {
    children: string;
}

export default function MarkDown(props: MarkdownProps){
    return <ReactMarkdown remarkPlugins={[gfm]} className={"MarkdownRenderer"}>{props.children}</ReactMarkdown>
}