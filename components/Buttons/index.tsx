import classNames from "classnames";
import React from "react";

interface RoundedButtonProps {
  text: string;
  icon?: React.ReactNode;
  className?: string;
  onClick?: (e?: React.MouseEvent<HTMLElement>) => void;
}

export function RedRoundedButton(props: RoundedButtonProps) {
  const { text, icon, className, onClick } = props;
  return (
    <button
      className={classNames(
        "flex justify-center items-center",
        "py-1",
        {
          "px-4": icon === undefined,
          "pr-4 pl-3": icon !== undefined,
        },
        "bg-primary hover:bg-primary-dark text-white text-xl font-normal",
        "rounded-full",
        className
      )}
      onClick={onClick}
    >
      {icon}
      {icon && <div className="w-1.5" />}
      {text}
    </button>
  );
}

export function TransparentRoundedButton(props: RoundedButtonProps) {
  const { text, icon, className, onClick } = props;
  return (
    <button
      className={classNames(
        "py-2",
        "bg-transparent text-black text-xl font-normal",
        "rounded-full",
        className
      )}
      onClick={onClick}
    >
      {icon}
      {text}
    </button>
  );
}
