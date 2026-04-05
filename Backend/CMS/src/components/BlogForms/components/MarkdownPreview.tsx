import ReactMarkdown from "react-markdown";

interface BlogType {
  title: string;
  content: string;
  tags: string[];
}
export default function MarkdownPreview({ data }: { data: BlogType }) {
  return (
    <div className="blog-form-wrapper md-wrapper">
      <h1 className="text-2xl">{data.title}</h1>
      <div className="flex flex-wrap gap-2">
        {
          data.tags.map((tag)=> {
            return <span className="tags">
              {tag}
            </span>
          })
        }
      </div>
      <ReactMarkdown>
        {data.content}
      </ReactMarkdown>
    </div>
  );
}
