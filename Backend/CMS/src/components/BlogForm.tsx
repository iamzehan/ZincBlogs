import MultiSelectInput from "./AutoSuggest";
import { useTogglePublish } from "../utils/query.hooks";
import { useEffect, useState, useRef, type SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { getTags, updateBlog } from "../utils/requests.blog";
import { useAuth, useBlog, useIsMobile } from "../utils/hooks";

import { placeCursorAtEnd } from "../utils/events";
import {
  AddAPhotoOutlined,
  UploadFileOutlined,
  Cloud,
  Close,
} from "@mui/icons-material";
import clsx from "clsx";
import UploadModal from "./UploadModal";

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

  // Upload option dialog states
  const [open, setOpen] = useState(false);
  // Upload modal dialog states
  const [upload, setUpload] = useState(false);

  // On focus/ On click --> scrolldown the textarea place cursor in the end
  const contentEl = useRef<HTMLTextAreaElement>(null);
  function handleCursor(){
    if(contentEl.current) {
      placeCursorAtEnd(contentEl.current);
      contentEl.current.scrollTop = contentEl.current?.scrollHeight;
    }

  }

  return (
    <div className="blog-form-wrapper xl:h-[90vh]">
      <UploadModal props={{ open: upload, setOpen: setUpload }} />
      <UploadOptions props={{ open, setOpen, setUpload }} />
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
            required
          />
        </label>
        <label className="mb-1 block text-zinc-400 font-semibold text-left">
          Main Content
          <textarea
            ref={contentEl}
            name="content"
            defaultValue={content}
            placeholder="Write something..."
            className="blog-form-textarea resize-none!"
            onFocus={()=> {
              handleCursor();
            }}
            onClick={()=> {
              handleCursor();
            }}
            required
          />
        </label>

        <PhotoUpload props={{ open, setOpen }} />
        {Array.isArray(options) && (
          <MultiSelectInput
            options={options}
            selected={selected}
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

// Dialog PropTypes
interface DialogPropType {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  setUpload?: React.Dispatch<SetStateAction<boolean>>;
}
// Options dialog there are going to be options to upload directly to the cloud
// and choosing from media library
function UploadOptions({ props }: { props: DialogPropType }) {
  const { open, setOpen, setUpload } = props;
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (open) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [open]);
  return (
    <dialog
      ref={ref}
      className="bg-zinc-900 border border-zinc-600 rounded-2xl w-full md:w-[400px]
      py-16 px-10 relative place-content-center"
    >
      <div className="flex flex-col gap-2">
        {/* Close button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setOpen(false);
          }}
          className="absolute top-0 right-0 bg-zinc-600 p-1 rounded-bl-xl text-zinc-400 hover:text-white"
          title="Close"
        >
          <Close fontSize="medium" />
        </button>

        <p className="text-left w-full">Choose an option</p>

        {/* Button container */}
        <div className="flex flex-col gap-2 w-full justify-center">
          {/* Upload Button */}
          <button
            className="border border-lime-400
             rounded-xl p-2 flex gap-2 justify-center items-center bg-lime-400 
          text-zinc-800
    hover:text-lime-400 hover:bg-transparent transition-all
     duration-200 ease-in-out active:scale-90"
            onClick={(e) => {
              e.preventDefault();
              setUpload?.(true);
              setOpen(false);
            }}
          >
            Upload <UploadFileOutlined fontSize="small" />
          </button>

          {/* Media Library Button */}
          <button
            className="border rounded-xl p-2 flex gap-2 justify-center items-center bg-white text-zinc-800
    hover:text-white hover:bg-transparent transition-all duration-200 ease-in-out active:scale-90"
          >
            Media Library
            <Cloud fontSize="small" />
          </button>
        </div>
        {/* Button Container End */}
      </div>
    </dialog>
  );
}

// Photo upload button
function PhotoUpload({ props }: { props: DialogPropType }) {
  const { setOpen } = props;
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        setOpen(true);
      }}
      className="border rounded w-fit p-2 flex gap-2 items-center bg-white text-zinc-800
    hover:text-white hover:bg-transparent transition-all duration-200 ease-in-out active:scale-90"
    >
      Upload Photo
      <AddAPhotoOutlined fontSize="small" />
    </button>
  );
}
