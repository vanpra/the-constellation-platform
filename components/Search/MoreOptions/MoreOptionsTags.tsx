import React, { useState } from "react";
import { RedRoundedButton } from "../../Buttons";
import { ChipList } from "../../Buttons/Chip";
import TextInput from "../../Inputs/TextInput";

interface MoreOptionsTagsProps {
  className?: string;
  tags: string[];
  setTags: (tags: string[]) => void;
}

export default function MoreOptionsTags(props: MoreOptionsTagsProps) {
  const { className, tags, setTags } = props;
  const [newTag, setNewTag] = useState("");

  return (
    <div className={className}>
      <p className="text-xl">With tags:</p>
      <ChipList tags={tags} setTags={setTags} />
      <div className="flex gap-4 mt-1">
        <TextInput
          className="flex-1"
          inputClassName="rounded-lg"
          value={newTag}
          setValue={setNewTag}
          placeholder="Add post tags"
        />
        <RedRoundedButton
          text="Add Tag"
          onClick={() => {
            setTags([...tags, newTag]);
            setNewTag("");
          }}
        />
      </div>
    </div>
  );
}
