import classNames from "classnames";
import React, { useState } from "react";
import AddIcon from "../../assets/add.svg";
import LinkedJointLesson from "../../models/LinkedJointLesson";
import { useJointLessons } from "../../utils/supabase/db";
import { RedRoundedButton } from "../Buttons";
import DialogTextInput from "../Inputs/DialogTextInput";
import ErrorDataLayout from "../Scaffolds/ErrorDataScaffold";
import BaseDialog, { DialogSize } from "./BaseDialog";
import DialogTitle from "./DialogTitle";

interface JointLessonDialogProps {
  topicId: string;
  onJointLessonClick: (jointLessons: LinkedJointLesson) => void;
  onNewJointLesson: (jointLesson: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function JointLessonDialog(props: JointLessonDialogProps) {
  const { topicId, onJointLessonClick, onNewJointLesson, isOpen, setIsOpen } =
    props;
  const { error, jointLessons } = useJointLessons(topicId);
  const [addNewLesson, setAddNewLesson] = useState(false);

  return (
    <BaseDialog
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      size={DialogSize.ExtraExtraLarge}
    >
      <DialogTitle text="Add Knowledge Asset to Joint Lesson" />
      <ErrorDataLayout error={error} data={jointLessons}>
        {addNewLesson ? (
          <NewJointLesson
            setDialogIsOpen={setIsOpen}
            onNewJointLesson={onNewJointLesson}
            setAddNewLesson={setAddNewLesson}
          />
        ) : (
          <SelectJointLesson
            jointLessons={jointLessons}
            onJointLessonClick={onJointLessonClick}
            setDialogIsOpen={setIsOpen}
            setAddNewLesson={setAddNewLesson}
          />
        )}
      </ErrorDataLayout>
    </BaseDialog>
  );
}

interface NewJointLessonProps {
  setDialogIsOpen: (isOpen: boolean) => void;
  onNewJointLesson: (jointLesson: string) => void;
  setAddNewLesson: (addNewLesson: boolean) => void;
}

const NewJointLesson = (props: NewJointLessonProps) => {
  const { setDialogIsOpen, onNewJointLesson, setAddNewLesson } = props;
  const [newJointLesson, setNewJointLesson] = useState("");

  return (
    <>
      <DialogTextInput
        className="mt-4"
        value={newJointLesson}
        setValue={setNewJointLesson}
        placeholder="New Joint Lesson"
      />
      <div className="flex flex-row gap-x-4 mt-5">
        <RedRoundedButton
          className="flex-1"
          text="Add"
          onClick={() => {
            setDialogIsOpen(false);
            onNewJointLesson(newJointLesson);
            setAddNewLesson(false);
          }}
        />
        <RedRoundedButton
          className="flex-1"
          text="Cancel"
          onClick={() => {
            setAddNewLesson(false);
          }}
        />
      </div>
    </>
  );
};

interface SelectJointLessonProps {
  jointLessons?: LinkedJointLesson[];
  onJointLessonClick: (jointLessons: LinkedJointLesson) => void;
  setDialogIsOpen: (isOpen: boolean) => void;
  setAddNewLesson: (addNewLesson: boolean) => void;
}

const SelectJointLesson = (props: SelectJointLessonProps) => {
  const { jointLessons, onJointLessonClick, setDialogIsOpen, setAddNewLesson } =
    props;

  return (
    <div className="flex flex-col">
      <div className="flex flex-col mt-4 overflow-y-auto">
        {jointLessons?.length ?? 0 > 0 ? (
          jointLessons?.map((jointLesson, index) => (
            <button
              key={index}
              className={classNames(
                "flex flex-row py-2 px-2 items-center justify-between",
                "hover:bg-gray-200"
              )}
              onClick={() => {
                onJointLessonClick(jointLesson);
                setDialogIsOpen(false);
              }}
            >
              <div className="flex flex-col items-start">
                <p className="text-2xl">{jointLesson.lesson_title}</p>
              </div>
            </button>
          ))
        ) : (
          <p>
            No Joint Knowledge Assests have been created yet. Be the first by
            clicking the button below!
          </p>
        )}
      </div>
      <RedRoundedButton
        className="flex-1 mt-4"
        text="Create new Joint Knowledge Asset"
        onClick={() => setAddNewLesson(true)}
        icon={
          <AddIcon height="24" width="24" className="fill-current text-white" />
        }
      />
    </div>
  );
};
