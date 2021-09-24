import classNames from "classnames";
import React, { useState } from "react";
import MoreOptionsDateRange from "./DateRange";
import MoreOptionsTags from "./Tags";

interface MoreOptionsProps {
  className?: string;
}

export default function MoreOptions(props: MoreOptionsProps) {
  const { className } = props;
  const [from, setFrom] = useState<string>(new Date().toISOString());
  const [to, setTo] = useState<string>(new Date().toISOString());
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState<string>("");

  return (
    <div className={classNames("ml-4 mr-4", className)}>
      <MoreOptionsDateRange
        from={from}
        setFrom={setFrom}
        to={to}
        setTo={setTo}
      />

      <MoreOptionsTags
        tags={tags}
        setTags={setTags}
        newTag={newTag}
        setNewTag={setNewTag}
      />
    </div>
  );
}
