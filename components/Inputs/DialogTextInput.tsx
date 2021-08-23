import classNames from "classnames";
import { useCallback } from "react";

interface DialogTextInputProps {
  className?: string;
  type?: string;
  placeholder?: string;
  label?: string;
  value: string;
  setValue: (value: string) => void;
}

export default function DialogTextInput(props: DialogTextInputProps) {
  const { className, type, placeholder, label, value, setValue } = props;
  const onChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      setValue(e.currentTarget.value);
    },
    [setValue]
  );

  return (
    <div className={className}>
      <p className="px-1 py-1 text-xl font-medium">{label}</p>
      <input
        className={classNames(
          "w-full py-4 px-4 leading-tight",
          "bg-gray-200 border-2 border-gray-200 rounded appearance-none",
          "text-black placeholder-gray-700 font-medium ",
          "focus:outline-none focus:bg-white focus:border-primary"
        )}
        id="inline-full-name"
        type={type ?? "text"}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
