import { CheckCircleRounded, Pending } from "@mui/icons-material";

export function PublishPills({ props }: { props: Blog }) {
  const { publish } = props;
  if (publish.status) {
    return (
      <span className="inline-flex gap-2 justify-center items-center w-25 min-w-25 rounded-full bg-zinc-800 px-3 py-1 text-xs font-medium text-zinc-100 border border-zinc-700">
        Published{" "}
        <CheckCircleRounded fontSize="small" className="text-green-400" />
      </span>
    );
  } else {
    return (
      <span className="inline-flex justify-between items-center w-25 min-w-fit rounded-full bg-zinc-900 px-3 py-1 text-xs font-medium text-zinc-400 border border-zinc-800">
        Draft <Pending fontSize="small" className="text-orange-500" />
      </span>
    );
  }
}
