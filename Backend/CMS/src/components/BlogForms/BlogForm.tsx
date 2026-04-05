import MultiSelectInput from "../AutoSuggest";
import { useTogglePublish } from "../../utils/query.hooks";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getTags, updateBlog } from "../../utils/requests.blog";
import { useAuth, useBlog, useIsMobile } from "../../utils/hooks";
// Cursor
import { placeCursorAtEnd } from "../../utils/events";

// Component
import { UploadOptions, PhotoUpload } from "./components/UploadOptions";
import MediaModal from "./components/MediaLibraryModal";

import clsx from "clsx";
import { UploadWrapper } from "./components/UploadWrapper";

// Form Props
interface PropsType {
  id: string;
  title: string;
  tags: string[];
  setTitle: Setter<string>;
  setSelected: Setter<string[]>;
  previewText: string;
  setPreviewText: Setter<string>;
  publish: { id: string; status: boolean };
}

// Blog data type
interface BlogType {
  title: string;
  content: string;
  tags: string[];
}

// This component is a form that allows the user to edit a blog
export default function BlogForm({ props }: { props: PropsType }) {
  // unpacking the props
  const { id, title, tags, publish, setSelected, setTitle, previewText, setPreviewText } = props;
  // publish-unpublish toggle - mutation function
  const { mutate } = useTogglePublish();
  // auth token
  const { accessToken } = useAuth();
  // helper function for authenticated api calls
  const { fetchWithAuth } = useBlog();

  // publish status state - preset
  const [status, setStatus] = useState<boolean>(publish.status);

  // detect mobile device - helper
  const isMobile = useIsMobile();

  // navigation function
  const navigate = useNavigate();

  // handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // form data converted to JSON
    const formData = new FormData(e.currentTarget);
    const dataObject = Object.fromEntries(formData.entries());
    const post = JSON.parse(JSON.stringify(dataObject));

    // add tags to the data (since format of storing tags is different)
    const blogData: BlogType = { ...post, tags: [...new Set(tags)] };

    // make the api call
    await fetchWithAuth(updateBlog, { accessToken, id, body: blogData });
    navigate("/blog/posts");
  };

  //   Publish button
  const handlePublish = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // mutation function - pauses the blog api endpoint calls
    // and performs publish-unpublish function
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

  // Upload option dialog states
  const [open, setOpen] = useState(false);

  // Upload modal dialog states
  const [upload, setUpload] = useState(false);
  const [mediaLib, setMediaLib] = useState(false);

  // On focus/ On click --> scrolldown the textarea place cursor in the end
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const wasFocused = useRef(false);

  const handleFocus = () => {
    if (!wasFocused.current) {
      const el = textareaRef.current;
      if (el) placeCursorAtEnd(el);
    }
    wasFocused.current = true;
  };

  const handleBlur = () => {
    wasFocused.current = false;
  };

  return (
    <div className="blog-form-wrapper xl:h-[90vh]">
      {/* The following modal enables the user to upload file */}
      <UploadWrapper
        props={{ open: upload, setOpen: setUpload, setText:setPreviewText, handleFocus }}
      />
      {/* Media Library Selection */}
      <MediaModal
        props={{
          open: mediaLib,
          setOpen: setMediaLib,
          setText:setPreviewText,
          handleFocus,
        }}
      />

      {/* The following modal enables the user to choose upload options */}
      <UploadOptions props={{ open, setOpen, setUpload, setMediaLib }} />

      <form
        className="blog-form w-screen md:w-[800px] xl:w-[65vw] xl:h-full xl:justify-evenly!"
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
            onChange={(e)=> {setTitle(e.target.value)}}
            required
          />
        </label>
        <label className="mb-1 block text-zinc-400 font-semibold text-left">
          Main Content
          <textarea
            ref={textareaRef}
            name="content"
            value={previewText}
            placeholder="Write something..."
            className="blog-form-textarea resize-none!"
            onClick={() => handleFocus()}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={(e) => {setPreviewText(e.target.value)}}
            required
          />
        </label>
        {/* Photo upload button */}
        <PhotoUpload props={{ open, setOpen }} />
        {Array.isArray(options) && (
          <MultiSelectInput
            options={options}
            selected={tags}
            setSelected={setSelected}
          />
        )}
        <div
          className={clsx("blog-form-header flex justify-between w-full", {
            "sticky left-0 bottom-0 bg-zinc-900 backdrop-blur-3xl px-2 py-3 border-zinc-600/50":
              isMobile,
          })}
        >
          <div className="flex gap-2">
            <input
              type="submit"
              value="Save"
              className="w-20 bg-lime-600 active:bg-lime-800 active:scale-95 border-2
               border-lime-600 hover:bg-white hover:text-lime-600 
               py-2 rounded md:w-30 transition-all duration-300"
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
