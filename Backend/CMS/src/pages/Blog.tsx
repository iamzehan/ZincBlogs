import { useParams } from "react-router-dom";
import BlogForm from "../components/BlogForm";
import { useEffect, useState } from "react";
import { getBlog } from "../utils/requests.blog";
import { BlogProvider } from "../utils/contexts.blog";
import { useNav } from "../utils/hooks";
import clsx from "clsx";
interface BlogType {
  id: string;
  title: string;
  content: string;
  tags: { id: string; tag: string }[];
  publish: { id: string; status: boolean };
}

export default function Page() {
  const { id } = useParams();
  const [isError, setError] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<null | BlogType>(null);
  const { setCustomHeader, collapse } = useNav();
  useEffect(() => {
    async function fetchBlog() {
      try {
        const data = await getBlog({ id });
        const blog = await data.json();
        setData(blog);
        setLoading(false);
      } catch {
        setError(true);
      }
    }
    fetchBlog();
  }, []);

  useEffect(() => {
    if(id){
    setCustomHeader("Update blog")
    };
  }, [id]);

  if (isError) return <p>Error loading blog</p>;

  if (isLoading) return <p>Loading...</p>;

  if (data)
    return (
      <BlogProvider>
        <div
          className={clsx(
            "transition-all duration-300 md:w-screen grid place-content-center",
            { "xl:w-[calc(100vw-100px)]": collapse },
            { "xl:w-[calc(100vw-350px)] xl:ml-5!": !collapse },
          )}
        >
          {/* Form */}
          <BlogForm
            props={{
              id: data?.id,
              title: data?.title,
              content: data?.content,
              tags: data?.tags,
              publish: data?.publish,
            }}
          />
          {/* Form Ends */}
          {/* Markdown Preview */}

          {/* Markdown Preview Ends */}
        </div>
      </BlogProvider>
    );
}
