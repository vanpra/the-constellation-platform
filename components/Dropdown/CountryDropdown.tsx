import React from "react";
import countries, { Country } from "../../utils/countries";
import DropdownButton from "./DropdownButton";
import DropdownOption from "./DropdownOption";
import Dropdown from "./Dropdown";

interface CountryDropdownProps {
  className?: string;
  selected: Country;
  onChange: (selected: Country) => void;
}

export default function CountryDropdown(props: CountryDropdownProps) {
  const { className, selected, onChange } = props;
  return (
    <div className={className}>
      <p className="px-1 py-1 text-xl font-medium">Country</p>
      <Dropdown
        data={countries}
        button={<DropdownButton selected={selected.name} />}
        option={(country: Country) => (
          <DropdownOption
            key={country.code}
            option={country}
            getLabel={(op) => op.name}
          />
        )}
        selected={selected}
        onChange={onChange}
      />
    </div>
  );
}
