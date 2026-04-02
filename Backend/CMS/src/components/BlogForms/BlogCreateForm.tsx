// ======================== IMPORTS =========================== //
// Style lib
import clsx from "clsx";

// requests
import { getTags, createBlog } from "../../utils/requests.blog";

// hooks
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, useBlog, useIsMobile } from "../../utils/hooks";

// Component
import MultiSelectInput from "../AutoSuggest";
import { UploadOptions, PhotoUpload } from "./components/UploadOptions";
import { UploadWrapper } from "./components/UploadWrapper";
import MediaModal from "./components/MediaLibraryModal";

// Helper
import { placeCursorAtEnd } from "../../utils/events";

// ============================== IMPORTS END ============================= //
// type
interface BlogType {
  title: string;
  content: string;
  tags: string[];
}

// ================================== COMPONENT ================================== //
export default function BlogForm() {
  // helper hooks
  const { fetchWithAuth } = useBlog();
  const { accessToken } = useAuth();
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  // tags selection
  const [selected, setSelected] = useState<string[]>([]);
  
  // submit
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

  // Upload option dialog states
  const [open, setOpen] = useState(false);

  // Upload modal dialog states
  // direct Upload
  const [upload, setUpload] = useState(false);
  // media library Upload
  const [mediaLib, setMediaLib] = useState(false);

  // On focus/ On click --> scrolldown the textarea place cursor in the end
  const contentEl = useRef<HTMLTextAreaElement>(null);

  function handleCursor() {
    if (contentEl.current) {
      placeCursorAtEnd(contentEl.current);
      contentEl.current.scrollTop = contentEl.current?.scrollHeight;
    }
  }

  // uploaded image added to text
  const [text, setText] = useState<string>("");
  return (
    <div className="blog-form-wrapper xl:h-[90vh]">
      {/* Direct Upload */}
      <UploadWrapper props={{ open: upload, setOpen: setUpload, setText, handleFocus: handleCursor }} />
      {/* Media Library Selection */}
      <MediaModal props= {{open: mediaLib, setOpen: setMediaLib, setText, handleFocus: handleCursor}}/>
      
      {/* The following modal enables the user to choose upload options */}
      <UploadOptions props={{ open, setOpen, setUpload, setMediaLib }} />
      <form
        className="blog-form w-screen md:w-[800px] xl:w-[65vw] xl:h-full xl:justify-evenly!"
        onSubmit={handleSubmit}
      >
        {/* Blog Title input */}
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
        {/* Main Content textarea */}
        <label className="mb-1 block text-zinc-400 font-semibold text-left">
          Main Content
          <textarea
            ref={contentEl}
            name="content"
            placeholder="Write something..."
            className="blog-form-textarea resize-none!"
            value={text}
            required
            onFocus={handleCursor}
            onChange={(e) => setText(e.target.value)}
          />
        </label>

        {/* Upload Button */}
        <PhotoUpload props={{ open, setOpen }} />
        {Array.isArray(options) && (
          <MultiSelectInput
            options={options}
            selected={selected}
            setSelected={setSelected}
          />
        )}

        {/* Buttons */}
        <div
          className={clsx("blog-form-header flex justify-end w-full", {
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
