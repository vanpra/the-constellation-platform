import classNames from "classnames";
import Image from "next/image";

interface GoogleButtonProps {
  text: string;
  className?: string;
  onClick?: () => void;
}

export function GoogleButton(props: GoogleButtonProps) {
  const { text, className, onClick } = props;
  return (
    <div
      className={classNames(
        "flex items-center justify-center",
        "px-4 py-2",
        "hover:bg-gray-200 cursor-pointer",
        "rounded-md border-2 border-solid border-primary",
        className
      )}
      onClick={onClick}
    >
      <Image src="/google_logo.svg" alt="me" width="24" height="24" />
      <p className="text-lg font-medium pl-4">{text}</p>
    </div>
  );
}
