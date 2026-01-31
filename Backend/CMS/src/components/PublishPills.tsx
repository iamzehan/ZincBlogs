import { CheckCircleRounded, Unpublished } from "@mui/icons-material";
import { useTogglePublish } from "../utils/query.hooks";
import { useIsMobile } from "../utils/hooks";

// This will allow us to toggle publish and unpublish blogs
export function PublishPills({ props }: { props: Blog }) {
  // unpack the props
  const { publish, id } = props;
  const isMobile = useIsMobile();
  const { mutate, isPending } = useTogglePublish();

  const handlePublish = () => {
    mutate({
      id,
      publish: !publish.status,
    });
  };
  if(isPending){
    <span
        className="inline-flex gap-2 justify-center items-center w-25 min-w-25 rounded-full bg-zinc-800 px-3 py-1 text-xs font-medium text-zinc-100 border border-zinc-700"
      >
        Wait...
      </span>
  }
  if (publish.status) {
    return (
      <button
        onClick={handlePublish}
        className="active:*:scale-95 active:bg-zinc-600 transition-all duration-300 inline-flex gap-2 justify-center items-center aspect-square md:aspect-auto md:w-25 min-w-fit rounded-md md:rounded-full bg-zinc-800 px-3 py-1 text-xs font-medium text-zinc-100 border border-zinc-700"
      >
        {!isMobile?"Published": null}
        <CheckCircleRounded fontSize="small" className="text-green-400 bg-zinc-600 rounded-full" />
      </button>
    );
  } else {
    return (
      <button
        onClick={handlePublish}
        className="active:*:scale-95 active:bg-zinc-600 transition-all duration-300 inline-flex justify-between items-center aspect-square min-w-fit md:aspect-auto md:w-25 rounded-md md:rounded-full bg-zinc-900 px-3 py-1 text-xs font-medium text-zinc-400 border border-zinc-800"
      >
        {!isMobile?"Draft": null} <Unpublished fontSize="small" className="text-red-500 bg-zinc-600 rounded-full" />
      </button>
    );
  }
}
