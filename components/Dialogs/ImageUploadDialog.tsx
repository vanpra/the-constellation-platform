import React, { ChangeEvent, useRef, useState } from "react";
import DialogButton from "../Buttons/DialogButton";
import BaseDialog from "./BaseDialog";
import AvatarEditor from "react-avatar-editor";
import DialogTitle from "../Titles/DialogTitle";
import classNames from "classnames";
import UploadIcon from "../../assets/upload.svg";
import { getAvatarUrl, uploadTempAvatar } from "../../utils/supabase";
import OrDivider from "../Dividers/OrDivider";
import DialogTextInput from "../Inputs/DialogTextInput";

interface ImageUploadDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onUpload: (url: string, isUpload: boolean) => void;
  userId?: string;
}

//TODO: Handle errors on upload
export default function ImageUploadDialog(props: ImageUploadDialogProps) {
  const { setIsOpen, onUpload, userId } = props;
  const inputFileRef = useRef<HTMLInputElement>(null);
  const editorRef = useRef<AvatarEditor>(null);
  const [file, setFile] = useState<File | undefined>(undefined);
  const [zoom, setZoom] = useState(0);
  const [url, setUrl] = useState("");

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
            text="Upload Profile Picture"
            onClick={() => {
              if (editorRef.current) {
                editorRef.current.getImage().toBlob(
                  async (blob: Blob | null) => {
                    if (blob && userId) {
                      // TODO: Should not be giving emptry string to this
                      await uploadTempAvatar(userId, blob);
                      onUpload(
                        getAvatarUrl(userId, "private").publicURL!,
                        true
                      );
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
        <>
          <button
            className={classNames(
              "mt-6 h-52 w-full",
              "flex flex-col items-center justify-center",
              "border-4 border-gray-600 border-dashed rounded-xl"
            )}
            onClick={() => inputFileRef.current?.click()}
          >
            <UploadIcon width={60} height={60} />
            <p className="text-xl font-medium">Upload a new profile picture</p>
          </button>
          <OrDivider className="mt-2" />
          <DialogTextInput
            placeholder="http://..."
            label="Use image from URL"
            value={url}
            setValue={setUrl}
          />

          <DialogButton
            className="mt-3"
            text="Save URL Profile Picture"
            onClick={() => {
              if (url.match(/\.(jpg|jpeg|gif|png)$/) != null) {
                onUpload(url, false);
                setIsOpen(false);
              }
            }}
          />
        </>
      )}
    </BaseDialog>
  );
}
