import { useRef, useEffect } from "react";
import { getAllImages } from "../../../utils/requests.media";
import { Close, Error, Image as ImageIcon } from "@mui/icons-material";
import { useAuth, useMedia } from "../../../utils/hooks";
import { useQuery } from "@tanstack/react-query";
import Image from "../../Image";

type Setter<T> = React.Dispatch<React.SetStateAction<T>>;
// Dialog PropTypes
interface DialogPropType {
  open: boolean;
  setOpen: Setter<boolean>;
  setText: Setter<string>;
  handleFocus: () => void;
}
export default function MediaModal({ props }: { props: DialogPropType }) {
  const { open, setOpen, setText, handleFocus } = props;
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
    }

    if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);
  if (!open) return null;
  return (
    <dialog
      ref={dialogRef}
      className="
      relative flex flex-col max-h-[80%] max-w-[80%]
    rounded-xl border
     border-zinc-500"
    >
      <div className="flex justify-between bg-zinc-900 sticky top-0 z-100 pl-5 py-2">
        <h2 className="text-xl font-bold">Choose one from below</h2>
        <button
          onClick={() => setOpen(false)}
          className="px-2 hover:text-red-500"
          title="Close"
        >
          <Close fontSize="small"/>
        </button>
      </div>

      <ImageGrid props={{ setText, setOpen, handleFocus }} />
    </dialog>
  );
}

// =============== IMAGE GRID =============== //
function ImageGrid({
  props,
}: {
  props: {
    setText: Setter<string>;
    setOpen: Setter<boolean>;
    handleFocus: () => void;
  };
}) {
  const { setText, setOpen, handleFocus } = props;
  const { accessToken } = useAuth();
  const { fetchWithAuth } = useMedia();

  function handleSelect(url: string) {
    setText((prev: string) =>
      prev ? `${prev}\n![image](${url})\n` : `![image](${url})\n`,
    );
    setOpen(false);
    handleFocus();
  }
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
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 p-2 overflow-y-auto thin-scrollbar">
        {Array.isArray(data) &&
          data.map((img: ImageDataType) => (
            <ImageCard key={img?.id} props={{ img, handleSelect }} />
          ))}
      </div>
    );
  else {
    return (
      <div className="border-dashed border mx-2 rounded h-50 place-content-center">
        No Images <ImageIcon fontSize="medium" className="text-red-400" />
      </div>
    );
  }
}

function ImageCard({
  props,
}: {
  props: { img: ImageDataType; handleSelect: (url: string) => void };
}) {
  const { img, handleSelect } = props;
  return (
    <div
      onClick={() => handleSelect(img.url)}
      className="rounded flex flex-col gap-2 relative bg-zinc-900 border border-zinc-500
     hover:border-blue-400 shadow-xl contain-content"
    >
      <Image
        props={{
          src: `${img.url}`,
          alt: "icon",
          className: "object-cover aspect-square max-w-50",
        }}
      />
    </div>
  );
}
