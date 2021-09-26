import React, { useState } from "react";
import EndIconButton from "../../Buttons/EndIconButton";
import UnfoldMoreIcon from "../../../assets/unfold.svg";
import TopicsDialog from "../../Dialogs/TopicsDialog";
import Topic, { anyTopic } from "../../../models/Topic";

interface MoreOptionsTopicProps {
  className?: string;
  topics: Topic[];
  topic: Topic;
  setTopic: (topic: Topic) => void;
}

export default function MoreOptionsTopic(props: MoreOptionsTopicProps) {
  const { className, topics, topic, setTopic } = props;
  const [showTopicsDialog, setShowTopicsDialog] = useState(false);

  return (
    <div className={className}>
      <EndIconButton
        className="mt-3"
        label="Post topic"
        value={topic.title}
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

      <TopicsDialog
        topics={[anyTopic, ...topics]}
        isOpen={showTopicsDialog}
        setIsOpen={setShowTopicsDialog}
        selected={topic}
        setSelected={setTopic}
      />
    </div>
  );
}
