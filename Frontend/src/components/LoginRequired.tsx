import { useLocation, useNavigate } from "react-router-dom";
import { Close } from "@mui/icons-material";
import { useAuth } from "../utils/hooks";

interface Props {
  open: boolean;
  setOpen: (val: boolean) => void;
}

export default function LoginPromptDialog({ open, setOpen }: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const {setLastPage}= useAuth();
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        onClick={() => setOpen(false)}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
      />

      {/* Dialog */}
      <div className="relative shadow-zinc-500/20 z-10 md:w-full max-w-sm bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-xl">
        {/* Close button */}
        <button
        title="Close"
          onClick={() => setOpen(false)}
          className="absolute top-0 right-0 bg-zinc-500 rounded-bl-[inherit] p-1 rounded-tr-[inherit] text-zinc-400 hover:text-zinc-200"
        >
          <Close />
        </button>

        {/* Content */}
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold text-zinc-100">
            Login Required
          </h2>

          <p className="text-sm text-zinc-400">
            You need to be logged in to perform this action.
          </p>

          {/* Actions */}
          <div className="flex justify-end gap-3 mt-2 *:flex-1">
            <button
              onClick={() => {
                setOpen(false);
                setLastPage(location.pathname);
                navigate("/login");
              }}
              className="flex justify-center items-center gap-2 px-4 py-2 text-sm rounded-lg bg-white text-black hover:bg-zinc-200 transition"
            >
              Login
            </button>
            <button
              onClick={() => setOpen(false)}
              className="px-4 py-2 text-sm rounded-lg bg-zinc-800 text-zinc-200 hover:bg-zinc-700 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
