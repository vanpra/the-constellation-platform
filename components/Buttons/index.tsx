import classNames from "classnames";
import React from "react";

interface RoundedButtonProps {
  text: string;
  className: string;
  onClick: () => void;
}

export function RedRoundedButton(props: RoundedButtonProps) {
  const { text, className, onClick } = props;
  return (
    <button
      className={classNames(
        "py-1.5 px-5",
        "bg-primary hover:bg-primary-dark text-white text-2xl font-normal",
        "rounded-full",
        className
      )}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export function TransparentRoundedButton(props: RoundedButtonProps) {
  const { text, className, onClick } = props;
  return (
    <button
      className={classNames(
        "py-2",
        "bg-transparent text-black text-2xl font-normal",
        "rounded-full",
        className
      )}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
