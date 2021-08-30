import classNames from "classnames";
import { useCallback } from "react";

interface TextInputProps {
  className?: string;
  inputClassName?: string;

  type?: string;
  placeholder?: string;
  label?: string;
  maxLength?: number;
  onEnter?: () => void;

  value: string;
  setValue: (value: string) => void;
}

export default function TextInput(props: TextInputProps) {
  const {
    className,
    inputClassName,
    type,
    placeholder,
    label,
    maxLength,
    onEnter,
    value,
    setValue,
  } = props;
  const onChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      setValue(e.currentTarget.value);
    },
    [setValue]
  );

  return (
    <div className={className}>
      {label && <p className="px-1 py-1 text-xl font-medium">{label}</p>}
      <input
        className={classNames(
          "w-full py-3 px-4 leading-tight",
          "bg-white appearance-none border-2 border-white",
          "text-gray-700 font-medium",
          "focus:outline-none focus:ring focus:ring-primary",
          inputClassName
        )}
        id="inline-full-name"
        type={type ?? "text"}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        onKeyDown={(e) => {
          if (e.key === "Enter" && onEnter) {
            onEnter();
          }
        }}
      />
    </div>
  );
}
