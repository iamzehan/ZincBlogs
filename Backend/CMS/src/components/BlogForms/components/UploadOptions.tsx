// hooks
import {useRef, useEffect, type SetStateAction} from "react";

// icons
import {
 Close, 
 UploadFileOutlined,
 AddAPhotoOutlined,
 Cloud
} from "@mui/icons-material"

// Dialog PropTypes
interface DialogPropType {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  setUpload?: React.Dispatch<SetStateAction<boolean>>;
}

// Options dialog there are going to be options to upload directly to the cloud
// and choosing from media library
export function UploadOptions({ props }: { props: DialogPropType }) {
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
export function PhotoUpload({ props }: { props: DialogPropType }) {
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
