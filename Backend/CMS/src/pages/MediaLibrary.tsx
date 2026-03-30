// =============== IMPORTS =============== //

// Components
import Image from "../components/Image";
import Grid from "../components/ImageGrid";
import UploadModal from "../components/UploadModal";
import UploadButton from "../components/Buttons";

// Icons
import {
  AddAPhoto,
  MoreVert,
  DeleteOutline,
  Fullscreen,
  Close,
  Link,
  Error,
  Done,
  Image as ImageIcon,
} from "@mui/icons-material";

// Style library
import clsx from "clsx";

// Contexts & Requests
import { MediaProvider } from "../utils/context.media";
import { getAllImages } from "../utils/requests.media";

// hooks & queries
import { useQuery } from "@tanstack/react-query";
import { useState, useRef, useEffect, type SetStateAction } from "react";
import { useAuth, useIsMobile, useMedia } from "../utils/hooks";
import { useDeleteMutation } from "../utils/query.hooks";

// =============== PAGE COMPONENT =============== //
export default function Page() {
  const [open, setOpen] = useState(false);
  
  return (
    <MediaProvider>
      <FullScreen />
      <ImageGrid />
      <UploadModal props={{open, setOpen}}/>
      {/* Upload Modal Trigger button */}
      <UploadButton
        key="write-btn"
        props={{
          type: "primary",
          fn: () => setOpen(true),
          additionalDesign: `
                        fixed bottom-2 right-5 md:right-10 z-10 h-20 aspect-square md:h-auto md:aspect-auto
                        flex items-center justify-center shadow-md border border-zinc-500/20
                        bottom-10
                        self-end rounded-full md:rounded-lg`,
        }}
      >
        <p className="hidden md:block text-xl px-2">Upload</p>
        <AddAPhoto className="md:text-xl! text-4xl!" />
      </UploadButton>
    </MediaProvider>
  );
}

// =============== FULL SCREEN VIEW =============== //
// HTML Dialog Element to show full screen image
function FullScreen() {
  const { imgURL, setImgURL } = useMedia();
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (imgURL) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [imgURL]);
  if (!imgURL) return null;
  return (
    // Popup modal
    <dialog
      ref={ref}
      className="flex border shadow-2xl border-zinc-600/50 rounded backdrop-blur-xl
       max-w-[80vw] md:max-w-200 z-100 self-center justify-self-center"
    >
      {/* Close modal button */}
      <Close
        onClick={() => setImgURL(null)}
        className="rounded-bl absolute
       top-0 right-0 bg-zinc-600 text-zinc-300 z-10 cursor-pointer hover:text-white"
        fontSize="medium"
      />
      {/* Full-screen image */}
      <Image props={{ src: imgURL, alt: "img", className: "w-auto max-h-[80vh]" }} />
    </dialog>
  );
}
// =============== FULL SCREEN VIEW END =============== //

// =============== IMAGE GRID =============== //
function ImageGrid() {
  const { accessToken } = useAuth();
  const { fetchWithAuth } = useMedia();
  const { isPending, error, data } = useQuery({
    queryKey: ["imageData"],
    queryFn: () => fetchWithAuth(getAllImages, { accessToken }),
    enabled: !!accessToken,
  });
  if (isPending) return "Loading Images...";
  if (error)
    return (
      <div className="h-50 place-content-center text-xl text-red-500 overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-950 transition-all duration-300 w-full">
        Error loading Images <Error />
      </div>
    );
  if (Array.isArray(data) && data?.length > 0)
    return (
      <Grid>
        {Array.isArray(data) &&
          data.map((img: ImageDataType) => (
            <ImageCard key={img?.id} props={img} />
          ))}
      </Grid>
    );
  else {
    return (
      <div className="border-dashed border mx-2 rounded h-50 place-content-center">
        No Images <ImageIcon fontSize="medium" className="text-red-400" />
      </div>
    );
  }
}
// =============== IMAGE GRID END =============== //

// =============== IMAGE CARDS =============== //
function ImageCard({ props }: { props: ImageDataType }) {
  // showMenu state is used for hover effect on the menu options
  // hovering on an image shows the menu button | in mobile tapping the image shows menu button
  const [showMenu, setMenu] = useState(false);

  // Dropdown menu show hide true=show, false=hide
  const [showDropDown, setDropDown] = useState(false);

  const isMobile = useIsMobile();

  // Full Screen Image
  const { setImgURL } = useMedia();

  // unpack props id: used for key, url: shows image
  const { id, url } = props;
  return (
    // Image Container
    <div
      onMouseEnter={() => setMenu(true)}
      onMouseLeave={() => {
        setMenu(false);
        setDropDown(false);
      }}
      onFocus={() => (isMobile ? setMenu(true) : "")}
      onBlur={() => {
        if(isMobile && !showDropDown){
          setMenu(false);
        }
      }}
      onDoubleClick={() => {if(!isMobile) setImgURL(url)}}
      
      onMouseDown={() => (isMobile ? setMenu(true) : "")}
      className="rounded flex flex-col gap-2 relative bg-zinc-900 border border-zinc-500 shadow-xl contain-content"
    >
      {/* Image */}
      <Image
        props={{
          src: `${url}`,
          alt: "icon",
          className: "object-cover aspect-square",
        }}
      />
      
      {/* Dropdown menu */}
      {showMenu && (
        <span
          className={clsx(
            "absolute cursor-pointer z-100 border border-zinc-50 rounded inset-0 h-full w-full transition-all duration-300",
            { "bg-black/40": showMenu },
            { "bg-transparent": !showMenu },
          )}
        >
          <ImageMenu
            key={id}
            props={{ image: props, showDropDown, setDropDown }}
          />
        </span>
      )}
      {/* Image Name */}
      {showMenu && !isMobile && (
        <p className="font-bold z-200 border border-zinc-50 rounded-br rounded-bl border-t-0 absolute py-4 bottom-0 left-0 w-full bg-black/50">
          Image Name
        </p>
      )}
    </div>
  );
}

// =============== IMAGE CARDS END =============== //

// =============== IMAGE DROPDOWN MENU =============== //
function ImageMenu({
  props,
}: {
  props: {
    image: ImageDataType;

    showDropDown: boolean;
    setDropDown: React.Dispatch<SetStateAction<boolean>>;
  };
}) {
  //  Unpack props
  const { image, showDropDown, setDropDown } = props;

  // Copy image URL
  const [isCopied, setCopy] = useState<boolean>(false);
  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setTimeout(() => setCopy(false), 800);
    setCopy(true);
  };

  // Full Screen Image
  const { setImgURL } = useMedia();
  
  // mobile view
  const isMobile = useIsMobile();
  // mutation operation for image deletion
  const deleteImageMutation = useDeleteMutation();
  const handleDelete = async (public_id: string) => {
    deleteImageMutation.mutate(public_id);
  };
  // unpack props - public_id is used to delete image and url is used to copy image and show full-screen
  const { url, public_id } = image;

  return (
    <>
      {/* Menu & Close button */}
      <button
        onClick={() => setDropDown((prev) => !prev)}
        className="absolute right-2 top-2 flex justify-center p-1 rounded-full bg-zinc-500/50"
      >
        {!showDropDown ? <MoreVert /> : <Close />}
      </button>

      {/* Dropdown menu options */}
      <div
        className={clsx(
          "absolute min-w-[50%] flex flex-col scale-0 contain-content z-400",
          "text-left bg-zinc-950/90 text-black rounded-md top-10 right-10",
          "transition-transform duration-300 origin-top-right",
          { "scale-100 ": showDropDown },
          { "w-[80%] right-5!" : isMobile}
        )}
      >
        {/* Copy Image URL */}
        <div
          onClick={() => handleCopy(url)}
          className="p-2 text-white hover:bg-green-500 hover:text-white flex items-center justify-between"
        >
          {!isCopied ?  "Copy URL" : "Copied!"}
          {!isCopied ?  <Link fontSize="small" /> : <Done fontSize="small" />}
        </div>

        {/* Full Screen Image */}
        <div
          onClick={() => setImgURL(url)}
          className="p-2 text-white hover:bg-zinc-500 gap-2 border-t border-b border-zinc-300 hover:text-zinc-200 flex items-center justify-between"
        >
          Full-Screen
          <Fullscreen fontSize="small" />
        </div>

        {/* Delete */}
        <div
          onClick={() => handleDelete(public_id)}
          className="p-2 text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-between"
        >
          Delete
          <DeleteOutline fontSize="small" />
        </div>
      </div>
    </>
  );
}
// =============== IMAGE DROPDOWN MENU END =============== //

// ===================================================== END =================================================//