import classNames from "classnames";

interface DialogButtonProps {
  className: string;
  text: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function DialogButton(props: DialogButtonProps) {
  const { className, text, onClick } = props;
  return (
    <button
      type="button"
      className={classNames(
        "inline-block w-full px-4 py-2",
        "border border-transparent rounded-md",
        "bg-primary-lightest focus-visible:ring-primary-lightest",
        "hover:bg-primary-light",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary",
        "text-lg font-medium text-primary text-center p-0",
        className
      )}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
