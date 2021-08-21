import React from "react";
import countries, { Country } from "../../utils/countries";
import DropdownButton from "./DropdownButton";
import DropdownOption from "./DropdownOption";
import Dropdown from "./Dropdown";

interface CountryDropdownProps {
  selected: Country;
  onChange: (selected: Country) => void;
}

export default function CountryDropdown(props: CountryDropdownProps) {
  const { selected, onChange } = props;
  return (
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
  );
}
