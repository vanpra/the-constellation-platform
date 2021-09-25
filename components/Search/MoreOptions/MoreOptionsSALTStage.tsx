import React, { useState } from "react";
import UnfoldMoreIcon from "../../../assets/unfold.svg";
import EndIconButton from "../../Buttons/EndIconButton";
import { saltStages } from "../../../utils/salt";
import SaltStageDialog from "../../Dialogs/SaltStageDialog";

interface MoreOptionsSaltStageProps {
  className?: string;
}

export default function MoreOptionsSaltStage(props: MoreOptionsSaltStageProps) {
  const { className } = props;
  const filterSaltStages = ["Any", ...saltStages];
  const [saltStage, setSaltStage] = useState<number>(0);
  const [showSaltStageDialog, setShowSaltStageDialog] = useState(false);

  return (
    <div className={className}>
      <EndIconButton
        className="mt-3"
        label="SALT stage"
        value={filterSaltStages[saltStage]}
        onClick={() => setShowSaltStageDialog(true)}
        icon={
          <UnfoldMoreIcon
            width="24"
            height="24"
            className="fill-current text-gray-400"
            aria-hidden="true"
          />
        }
      />

      <SaltStageDialog
        stages={filterSaltStages}
        isOpen={showSaltStageDialog}
        setIsOpen={setShowSaltStageDialog}
        selected={saltStage}
        setSelected={setSaltStage}
      />
    </div>
  );
}
