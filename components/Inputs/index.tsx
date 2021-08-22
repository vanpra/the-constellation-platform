import classNames from "classnames";
import { useCallback } from "react";

interface TextInputProps {
  className?: string;
  type?: string;
  placeholder?: string;
  label?: string;
  maxLength?: number;
  value: string;
  setValue: (value: string) => void;
}

export default function TextInput(props: TextInputProps) {
  const { className, type, placeholder, label, maxLength, value, setValue } =
    props;
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
          "w-full py-3 px-4 leading-tight",
          "bg-white rounded-lg shadow-sm appearance-none border-2 border-white",
          "text-gray-700 text-lg font-medium",
          "focus:outline-none focus:border-primary"
        )}
        id="inline-full-name"
        type={type ?? "text"}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
      />
    </div>
  );
}
