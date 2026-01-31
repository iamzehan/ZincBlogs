import { CheckCircleRounded, Pending } from "@mui/icons-material";
import { useTogglePublish } from "../utils/query.hooks";

// This will allow us to toggle publish and unpublish blogs
export function PublishPills({ props }: { props: Blog }) {
  // unpack the props
  const { publish, id } = props;
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
        className="inline-flex gap-2 justify-center items-center w-25 min-w-25 rounded-full bg-zinc-800 px-3 py-1 text-xs font-medium text-zinc-100 border border-zinc-700"
      >
        Published{" "}
        <CheckCircleRounded fontSize="small" className="text-green-400" />
      </button>
    );
  } else {
    return (
      <button
        onClick={handlePublish}
        className="inline-flex justify-between items-center w-25 min-w-fit rounded-full bg-zinc-900 px-3 py-1 text-xs font-medium text-zinc-400 border border-zinc-800"
      >
        Draft <Pending fontSize="small" className="text-orange-500" />
      </button>
    );
  }
}
