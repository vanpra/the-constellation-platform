import classNames from "classnames";
import React from "react";

interface RoundedButtonProps {
  text: string;
  className: string;
}

export function RedRoundedButton({ text, className }: RoundedButtonProps) {
  return (
    <button
      className={classNames(
        "py-2 px-5",
        "bg-primary hover:bg-primary-dark text-white text-xl font-bold",
        "rounded-full",
        className
      )}
    >
      {text}
    </button>
  );
}

export function TransparentRoundedButton({
  text,
  className,
}: RoundedButtonProps) {
  return (
    <button
      className={classNames(
        "py-2",
        "bg-transparent text-black font-bold text-xl",
        "rounded-full",
        className
      )}
    >
      {text}
    </button>
  );
}
