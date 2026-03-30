import UploadModal from "../../UploadModal";
import { useState } from "react";
import { useUploadAndInsert } from "../../../utils/query.hooks";

// Wrapper for the upload modal (workaround for useMedia() hook)
export function UploadWrapper({
  props,
}: {
  props: {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setText: React.Dispatch<React.SetStateAction<string>>;
  };
}) {
  const { open, setOpen, setText } = props;
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setUploadStatus] = useState<boolean>(false);
  const uploadMutation = useUploadAndInsert();

  // handle upload with mutation
  const handleUpload = async (file: File): Promise<void> => {
    setUploadStatus(true);
    const url = await uploadMutation.mutateAsync(file);
    setUploadStatus(false);
    setOpen(false);
    setFile(null);
    setText((prev) =>
      prev ? `${prev}\n![image](${url})\n` : `![image](${url})\n`,
    );
  };

  return (
    <UploadModal
      props={{
        open,
        setOpen,
        file,
        setFile,
        onUpload: handleUpload,
        isUploading,
      }}
    />
  );
}
