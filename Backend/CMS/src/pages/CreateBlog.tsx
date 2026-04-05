import BlogForm from "../components/BlogForms/BlogCreateForm";
import { useEffect, useState } from "react";
import { BlogProvider } from "../utils/contexts.blog";
import { MediaProvider } from "../utils/context.media";
import { useNav } from "../utils/hooks";
import clsx from "clsx";
import MarkdownPreview from "../components/BlogForms/components/MarkdownPreview";
import { useBlog } from "../utils/hooks";
import PreviewEdit from "../components/BlogForms/components/PreviewEditNav";
export default function Page() {
  const { setCustomHeader, setCollapse, collapse } = useNav();
  useEffect(() => {
    setCollapse(true);
    setCustomHeader(null);
    setCustomHeader("Create blog");
  }, []);

  return (
    <BlogProvider>
      <MediaProvider>
        <PreviewEdit/>
        <div
          className={clsx(
            "transition-all duration-300 md:w-screen grid place-content-center",
            { "xl:w-[calc(100vw-100px)]": collapse },
            { "xl:w-[calc(100vw-350px)] xl:ml-5!": !collapse },
          )}
        >
          {/* Form */}
          <BlogWrapper />
          {/* Form Ends */}
          {/* Markdown Preview */}

          {/* Markdown Preview Ends */}
        </div>
      </MediaProvider>
    </BlogProvider>
  );
}


const BlogWrapper = () => {
  const { preview, previewText, setPreviewText } = useBlog();
  const [selected, setSelected] = useState<string[]>([]);
  const [title, setTitle] = useState<string>("");
  if (preview) {
    return <MarkdownPreview data={{title, content:previewText, tags: [...new Set(selected)]}}/>;
  }
  return (
    <BlogForm
    props ={{ 
      title,
      setTitle,
      previewText,
      setPreviewText,
      selected,
      setSelected
    }}
    />
  );
};
