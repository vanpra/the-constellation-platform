import classNames from "classnames";
import React, { useContext } from "react";
import DialogTitle from "../Titles/DialogTitle";
import BaseDialog, { DialogSize } from "./BaseDialog";
import Tick from "../../assets/tick.svg";
import Post from "../../models/Post";
import { usePreviousLinkPosts } from "../../utils/supabase/db";
import { UserContext } from "../../pages/_app";
import ErrorDataLayout from "../Scaffolds/ErrorDataScaffold";
import DialogButton from "../Buttons/DialogButton";

interface LinkPostDialogProps {
  selected?: Post;
  setSelected: (post: Post) => void;
  saltStage: number;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function LinkPostDialog(props: LinkPostDialogProps) {
  const { selected, setSelected, saltStage, isOpen, setIsOpen } = props;
  const user = useContext(UserContext);
  // TODO: Add null check on user
  const { posts, error } = usePreviousLinkPosts(saltStage, user?.id);

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
                "flex flex-row py-4 px-2 justify-between",
                "hover:bg-gray-200"
              )}
              onClick={() => {
                setSelected(post);
                setIsOpen(false);
              }}
            >
              <p className="text-2xl">{post.title}</p>
              {selected?.id == post.id && (
                <Tick className="fill-current text-primary mr-4 w-8 h-8" />
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
