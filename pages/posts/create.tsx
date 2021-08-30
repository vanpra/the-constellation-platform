import { Editor } from "@tinymce/tinymce-react";
import React, { useState } from "react";
import EditIcon from "../../assets/edit.svg";
import TextArea from "../../components/Inputs/TextArea";
import PageScaffold from "../../components/Scaffolds/PageScaffold";

export default function CreatePostPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");

  return (
    <PageScaffold
      icon={<EditIcon width="50" height="50" />}
      title="Currently Editing..."
    >
      <TextArea
        inputClassName="h-20 text-4xl rounded-xl shadow-md"
        value={title}
        setValue={setTitle}
        placeholder="Article Title"
      />
      <TextArea
        className="mt-3 mb-3"
        inputClassName="text-xl rounded-xl shadow-md resize-none"
        value={description}
        setValue={setDescription}
        placeholder="Article Description"
      />

      <Editor
        initialValue={content}
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
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
        tinymceScriptSrc="/js/tinymce/tinymce.min.js"
      />
    </PageScaffold>
  );
}
