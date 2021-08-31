import { Editor } from "@tinymce/tinymce-react";
import classNames from "classnames";
import React, { useContext, useState } from "react";
import EditIcon from "../../assets/edit.svg";
import LinkIcon from "../../assets/link.svg";
import Upload from "../../assets/upload.svg";
import { RedRoundedButton } from "../../components/Buttons";
import Chip from "../../components/Buttons/Chip";
import ExpandButton from "../../components/Buttons/ExpandButton";
import LinkPostDialog from "../../components/Dialogs/LinkPostDialog";
import SaltStageDialog from "../../components/Dialogs/SaltStageDialog";
import TopicsDialog from "../../components/Dialogs/TopicsDialog";
import TextArea from "../../components/Inputs/TextArea";
import TextInput from "../../components/Inputs/TextInput";
import PageScaffold from "../../components/Scaffolds/PageScaffold";
import Post from "../../models/Post";
import Topic from "../../models/Topic";
import { saltStages } from "../../utils/salt";
import { supabase } from "../../utils/supabase/supabaseClient";
import CloseCircle from "../../assets/close_circle.svg";
import { createPost } from "../../utils/supabase/db";
import { useRouter } from "next/dist/client/router";
import { UserContext } from "../_app";

interface CreatePostPageProps {
  topics: Topic[];
}

export async function getStaticProps() {
  const { error, data } = await supabase.from("topics").select();

  if (error) {
    return {
      notFound: true,
      revalidate: 86400,
    };
  }

  return {
    props: {
      topics: data,
      revalidate: 86400,
    },
  };
}

export default function CreatePostPage(props: CreatePostPageProps) {
  const { topics } = props;

  const router = useRouter();
  const user = useContext(UserContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [topic, setTopic] = useState<Topic>(topics[0]);
  const [saltStage, setSaltStage] = useState<number>(0);
  const [previousPost, setPreviousPost] = useState<Post | undefined>(undefined);
  const [tags, setTags] = useState<string[]>([]);

  const [currentTag, setCurrentTag] = useState("");

  const [showTopicsDialog, setShowTopicsDialog] = useState(false);
  const [showSaltStageDialog, setShowSaltStageDialog] = useState(false);
  const [showPostLinkDialog, setShowPostLinkDialog] = useState(false);

  const [error, setError] = useState("");

  const onPublish = async () => {
    if (!user) {
      setError(
        "You must be logged in to publish a post. Please try again later."
      );
      return;
    }

    const { post_id, error } = await createPost({
      user_id: user.id,
      title,
      description,
      content,
      topic_id: topic.id,
      salt_stage: saltStage,
      tags,
      previous_salt_post_id: previousPost?.id,
    });

    if (error) {
      setError(error);
    } else {
      router.push(`/posts/${post_id}`);
    }
  };

  return (
    <PageScaffold
      className="mb-12"
      icon={<EditIcon width="50" height="50" />}
      title="Currently Editing..."
    >
      <TextArea
        inputClassName="h-20 text-4xl rounded-xl shadow-sm"
        value={title}
        setValue={setTitle}
        placeholder="Article Title"
      />
      <TextArea
        className="mt-3 mb-3"
        inputClassName="text-xl rounded-xl shadow-sm resize-none"
        value={description}
        setValue={setDescription}
        placeholder="Article Description"
      />

      <Editor
        value={content}
        onEditorChange={(content: string) => setContent(content)}
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

      <ExpandButton
        className="mt-3"
        label="Post topic"
        value={topic.title}
        onClick={() => setShowTopicsDialog(true)}
      />

      <ExpandButton
        className="mt-3"
        label="SALT stage"
        value={saltStage + ": " + saltStages[saltStage]}
        onClick={() => setShowSaltStageDialog(true)}
      >
        {saltStage != 0 && saltStage != 1 && (
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
      </ExpandButton>

      <p className="px-1 py-1 text-xl font-medium mt-3">Post tags</p>
      <TextInput
        inputClassName="rounded-lg"
        placeholder="eg. Education, Medical, ..."
        value={currentTag}
        setValue={setCurrentTag}
        onEnter={() => {
          setTags([...tags, currentTag]);
          setCurrentTag("");
        }}
      />

      {tags.length != 0 && (
        <div className="flex flex-wrap gap-x-3 mt-4">
          {tags.map((tag, index) => (
            <Chip
              key={index}
              label={tag}
              button={
                <CloseCircle
                  width="24"
                  height="24"
                  className={classNames(
                    "fill-current text-gray-400",
                    "hover:text-gray-500 hover:cursor-pointer"
                  )}
                  onClick={() => {
                    setTags(tags.filter((_, i) => i != index));
                  }}
                />
              }
            />
          ))}
        </div>
      )}

      <TopicsDialog
        isOpen={showTopicsDialog}
        setIsOpen={setShowTopicsDialog}
        topics={topics}
        selected={topic}
        setSelected={setTopic}
      />
      <SaltStageDialog
        isOpen={showSaltStageDialog}
        setIsOpen={setShowSaltStageDialog}
        selected={saltStage}
        setSelected={setSaltStage}
      />
      <LinkPostDialog
        selected={previousPost}
        setSelected={setPreviousPost}
        saltStage={saltStage}
        isOpen={showPostLinkDialog}
        setIsOpen={setShowPostLinkDialog}
      />

      <RedRoundedButton
        className="mt-6 py-3"
        text="Publish"
        icon={
          <Upload
            height="24"
            width="24"
            className={classNames("fill-current text-white")}
          />
        }
        onClick={onPublish}
      />
      {error && <p className="text-xl text-red-700 mt-4 mb-4">{error}</p>}
    </PageScaffold>
  );
}
