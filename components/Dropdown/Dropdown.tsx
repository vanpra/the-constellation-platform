import { Listbox, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import countries, { Country } from "../../utils/countries";
import classNames from "classnames";
import DropdownButton from "./DropdownButton";
import DropdownOption from "./DropdownOption";

interface DropdownProps<T> {
  button: React.ReactNode;
  option: (option: T) => React.ReactNode;
  data: T[];
  selected: T;
  onChange: (selected: T) => void;
}

export default function Dropdown<T>(props: DropdownProps<T>) {
  const { button, option, data, selected, onChange } = props;
  return (
    <div className="w-72">
      <Listbox value={selected} onChange={onChange}>
        <div className="relative">
          {button}

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options
              className={classNames(
                "absolute w-full max-h-60  py-1 mt-1",
                "bg-white rounded-md shadow-lg",
                "overflow-auto text-base sm:text-sm",
                "ring-1 ring-black ring-opacity-5 focus:outline-none"
              )}
            >
              {data.map((item) => option(item))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
