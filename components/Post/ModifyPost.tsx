import { Editor } from "@tinymce/tinymce-react";
import classNames from "classnames";
import React, { useState } from "react";
import Add from "../../assets/add.svg";
import CloseIcon from "../../assets/close.svg";
import LinkIcon from "../../assets/link.svg";
import UnfoldMoreIcon from "../../assets/unfold.svg";
import { RedRoundedButton } from "../../components/Buttons";
import { ChipList } from "../../components/Buttons/Chip";
import EndIconButton from "../../components/Buttons/EndIconButton";
import LinkPostDialog from "../../components/Dialogs/LinkPostDialog";
import SaltStageDialog from "../../components/Dialogs/SaltStageDialog";
import TopicsDialog from "../../components/Dialogs/TopicsDialog";
import TextArea from "../../components/Inputs/TextArea";
import TextInput from "../../components/Inputs/TextInput";
import { InternalPost } from "../../models/Post";
import Topic from "../../models/Topic";
import { saltStages } from "../../utils/salt";

interface ModifyPostProps {
  post: InternalPost;
  setPost: (post: InternalPost) => void;
  topics: Topic[];
  saveBtn: React.ReactNode;
}

export default function ModifyPost(props: ModifyPostProps) {
  const { post, setPost, saveBtn, topics } = props;

  const [currentTag, setCurrentTag] = useState("");

  const [showTopicsDialog, setShowTopicsDialog] = useState(false);
  const [showSaltStageDialog, setShowSaltStageDialog] = useState(false);
  const [showPostLinkDialog, setShowPostLinkDialog] = useState(false);

  return (
    <>
      <TextArea
        inputClassName="h-20 text-4xl rounded-xl shadow-sm"
        value={post.title}
        setValue={(title: string) => setPost({ ...post, title })}
        placeholder="Article Title"
      />
      <TextArea
        className="mt-3 mb-3"
        inputClassName="text-xl rounded-xl shadow-sm resize-none"
        value={post.description}
        setValue={(description: string) =>
          setPost({ ...post, description: description })
        }
        placeholder="Article Description"
      />

      <Editor
        value={post.content}
        onEditorChange={(content: string) => setPost({ ...post, content })}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen table save preview",
            "insertdatetime image media table paste code help wordcount",
          ],
          toolbar:
            "undo redo | " +
            "bold italic underline | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "image media table | removeformat | help",
          content_style:
            "body { font-family:Livvic,Arial,sans-serif; font-size:18px }",
        }}
        tinymceScriptSrc="/js/tinymce/tinymce.min.js"
      />

      <p className="px-1 text-xl font-medium mt-4">Knowledge Assets</p>
      <p className="px-1 text-md font-medium mt-1 mb-2">
        A <span className="font-bold">knowledge asset</span> is a collection of
        shared, common knowledge which is continuously developed and grown over
        time. Learn more{" "}
        <a
          className="text-blue-600"
          target="_blank"
          rel="noreferrer"
          href="https://sites.google.com/a/communitylifecompetence.org/tools-for-learning/home/knowledge-asset"
        >
          here
        </a>
        !
      </p>
      <div className="flex flex-col gap-y-2">
        {post.knowledgeAssets.length > 0 ? (
          post.knowledgeAssets.map((asset, index) => {
            return (
              <div className="flex flex-row items-center gap-x-4" key={index}>
                <TextInput
                  className="flex-1"
                  inputClassName="rounded-lg"
                  placeholder="If we ..."
                  value={asset}
                  setValue={(newAsset: string) =>
                    setPost({
                      ...post,
                      knowledgeAssets: [
                        ...post.knowledgeAssets.slice(0, index),
                        newAsset,
                        ...post.knowledgeAssets.slice(index + 1),
                      ],
                    })
                  }
                />
                <CloseIcon
                  width="24"
                  height="24"
                  className={classNames(
                    "fill-current text-primary",
                    "hover:cursor-pointer"
                  )}
                  onClick={() =>
                    setPost({
                      ...post,
                      knowledgeAssets: [
                        ...post.knowledgeAssets.slice(0, index),
                        ...post.knowledgeAssets.slice(index + 1),
                      ],
                    })
                  }
                />
              </div>
            );
          })
        ) : (
          <p className="mt-2 text-lg">No knowledge assets added</p>
        )}
      </div>

      <RedRoundedButton
        className="mt-4 py-2"
        text="Add another knowledge asset"
        icon={
          <Add
            height="24"
            width="24"
            className={classNames("fill-current text-white")}
          />
        }
        onClick={() =>
          setPost({
            ...post,
            knowledgeAssets: [...post.knowledgeAssets, ""],
          })
        }
      />

      <EndIconButton
        className="mt-3"
        label="Post topic"
        value={post?.topic?.title ?? ""}
        onClick={() => setShowTopicsDialog(true)}
        icon={
          <UnfoldMoreIcon
            width="24"
            height="24"
            className="fill-current text-gray-400"
            aria-hidden="true"
          />
        }
      />

      <div className="flex gap-x-3">
        <EndIconButton
          className="mt-3 flex-1"
          label="SALT stage"
          value={post.saltStage.id + ": " + post.saltStage.name}
          onClick={() => setShowSaltStageDialog(true)}
          icon={
            <UnfoldMoreIcon
              width="24"
              height="24"
              className="fill-current text-gray-400"
              aria-hidden="true"
            />
          }
        >
          {post.saltStage.id != 0 &&
            post.saltStage.id != 1 &&
            !post.previousPost && (
              <RedRoundedButton
                icon={
                  <LinkIcon
                    width="24"
                    height="24"
                    className="fill-current text-white"
                  />
                }
                text="Link previous post"
                onClick={() => setShowPostLinkDialog(true)}
              />
            )}
        </EndIconButton>

        {post.previousPost && (
          <EndIconButton
            className="mt-3 flex-1"
            label="Previous SALT post"
            value={post.previousPost.title}
            onClick={() => setShowPostLinkDialog(true)}
            icon={
              <CloseIcon
                width="24"
                height="24"
                className="fill-current text-gray-400"
                aria-hidden="true"
                onClick={(e: Event) => {
                  e.stopPropagation();
                  setPost({ ...post, previousPost: undefined });
                }}
              />
            }
          />
        )}
      </div>

      <p className="px-1 py-1 text-xl font-medium mt-2">Post tags</p>
      <div className=" flex flex-row gap-x-4">
        <TextInput
          className="flex-1"
          inputClassName="rounded-lg"
          placeholder="eg. Education, Medical, ..."
          value={currentTag}
          setValue={setCurrentTag}
          onEnter={() => {
            if (currentTag != "") {
              setPost({ ...post, tags: [...post.tags, currentTag] });
              setCurrentTag("");
            }
          }}
        />
        <RedRoundedButton
          text="Add Tag"
          onClick={() => {
            if (currentTag != "") {
              setPost({ ...post, tags: [...post.tags, currentTag] });
              setCurrentTag("");
            }
          }}
        />
      </div>

      <ChipList
        tags={post.tags}
        setTags={(tags) => setPost({ ...post, tags: tags })}
      />

      {saveBtn}

      <TopicsDialog
        topics={topics}
        isOpen={showTopicsDialog}
        setIsOpen={setShowTopicsDialog}
        selected={post?.topic}
        setSelected={(topic) => setPost({ ...post, topic: topic })}
      />
      <SaltStageDialog
        stages={saltStages}
        isOpen={showSaltStageDialog}
        setIsOpen={setShowSaltStageDialog}
        selected={post.saltStage}
        setSelected={(saltStage) => setPost({ ...post, saltStage })}
      />
      <LinkPostDialog
        selected={post.previousPost}
        setSelected={(previousPost) => setPost({ ...post, previousPost })}
        saltStage={post.saltStage}
        isOpen={showPostLinkDialog}
        setIsOpen={setShowPostLinkDialog}
      />
    </>
  );
}
