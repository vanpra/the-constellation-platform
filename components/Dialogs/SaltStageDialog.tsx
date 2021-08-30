import classNames from "classnames";
import React from "react";
import { saltStages } from "../../utils/salt";
import DialogTitle from "../Titles/DialogTitle";
import BaseDialog, { DialogSize } from "./BaseDialog";
import Tick from "../../assets/tick.svg";

interface SaltStagetDialogProps {
  selected: number;
  setSelected: (saltStage: number) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function SaltStageDialog(props: SaltStagetDialogProps) {
  const { selected, setSelected, isOpen, setIsOpen } = props;

  return (
    <BaseDialog
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      size={DialogSize.ExtraExtraLarge}
    >
      <DialogTitle text="Select a SALT stage" />
      <div className="flex flex-col mt-4 overflow-y-auto">
        {saltStages.map((stage, index) => (
          <button
            key={index}
            className={classNames(
              "flex flex-row py-4 px-2 justify-between",
              "hover:bg-gray-200"
            )}
            onClick={() => {
              setSelected(index);
              setIsOpen(false);
            }}
          >
            <p className="text-2xl">
              {index}:{"  "}
              {stage}
            </p>
            {selected == index && (
              <Tick className="fill-current text-primary mr-4 w-8 h-8" />
            )}
          </button>
        ))}
      </div>
    </BaseDialog>
  );
}