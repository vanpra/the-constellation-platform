import classNames from "classnames";

interface DialogButtonProps {
  className?: string;
  text: string;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function DialogButton(props: DialogButtonProps) {
  const { className, text, onClick, disabled } = props;
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
        "disabled:bg-gray-300 disabled:text-gray-600 disabled:cursor-default",
        className
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
