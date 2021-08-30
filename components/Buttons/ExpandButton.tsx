import classNames from "classnames";
import UnfoldMore from "../../assets/unfold.svg";

interface ExpandButtonProps {
  className?: string;
  label: string;
  value: string;
  children?: React.ReactNode;
  onClick: () => void;
}

export default function ExpandButton(props: ExpandButtonProps) {
  const { className, label, value, children, onClick } = props;

  return (
    <div className={className}>
      {label && <p className="px-1 py-1 text-xl font-medium">{label}</p>}
      <div className="flex gap-x-4">
        <button
          className={classNames(
            "w-full py-2.5 pl-3 pr-4",
            "flex-1 flex flex-row justify-between items-center",
            "bg-white rounded-lg shadow-sm cursor-default",
            "text-left  sm:text-sm",
            "focus:outline-none focus:ring focus:ring-primary",
            "hover:cursor-pointer"
          )}
          onClick={onClick}
        >
          <p className="block truncate text-lg font-medium">{value}</p>
          <UnfoldMore
            className="w-5 h-5 fill-current text-gray-400"
            aria-hidden="true"
          />
        </button>
        {children}
      </div>
    </div>
  );
}
