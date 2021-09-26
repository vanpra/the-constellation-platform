import classNames from "classnames";
import React from "react";
import Topic from "../../models/Topic";
import DialogTitle from "./DialogTitle";
import BaseDialog, { DialogSize } from "./BaseDialog";
import Tick from "../../assets/tick.svg";

interface TopicsDialogProps {
  topics: Topic[];
  selected?: Topic;
  setSelected: (topic: Topic) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function TopicsDialog(props: TopicsDialogProps) {
  const { topics, selected, setSelected, isOpen, setIsOpen } = props;

  return (
    <BaseDialog
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      size={DialogSize.ExtraExtraLarge}
    >
      <DialogTitle text="Select a topic" />
      <div className="flex flex-col mt-4 overflow-y-auto">
        {topics.map((topic) => (
          <button
            key={topic.id}
            className={classNames(
              "flex flex-row py-2 px-2 items-center justify-between",
              "hover:bg-gray-200"
            )}
            onClick={() => {
              setSelected(topic);
              setIsOpen(false);
            }}
          >
            <div className="flex flex-col items-start">
              <p className="text-2xl">{topic.title}</p>
              <p className="text-lg">{topic.description}</p>
            </div>
            {selected == topic && (
              <Tick className="fill-current text-primary mr-4 w-10 h-10" />
            )}
          </button>
        ))}
      </div>
    </BaseDialog>
  );
}
