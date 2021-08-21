import classNames from "classnames";
import GoogleLogo from "../../assets/google_logo.svg";

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
      <GoogleLogo height="24" width="24" />
      <p className="text-lg font-medium pl-4">{text}</p>
    </div>
  );
}
