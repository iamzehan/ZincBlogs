import { useState } from "react";
import Image from "../components/Image";
import Grid from "../components/ImageGrid";
import {
  MoreVert,
  DeleteOutline,
  Fullscreen,
  Close,
  Link,
  Error,
  Done,
  Image as ImageIcon
} from "@mui/icons-material";
import clsx from "clsx";
import { useAuth, useIsMobile, useMedia } from "../utils/hooks";
import { MediaProvider } from "../utils/context.media";
import { useQuery } from "@tanstack/react-query";
import { getAllImages} from "../utils/requests.media";
import { useDeleteMutation } from "../utils/query.hooks";


export default function Page() {
  return (
    <MediaProvider>
      <ImageGrid />
    </MediaProvider>
  );
}
interface ImageDataType {
  id: string;
  url: string;
  public_id: string;
}

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
        No Images <ImageIcon fontSize="medium" className="text-red-400"/>
      </div>
    );
  }
}

// Image cards
function ImageCard({ props }: { props: ImageDataType }) {
  // showMenu state is used for hover effect on the menu options
  // hovering on an image shows the menu button
  const [showMenu, setMenu] = useState(false);

  const isMobile = useIsMobile();

  // unpack props id: used for key, url: shows image
  const { id, url } = props;
  return (
    <div
      onMouseEnter={() => setMenu(true)}
      onMouseLeave={() => setMenu(false)}
      onFocus={() => (isMobile ? setMenu(true) : "")}
      onBlur={() => (isMobile ? setMenu(false) : "")}
      className="p-2 rounded flex flex-col gap-2 relative bg-zinc-900 shadow-md contain-content"
    >
      <Image
        props={{
          src: `${url}`,
          alt: "icon",
          className: "object-cover aspect-square",
        }}
      />

      {showMenu && (
        <span
          className={clsx(
            "absolute cursor-pointer z-100 border border-blue-500 rounded inset-0 h-full w-full transition-all duration-300",
            { "bg-black/40 backdrop-blur-[2px]": showMenu },
            { "bg-transparent": !showMenu },
          )}
        >
          <ImageMenu key={id} props={props} />
        </span>
      )}
      {showMenu && !isMobile && (
        <p className="font-bold z-200 border border-blue-500 rounded-br rounded-bl border-t-0 absolute py-4 bottom-0 left-0 w-full bg-black/50">
          Image Name
        </p>
      )}
    </div>
  );
}

// Image Menu
function ImageMenu({ props }: { props: ImageDataType }) {
  // Dropdown menu show hide true=show, false=hide
  const [showDropDown, setDropDown] = useState(false);

  // Copy image URL
  const [isCopied, setCopy] = useState<boolean>(false);
  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setTimeout(() => setCopy(false), 800);
    setCopy(true);
  };

  // mutation operation for image deletion
  const deleteImageMutation = useDeleteMutation();
  const handleDelete = async (public_id: string) => {
    deleteImageMutation.mutate(public_id);
  };
  // unpack props - public_id is used to delete image and url is used to copy image and show full-screen
  const { url, public_id } = props;

  return (
    <>
      <button
        onClick={() => setDropDown((prev) => !prev)}
        className="absolute right-2 top-2 flex justify-center p-1 rounded-full bg-zinc-500/50"
      >
        {!showDropDown ? <MoreVert /> : <Close />}
      </button>
      <div
        className={clsx(
          "absolute min-w-[50%] flex flex-col scale-0 contain-content z-400",
          "text-left bg-zinc-950/90 text-black rounded-md top-10 right-4",
          "transition-transform duration-300 origin-top-right",
          { "scale-100": showDropDown },
        )}
      >
        <div
          onClick={() => handleCopy(url)}
          className="p-2 text-white hover:bg-green-500 hover:text-white flex items-center justify-between"
        >
          Copy URL
          {!isCopied ? <Link fontSize="small" /> : <Done fontSize="small" />}
        </div>
        <div className="p-2 text-white hover:bg-zinc-500 border-t border-b border-zinc-300 hover:text-zinc-200 flex items-center justify-between">
          Full screen
          <Fullscreen fontSize="small" />
        </div>
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
