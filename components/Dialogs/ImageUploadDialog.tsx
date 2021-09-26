import React, { ChangeEvent, useCallback, useRef, useState } from "react";
import DialogButton from "../Buttons/DialogButton";
import BaseDialog from "./BaseDialog";
import AvatarEditor from "react-avatar-editor";
import DialogTitle from "./DialogTitle";
import classNames from "classnames";
import UploadIcon from "../../assets/upload.svg";
import { getAvatarUrl, uploadTempAvatar } from "../../utils/supabase/storage";
import OrDivider from "../Dividers/OrDivider";
import DialogTextInput from "../Inputs/DialogTextInput";

interface ImageUploadDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onUpload: (url: string, isUpload: boolean) => void;
  userId?: string;
}

export default function ImageUploadDialog(props: ImageUploadDialogProps) {
  const { setIsOpen, onUpload, userId } = props;
  const editorRef = useRef<AvatarEditor>(null);
  const [file, setFile] = useState<File | undefined>(undefined);
  const [zoom, setZoom] = useState(0);
  const [url, setUrl] = useState("");
  const [error, setError] = useState<string | undefined>(undefined);

  const onUploadSaveClick = useCallback(() => {
    if (editorRef.current) {
      editorRef.current.getImage().toBlob(
        async (blob: Blob | null) => {
          if (blob && userId) {
            const { error } = await uploadTempAvatar(userId, blob);

            if (error) {
              setError("Could not upload avatar. Please try again.");
              return;
            }

            const avatar = getAvatarUrl(userId, "private").publicURL;

            if (!avatar) {
              setError(
                "Couldn't get uploaded URL. Please try uploading again."
              );
              return;
            }

            onUpload(avatar, true);
            setIsOpen(false);
          }
        },
        "image/jpeg",
        0.7
      );
    }
  }, [onUpload, setIsOpen, userId]);
  const onURLSaveClick = useCallback(() => {
    if (url.match(/\.(jpg|jpeg|gif|png)$/) != null) {
      onUpload(url, false);
      setIsOpen(false);
    } else {
      setError("Invalid image URL given");
    }
  }, [onUpload, setIsOpen, url]);

  return (
    <BaseDialog {...props}>
      <DialogTitle text="Change Profile Picture" />
      {error && <p className="text-xl text-red-700 mt-2 mb-2">{error}</p>}
      {file ? (
        <div className="mt-4 flex flex-col items-center">
          <PictureEditorLayout
            file={file}
            editorRef={editorRef}
            zoom={zoom}
            setZoom={setZoom}
          />
          <DialogButton
            text="Upload Profile Picture"
            onClick={onUploadSaveClick}
          />
        </div>
      ) : (
        <>
          <SelectImageLayout
            url={url}
            setUrl={setUrl}
            setFile={setFile}
            setError={setError}
          />
          <DialogButton
            className="mt-3"
            text="Save URL Profile Picture"
            onClick={onURLSaveClick}
          />
        </>
      )}
    </BaseDialog>
  );
}

interface SelectImageLayoutProps {
  url: string;
  setUrl: (url: string) => void;
  setFile: (file: File) => void;
  setError: (error: string | undefined) => void;
}

function SelectImageLayout(props: SelectImageLayoutProps) {
  const { url, setUrl, setFile, setError } = props;
  const inputFileRef = useRef<HTMLInputElement>(null);

  return (
    <>
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
            setError("Please provide a valid image file.");
          }
        }}
      />

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
    </>
  );
}

interface PictureEditorLayoutProps {
  file: File;
  editorRef: React.RefObject<AvatarEditor>;
  zoom: number;
  setZoom: (zoom: number) => void;
}

function PictureEditorLayout(props: PictureEditorLayoutProps) {
  const { file, editorRef, zoom, setZoom } = props;
  return (
    <>
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
    </>
  );
}
