import { useState } from "react";
import Image from "../components/Image";
import Grid from "../components/ImageGrid";
import {
  MoreVert,
  DeleteOutline,
  Fullscreen,
  Close,
  Link,
} from "@mui/icons-material";
import clsx from "clsx";
import { useIsMobile } from "../utils/hooks";

export default function Page() {
  return (
    <Grid>
      <ImageCard />
      <ImageCard />
      <ImageCard />
      <ImageCard />
      <ImageCard />
      <ImageCard />
    </Grid>
  );
}

// Image cards
function ImageCard() {
  const [showMenu, setMenu] = useState(false);
  const isMobile = useIsMobile();
  return (
    <div
      onMouseEnter={() => setMenu(true)}
      onMouseLeave={() => setMenu(false)}
      onFocus={() => (isMobile ? setMenu(true) : "")}
      onBlur={() => (isMobile ? setMenu(false) : "")}
      className="p-2 rounded flex flex-col gap-2 relative bg-zinc-900 shadow-md contain-content"
    >
      <Image
        props={{ src: "./favicon.png", alt: "icon", className: "object-cover" }}
      />
      
      {showMenu && (
        <span
          className={clsx(
            "absolute cursor-pointer z-100 border border-blue-500 rounded inset-0 h-full w-full transition-all duration-300",
            { "bg-black/40 backdrop-blur-[2px]": showMenu },
            { "bg-transparent": !showMenu },
          )}
        >
          <ImageMenu />
        </span>
      )}
      {showMenu && !isMobile && (
        <p className="font-bold z-200 border border-blue-500 rounded-br rounded-bl border-t-0 absolute py-4 bottom-0 left-0 w-full bg-black/50">Image Name</p>
      )}
    </div>
  );
}

// Image Menu
function ImageMenu() {
  const [showDropDown, setDropDown] = useState(false);
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
        <div className="p-2 text-white hover:bg-green-500 hover:text-white flex items-center justify-between">
          Copy URL
          <Link fontSize="small" />
        </div>
        <div className="p-2 text-white hover:bg-zinc-500 border-t border-b border-zinc-300 hover:text-zinc-200 flex items-center justify-between">
          Full screen
          <Fullscreen fontSize="small" />
        </div>
        <div className="p-2 text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-between">
          Delete
          <DeleteOutline fontSize="small" />
        </div>
      </div>
    </>
  );
}