import MultiSelectInput from "./AutoSuggest";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTags, createBlog } from "../utils/requests.blog";
import { useAuth, useBlog, useIsMobile } from "../utils/hooks";
import clsx from "clsx";

interface BlogType {
  title: string;
  content: string;
  tags: string[];
}
export default function BlogForm() {
  const { fetchWithAuth } = useBlog();
  const { accessToken } = useAuth();
  const [selected, setSelected] = useState<string[]>([]);
  const isMobile = useIsMobile();

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const dataObject = Object.fromEntries(formData.entries());
    const post = JSON.parse(JSON.stringify(dataObject));

    const blogData: BlogType = { ...post, tags: [...new Set(selected)] };
    await fetchWithAuth(createBlog, { accessToken, body: blogData });
    navigate("/blog/posts");
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
        className="blog-form w-screen md:w-[800px] xl:w-[65vw] xl:h-full xl:justify-evenly!"
        onSubmit={handleSubmit}
      >
        <label className="mb-1 block text-zinc-400 font-semibold text-left">
          Title
          <input
            type="text"
            name="title"
            placeholder="Your blog Title"
            className="blog-form-input"
            required
          />
        </label>
        <label className="mb-1 block text-zinc-400 font-semibold text-left">
          Main Content
          <textarea
            name="content"
            placeholder="Write something..."
            className="blog-form-textarea resize-none!"
            required
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
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              navigate("/blog/posts");
            }}
            className="w-20 md:w-30 border rounded hover:text-red-600 transition-all duration-300 py-2"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
