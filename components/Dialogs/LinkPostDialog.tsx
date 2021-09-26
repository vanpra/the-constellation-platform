import classNames from "classnames";
import React, { useContext } from "react";
import DialogTitle from "./DialogTitle";
import BaseDialog, { DialogSize } from "./BaseDialog";
import Tick from "../../assets/tick.svg";
import { usePreviousLinkPosts } from "../../utils/supabase/db";
import { UserContext } from "../../pages/_app";
import ErrorDataLayout from "../Scaffolds/ErrorDataScaffold";
import DialogButton from "../Buttons/DialogButton";
import { SaltStage } from "../../utils/salt";

interface LinkPostDialogProps {
  selected?: { id: number; title: string };
  setSelected: (post: { id: number; title: string }) => void;
  saltStage: SaltStage;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function LinkPostDialog(props: LinkPostDialogProps) {
  const { selected, setSelected, saltStage, isOpen, setIsOpen } = props;
  const user = useContext(UserContext);
  // TODO: Add null check on user
  const { posts, error } = usePreviousLinkPosts(saltStage.id, user?.id);

  return (
    <BaseDialog
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      size={DialogSize.ExtraExtraLarge}
    >
      <DialogTitle text="Select a previous article to link to" />
      <ErrorDataLayout error={error} data={posts}>
        <div className="flex flex-col mt-4 overflow-y-auto">
          {posts?.length == 0 && (
            <p className="mb-6 mt-2 text-2xl text-error text-center">
              You have no previous posts to link to.
              <br />
              Please try again after adding more posts.
            </p>
          )}
          {posts?.map((post, index) => (
            <button
              key={index}
              className={classNames(
                "flex flex-row py-4 px-2 justify-between items-center",
                "hover:bg-gray-200 max-w-full"
              )}
              onClick={() => {
                if (post.id) {
                  setSelected({ id: post.id, title: post.title });
                }
                setIsOpen(false);
              }}
            >
              {/*TODO: Handle case where text is too long */}
              <div className="flex flex-col items-start mr-4">
                <p className="text-2xl">{post.title}</p>
                <p className="text-xl">{post.description}</p>
              </div>
              {selected?.id == post.id && (
                <Tick
                  width="30"
                  height="30"
                  className="fill-current text-primary flex-none"
                />
              )}
            </button>
          ))}
        </div>
      </ErrorDataLayout>
      <div className="flex gap-x-2">
        <DialogButton
          className="flex-1"
          text="Close"
          onClick={() => setIsOpen(false)}
        />
      </div>
    </BaseDialog>
  );
}
