import classNames from "classnames";
import { useCallback, useEffect, useRef } from "react";
import autosize from "autosize";

interface TextAreaProps {
  className?: string;
  inputClassName?: string;
  placeholder?: string;
  label?: string;
  maxLength?: number;
  value: string;
  setValue: (value: string) => void;
}

export default function TextArea(props: TextAreaProps) {
  const {
    className,
    inputClassName,
    placeholder,
    label,
    maxLength,
    value,
    setValue,
  } = props;

  const ref = useRef<HTMLTextAreaElement>(null);
  const onChange = useCallback(
    (e: React.FormEvent<HTMLTextAreaElement>) => {
      setValue(e.currentTarget.value);
    },
    [setValue]
  );

  useEffect(() => {
    if (ref.current) autosize(ref.current);
  }, [ref]);

  // Set text area height to min height as autosize sets it to right 1 line height
  return (
    <div className={className}>
      {label && <p className="px-1 py-1 text-xl font-medium">{label}</p>}
      <textarea
        className={classNames(
          "h-0 w-full px-4 py-4 leading-tight",
          "bg-white appearance-none border-2 border-white",
          "text-gray-700 font-medium",
          "focus:outline-none focus:ring focus:ring-primary",
          inputClassName
        )}
        ref={ref}
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          if (ref.current) autosize(ref.current);
          onChange(e);
        }}
        maxLength={maxLength}
      />
    </div>
  );
}
