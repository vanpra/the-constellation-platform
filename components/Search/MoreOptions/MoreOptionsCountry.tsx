import React, { useState } from "react";
import countries, { anyCountry, Country } from "../../../utils/countries";
import UnfoldMoreIcon from "../../../assets/unfold.svg";
import EndIconButton from "../../Buttons/EndIconButton";
import CountryDialog from "../../Dialogs/CountryDialog";

interface MoreOptionsCountryProps {
  className?: string;
  country: Country;
  setCountry: (country: Country) => void;
}

export default function MoreOptionsCountry(props: MoreOptionsCountryProps) {
  const { className, country, setCountry } = props;
  const [showCountryDialog, setShowCountryDialog] = useState(false);

  return (
    <div className={className}>
      <EndIconButton
        className="mt-3"
        label="Country"
        value={country.name}
        onClick={() => setShowCountryDialog(true)}
        icon={
          <UnfoldMoreIcon
            width="24"
            height="24"
            className="fill-current text-gray-400"
            aria-hidden="true"
          />
        }
      />

      <CountryDialog
        countries={[anyCountry, ...countries]}
        isOpen={showCountryDialog}
        setIsOpen={setShowCountryDialog}
        selected={country}
        setSelected={setCountry}
      />
    </div>
  );
}
