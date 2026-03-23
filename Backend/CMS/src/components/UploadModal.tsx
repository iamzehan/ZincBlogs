import { useState, useRef } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from "@mui/icons-material/Close";
import { AddAPhoto } from "@mui/icons-material";
import Button from "./Buttons";
import { useUploadMutation } from "../utils/query.hooks";

export default function UploadModal() {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const uploadFileMutation = useUploadMutation();

  const handleUpload = (f: File) => {
    uploadFileMutation.mutate(f);
    setOpen((prev)=> !prev);
  };
  const handleFile = (f: File) => {
    if (!f.type.startsWith("image/")) return;
    setFile(f);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files?.[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <>
      {/* Trigger button */}
      <Button
        key="write-btn"
        props={{
          type: "primary",
          fn: () => setOpen(true),
          additionalDesign: `
                        fixed bottom-2 right-10 z-10
                        bottom-10
                        self-end rounded-full md:rounded-lg`,
        }}
      >
        <p className="hidden md:block text-xl px-2">Upload</p>
        <AddAPhoto className="md:text-xl! text-4xl!" />
      </Button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-zinc-900 text-zinc-100 w-full max-w-md rounded-2xl p-6 relative shadow-xl">
            {/* Close */}
            <button
              onClick={() => {
                setOpen(false);
                setFile(null);
              }}
              className="absolute top-3 right-3 text-zinc-400 hover:text-white"
            >
              <CloseIcon />
            </button>

            <h2 className="text-lg font-semibold mb-4">Upload Image</h2>

            {/* Drop zone */}
            <div
              onClick={() => inputRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              className="border-2 border-dashed border-zinc-700 rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:border-zinc-500 transition"
            >
              <CloudUploadIcon
                className="text-zinc-400 mb-2"
                fontSize="large"
              />

              <p className="text-sm text-zinc-400">
                Drag & drop or{" "}
                <span className="text-white">click to upload</span>
              </p>

              <input
                ref={inputRef}
                type="file"
                hidden
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    handleFile(e.target.files[0]);
                  }
                }}
              />
            </div>

            {/* Preview */}
            {file && (
              <div className="mt-4">
                <p className="text-sm mb-2 text-zinc-400">Preview:</p>
                <img
                  src={URL.createObjectURL(file)}
                  alt="preview"
                  className="rounded-lg max-h-60 object-contain border border-zinc-700"
                />
              </div>
            )}

            {/* Actions */}
            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => {
                  setFile(null);
                  setOpen(false);
                }}
                className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700"
              >
                Cancel
              </button>

              <button
                disabled={!file}
                className="px-4 py-2 rounded-lg bg-white text-black hover:bg-zinc-200 disabled:opacity-50"
                onClick={() => {
                  if (!file) return;
                  handleUpload(file);
                }}
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
