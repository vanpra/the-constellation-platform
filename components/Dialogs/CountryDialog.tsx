import classNames from "classnames";
import React, { useState } from "react";
import DialogTitle from "./DialogTitle";
import BaseDialog, { DialogSize } from "./BaseDialog";
import Tick from "../../assets/tick.svg";
import { Country } from "../../utils/countries";
import DialogTextInput from "../Inputs/DialogTextInput";
import SimpleBar from "simplebar-react";
import "simplebar/src/simplebar.css";

interface CountryDialogProps {
  countries: Country[];
  selected: Country;
  setSelected: (topic: Country) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function CountryDialog(props: CountryDialogProps) {
  const { countries, selected, setSelected, isOpen, setIsOpen } = props;
  const [search, setSearch] = useState("");

  return (
    <BaseDialog
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      size={DialogSize.ExtraExtraLarge}
    >
      <DialogTitle text="Select a topic" />
      <DialogTextInput
        className="mt-3"
        value={search}
        setValue={setSearch}
        placeholder="Search"
      />

      <SimpleBar
        forceVisible="y"
        autoHide={false}
        style={{ maxHeight: "60vh" }}
        className="mt-4"
      >
        {countries
          .filter((country) =>
            country.name.toLowerCase().startsWith(search.toLowerCase())
          )
          .map((country) => (
            <button
              key={country.code}
              className={classNames(
                "flex flex-row w-full py-2 px-2 items-center justify-between",
                "hover:bg-gray-200"
              )}
              onClick={() => {
                setSelected(country);
                setIsOpen(false);
              }}
            >
              <div className="flex flex-col items-start">
                <p className="text-2xl">{country.name}</p>
              </div>
              {selected == country && (
                <Tick className="fill-current text-primary mr-4 w-8 h-8" />
              )}
            </button>
          ))}
      </SimpleBar>
    </BaseDialog>
  );
}
