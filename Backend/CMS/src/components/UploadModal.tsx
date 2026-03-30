// React Hooks
import { useRef } from "react";

// Icons
import { CloudUpload, Close, FileUpload } from "@mui/icons-material";

// Component
export default function UploadModal({
  props,
}: {
  props: {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    file: File | null;
    setFile: React.Dispatch<React.SetStateAction<File | null>>;
    onUpload: (file: File) => Promise<void>;
    isUploading?: boolean;
  };
}) {
  const { open, setOpen, file, setFile, onUpload, isUploading } = props;

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleUpload = async (f: File) => {
    await onUpload(f);
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
      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-100 p-4 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-zinc-900 text-zinc-100 w-full max-w-md rounded-2xl p-6 relative shadow-xl">
            {/* Close */}
            <button
              onClick={() => {
                setOpen(false);
                setFile(null);
              }}
              className="absolute top-0 right-0 bg-zinc-600 p-1 rounded-tr-2xl rounded-bl-xl text-zinc-400 hover:text-white"
            >
              <Close />
            </button>

            <h2 className="text-lg font-semibold mb-4">Upload Image</h2>

            {/* Drop zone */}
            <div
              onClick={() => inputRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              className="border-2 border-dashed border-zinc-700 rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:border-zinc-500 transition"
            >
              <CloudUpload className="text-zinc-400 mb-2" fontSize="large" />

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
                <div className="relative flex justify-center bg-black items-center border border-zinc-700 rounded-lg overflow-hidden max-h-60">
                  <p className="absolute text-sm mb-2 text-zinc-400 
                  top-0 pl-2 bg-black/50 left-0 text-left">
                    Preview:
                  </p>
                  <img
                    src={URL.createObjectURL(file)}
                    alt="preview"
                    className="max-h-60 object-contain"
                  />

                  {isUploading && (
                    <div className="absolute animate-pulse inset-0 bg-black/80 flex items-center justify-center gap-2 text-sm text-white">
                      Uploading...
                      <FileUpload className="animate-pulse" />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="mt-6 flex justify-end gap-2">
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

              <button
                onClick={() => {
                  setFile(null);
                  setOpen(false);
                }}
                className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
