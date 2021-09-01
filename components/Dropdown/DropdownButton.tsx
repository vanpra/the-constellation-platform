import { Listbox } from "@headlessui/react";
import classNames from "classnames";
import React from "react";
import UnfoldMore from "../../assets/unfold.svg";

interface DropdownButtonProps {
  selected: string;
}

export default function DropdownButton(props: DropdownButtonProps) {
  const { selected } = props;
  return (
    <Listbox.Button
      className={classNames(
        "w-full py-2.5 pl-3 pr-10",
        "bg-white rounded-lg shadow-sm cursor-default",
        "text-left  sm:text-sm",
        "focus:outline-none focus:ring focus:ring-primary"
      )}
    >
      <span className="block truncate text-lg font-medium">{selected}</span>
      <span
        className={classNames(
          "absolute pr-2 inset-y-0 right-0",
          "flex items-center",
          "pointer-events-none"
        )}
      >
        <UnfoldMore
          className="w-5 h-5 fill-current text-gray-400"
          aria-hidden="true"
        />
      </span>
    </Listbox.Button>
  );
}
