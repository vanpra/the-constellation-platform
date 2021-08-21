import { Listbox } from "@headlessui/react";
import classNames from "classnames";
import { useMemo } from "react";
import Tick from "../../assets/tick.svg";

interface DropdownOptionProps<T> {
  option: T;
  getLabel: (option: T) => string;
}

export default function DropdownOption<T>(props: DropdownOptionProps<T>) {
  const { option, getLabel } = props;
  const label = useMemo(() => getLabel(option), [getLabel, option]);

  return (
    <Listbox.Option
      className={({ active }) =>
        `${active ? "text-primary-dark bg-primary-light" : "text-gray-900"}
        cursor-default select-none relative py-2 pl-10 pr-4`
      }
      value={option}
    >
      {({ selected }) => (
        <>
          <span
            className={`${
              selected ? "font-medium" : "font-normal"
            } block truncate`}
          >
            {label}
          </span>
          {selected && (
            <span
              className={classNames(
                "absolute inset-y-0 left-0 pl-2",
                "flex items-center",
                "text-primary "
              )}
            >
              <Tick className="w-6 h-6 fill-current" aria-hidden="true" />
            </span>
          )}
        </>
      )}
    </Listbox.Option>
  );
}
