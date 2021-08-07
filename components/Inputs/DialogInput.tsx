import classNames from "classnames";
import { useCallback } from "react";

interface DialogInputProps {
  className?: string;
  placeholder?: string;
  value: string;
  setValue: (value: string) => void;
}

export default function DialogInput(props: DialogInputProps) {
  const { className, placeholder, value, setValue } = props;
  const onChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      setValue(e.currentTarget.value);
    },
    [setValue]
  );

  return (
    <input
      className={classNames(
        "w-full py-4 px-4 leading-tight",
        "bg-gray-200 border-2 border-gray-200 rounded appearance-none",
        "text-gray-700",
        "focus:outline-none focus:bg-white focus:border-primary",
        className
      )}
      id="inline-full-name"
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}
