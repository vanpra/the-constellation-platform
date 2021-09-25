import classNames from "classnames";
import React, { useState } from "react";
import Topic from "../../../models/Topic";
import MoreOptionsCountry from "./MoreOptionsCountry";
import MoreOptionsDateRange from "./MoreOptionsDateRange";
import MoreOptionsSaltStage from "./MoreOptionsSALTStage";
import MoreOptionsTags from "./MoreOptionsTags";
import MoreOptionsTopic from "./MoreOptionsTopic";

interface MoreOptionsProps {
  className?: string;
  topics: Topic[];
}

export default function MoreOptions(props: MoreOptionsProps) {
  const { className, topics } = props;
  const [from, setFrom] = useState<string | undefined>(undefined);
  const [to, setTo] = useState<string | undefined>(undefined);
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

      <div className="flex flex-row gap-x-4">
        <MoreOptionsTopic className="flex-1" topics={topics} />
        <MoreOptionsCountry className="flex-1" />
      </div>

      <MoreOptionsSaltStage />
    </div>
  );
}
