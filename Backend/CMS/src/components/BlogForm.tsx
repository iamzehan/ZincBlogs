import MultiSelectInput from "./AutoSuggest";
import { useTogglePublish } from "../utils/query.hooks";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTags, updateBlog } from "../utils/requests.blog";
import { useAuth, useBlog, useIsMobile } from "../utils/hooks";
import clsx from "clsx";

interface PropsType {
  id: string;
  title: string;
  content: string;
  tags: {
    id: string;
    tag: string;
  }[];
  publish: { id: string; status: boolean };
}

interface BlogType {
  title: string;
  content: string;
  tags: string[];
}
export default function BlogForm({ props }: { props: PropsType }) {
  const { id, title, content, tags, publish } = props;
  const { mutate } = useTogglePublish();
  const { fetchWithAuth } = useBlog();
  const [status, setStatus] = useState<boolean>(publish.status);
  const { accessToken } = useAuth();
  const tagsList = tags.map((value) => value.tag);
  const [selected, setSelected] = useState<string[]>(tagsList);
  const isMobile = useIsMobile();

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const dataObject = Object.fromEntries(formData.entries());
    const post = JSON.parse(JSON.stringify(dataObject));

    const blogData: BlogType = { ...post, tags: [...new Set(selected)] };
    await fetchWithAuth(updateBlog, { accessToken, id, body: blogData });
    navigate("/blog/posts");
  };

  //   Publish button
  const handlePublish = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    mutate({
      id,
      publish: !publish.status,
    });
    setStatus((prev) => !prev);
  };

  // get the available tags for suggestions
  const [options, setOptions] = useState<string[] | unknown>([]);
  useEffect(() => {
    async function fetchOptions() {
      const data = await fetchWithAuth(getTags, { accessToken });
      if (data) setOptions(data);
    }
    fetchOptions();
  }, []);

  return (
    <div className="blog-form-wrapper xl:h-[90vh]">
      <form
        className="blog-form xl:h-full xl:justify-evenly!"
        onSubmit={handleSubmit}
      >
        <label className="mb-1 block text-zinc-400 font-semibold text-left">
          Title
          <input
            type="text"
            name="title"
            defaultValue={title}
            placeholder="Your blog Title"
            className="blog-form-input"
          />
        </label>
        <label className="mb-1 block text-zinc-400 font-semibold text-left">
          Main Content
          <textarea
            name="content"
            defaultValue={content}
            placeholder="Write something..."
            className="blog-form-textarea resize-none!"
          />
        </label>
        {Array.isArray(options) && (
          <MultiSelectInput
            options={options}
            selected={selected}
            setSelected={setSelected}
          />
        )}
        <div
          className={clsx("blog-form-header flex justify-between w-full", {
            "sticky left-0 bottom-2 bg-zinc-900/80 backdrop-blur-3xl px-2 py-3 border rounded-md border-zinc-600/50":
              isMobile,
          })}
        >
          <div className="flex gap-2">
            <input
              type="submit"
              value="Save"
              className="w-20 bg-lime-600 active:bg-lime-800 active:scale-95 border-2 border-lime-600 hover:bg-white hover:text-lime-600 py-2 rounded md:w-30 transition-all duration-300"
            />
            <button
              className={clsx(
                "rounded w-20 md:w-30 transition-all duration-300",
                {
                  "bg-white text-zinc-800 hover:bg-zinc-400 hover:text-white":
                    !status,
                },
                {
                  "bg-zinc-700 text-zinc-200 hover:bg-zinc-300 hover:text-zinc-800":
                    status,
                },
              )}
              onClick={(e) => handlePublish(e)}
            >
              {status ? "Unpublish" : "Publish"}
            </button>
          </div>
          <button
            onClick={() => navigate("/blog/posts")}
            className="w-20 md:w-30 border rounded hover:text-red-600 transition-all duration-300 py-2"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
