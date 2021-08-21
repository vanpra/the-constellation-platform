import { useState } from "react";
import CountryDropdown from "../../../../components/Dropdown/CountryDropdown";
import countries from "../../../../utils/countries";

export default function EditProfilePage() {
  const [country, setCountry] = useState(countries[0]);

  return (
    <>
      <CountryDropdown
        selected={country}
        onChange={(selected) => setCountry(selected)}
      />
    </>
  );
}
