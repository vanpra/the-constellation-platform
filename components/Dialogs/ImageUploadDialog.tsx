import React, { ChangeEvent, useRef, useState } from "react";
import DialogButton from "../Buttons/DialogButton";
import BaseDialog from "./BaseDialog";
import AvatarEditor from "react-avatar-editor";
import DialogTitle from "../Titles/DialogTitle";
import classNames from "classnames";
import AddIcon from "../../assets/add.svg";
import { uploadTempAvatar } from "../../utils/supabase";

interface ImageUploadDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onUpload: () => void;
  userId?: string;
}

//TODO: Handle errors on upload
export default function ImageUploadDialog(props: ImageUploadDialogProps) {
  const { setIsOpen, onUpload, userId } = props;
  const inputFileRef = useRef<HTMLInputElement>(null);
  const editorRef = useRef<AvatarEditor>(null);
  const [file, setFile] = useState<File | undefined>(undefined);
  const [zoom, setZoom] = useState(0);

  return (
    <BaseDialog {...props}>
      <DialogTitle text="Upload Image" />
      <input
        className="hidden"
        type="file"
        ref={inputFileRef}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          const files = event.target.files;
          const file = files ? files[0] : undefined;
          if (file?.type?.startsWith("image/")) {
            setFile(file);
          } else {
            console.log("Not an image");
          }
        }}
      />

      {file && (
        <div className="mt-4 flex flex-col items-center">
          <AvatarEditor
            image={file}
            ref={editorRef}
            borderRadius={100}
            scale={1 + zoom / 100}
            color={[255, 255, 255, 0.6]} // RGBA
          />
          <div className="flex items-center mt-2 mb-4">
            <p>Zoom: {String(zoom).padStart(3, " ")}%</p>
            <input
              className="ml-2"
              type="range"
              value={zoom}
              onChange={(event) => setZoom(parseInt(event.target.value))}
              min="0"
              max="100"
            />
          </div>

          <DialogButton
            text="Save Profile Picture"
            onClick={() => {
              if (editorRef.current) {
                editorRef.current.getImage().toBlob(
                  async (blob: Blob | null) => {
                    if (blob) {
                      // TODO: Should not be giving emptry string to this
                      await uploadTempAvatar(userId ?? "", blob);
                      onUpload();
                      setIsOpen(false);
                    }
                  },
                  "image/jpeg",
                  0.7
                );
              }
            }}
          />
        </div>
      )}

      {!file && (
        <button
          className={classNames(
            "mt-6 h-52 w-full",
            "flex flex-col items-center justify-center",
            "border-4 border-gray-600 border-dashed rounded-xl"
          )}
          onClick={() => inputFileRef.current?.click()}
        >
          <AddIcon width={60} height={60} />
          <p className="text-xl font-medium">Add a new profile picture</p>
        </button>
      )}
    </BaseDialog>
  );
}
