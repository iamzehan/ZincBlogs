import { CheckCircleRounded, Unpublished } from "@mui/icons-material";
import { useTogglePublish } from "../utils/query.hooks";

// This will allow us to toggle publish and unpublish blogs
export function PublishPills({ props }: { props: Blog }) {
  // unpack the props
  const { publish, id } = props;
  const { mutate, isPending } = useTogglePublish();

  const handlePublish = () => {
    mutate({
      id,
      publish: !publish?.status,
    });
  }

  if(isPending){
    <span
        className="inline-flex gap-2 justify-center items-center w-25 min-w-25 rounded-full bg-zinc-800 px-3 py-1 text-xs font-medium text-zinc-100 border border-zinc-700"
      >
        Wait...
      </span>
  }
  if (publish?.status) {
    return (
      <button
        onClick={handlePublish}
        className="active:*:scale-95 active:bg-zinc-600 
        transition-all duration-300 
        inline-flex gap-2 justify-center 
        items-center w-full h-full
        md:aspect-auto md:w-25 min-w-fit rounded-md md:rounded-full
         bg-zinc-700 px-3 py-1 text-xs font-medium text-zinc-100 border border-zinc-600"
      >
        Published
        <CheckCircleRounded fontSize="small" className="text-green-400 bg-zinc-600 rounded-full" />
      </button>
    );
  } else {
    return (
      <button
        onClick={handlePublish}
        className="active:*:scale-95
         active:bg-zinc-600 transition-all 
         duration-300 inline-flex justify-center gap-2 items-center 
         w-full h-full
        min-w-fit md:aspect-auto md:w-25 rounded-md md:rounded-full border
         bg-zinc-900 border-zinc-700 px-3 py-1 text-xs font-medium text-zinc-400"
      >
        Draft <Unpublished fontSize="small" className="text-red-500 bg-zinc-600 rounded-full" />
      </button>
    );
  }
}
