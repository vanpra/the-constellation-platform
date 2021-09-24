import classNames from "classnames";
import React from "react";
import TextInput from "../../Inputs/TextInput";

interface MoreOptionsDateRangeProps {
  className?: string;
  from: string;
  to: string;
  setFrom: (from: string) => void;
  setTo: (to: string) => void;
}

export default function MoreOptionsDateRange(props: MoreOptionsDateRangeProps) {
  const { className, from, to, setFrom, setTo } = props;
  return (
    <div className={classNames("flex items-center", className)}>
      <p className="mr-3 text-xl">Published between</p>
      <TextInput
        value={from}
        setValue={setFrom}
        type="date"
        inputClassName="rounded-lg text-md"
      />
      <p className="ml-3 text-xl mr-3">and</p>
      <TextInput
        value={to}
        setValue={setTo}
        type="date"
        inputClassName="rounded-lg text-md"
      />
    </div>
  );
}
