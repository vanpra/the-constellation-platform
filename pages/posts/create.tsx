import { Editor } from "@tinymce/tinymce-react";
import React, { useState } from "react";
import EditIcon from "../../assets/edit.svg";
import ExpandButton from "../../components/Buttons/ExpandButton";
import SaltStageDialog from "../../components/Dialogs/SaltStageDialog";
import TopicsDialog from "../../components/Dialogs/TopicsDialog";
import TextArea from "../../components/Inputs/TextArea";
import PageScaffold from "../../components/Scaffolds/PageScaffold";
import Topic from "../../models/Topic";
import { saltStages } from "../../utils/salt";
import { supabase } from "../../utils/supabase/supabaseClient";

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

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [topic, setTopic] = useState<Topic>(topics[0]);
  const [saltStage, setSaltStage] = useState(0);

  const [showTopicsDialog, setShowTopicsDialog] = useState(false);
  const [showSaltStageDialog, setShowSaltStageDialog] = useState(false);

  return (
    <PageScaffold
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

      <div className="flex flex-row gap-x-5 pt-2">
        <ExpandButton
          className="flex-1"
          label="Post topic"
          value={topic.title}
          onClick={() => setShowTopicsDialog(true)}
        />
        <ExpandButton
          className="flex-1"
          label="SALT stage"
          value={saltStage + ": " + saltStages[saltStage]}
          onClick={() => setShowSaltStageDialog(true)}
        />
      </div>

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
    </PageScaffold>
  );
}
