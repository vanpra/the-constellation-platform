import classNames from "classnames";
import { useMemo } from "react";
import { stringHashCode } from "../../utils/string";

interface NameAvatarProps {
  className?: string;
  name?: string;
  onClick?: () => void;
}

const colors = [
  "bg-blue-500 hover:bg-blue-600",
  "bg-purple-500 hover:bg-purple-600",
  "bg-red-500 hover:bg-red-600",
  "bg-green-500 hover:bg-green-600",
];

export default function NameAvatar(props: NameAvatarProps) {
  const { className, name, onClick } = props;

  const initials = useMemo(
    () => {
      const firsts = name?.trim().split(/[ ]+/).map((name) => name[0]);
      if (firsts && firsts.length > 2) {
        console.log(firsts)
        return firsts[0] + firsts[firsts.length - 1];
      } else {
        return firsts?.join("") ?? "";
      }
    },
    [name]
  );
  const colorIndex = useMemo(
    () => stringHashCode(initials) % colors.length,
    [initials]
  );
  const backgroundStyle = useMemo(() => colors[colorIndex], [colorIndex]);
  return (
    <div
      className={classNames(
        "flex items-center justify-center",
        "rounded-full",
        backgroundStyle,
        "text-white text-lg",
        { "hover:cursor-pointer": onClick != undefined },
        className
      )}
      onClick={onClick}
    >
      {initials}
    </div>
  );
}
