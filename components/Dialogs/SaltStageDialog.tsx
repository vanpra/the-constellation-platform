import classNames from "classnames";
import React from "react";
import DialogTitle from "./DialogTitle";
import BaseDialog, { DialogSize } from "./BaseDialog";
import Tick from "../../assets/tick.svg";
import { SaltStage } from "../../utils/salt";

interface SaltStageDialogProps {
  stages: SaltStage[];
  selected: SaltStage;
  setSelected: (saltStage: SaltStage) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function SaltStageDialog(props: SaltStageDialogProps) {
  const { stages, selected, setSelected, isOpen, setIsOpen } = props;

  return (
    <BaseDialog
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      size={DialogSize.ExtraExtraLarge}
    >
      <DialogTitle text="Select a SALT stage" />
      <div className="flex flex-col mt-4 overflow-y-auto">
        {stages.map((stage) => (
          <button
            key={stage.id}
            className={classNames(
              "flex flex-row py-4 px-2 justify-between",
              "hover:bg-gray-200"
            )}
            onClick={() => {
              setSelected(stage);
              setIsOpen(false);
            }}
          >
            <p className="text-2xl">{stage.name}</p>
            {selected.id == stage.id && (
              <Tick className="fill-current text-primary mr-4 w-8 h-8" />
            )}
          </button>
        ))}
      </div>
    </BaseDialog>
  );
}
