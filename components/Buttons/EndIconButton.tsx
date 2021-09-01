import classNames from "classnames";

interface EndIconButtonProps {
  className?: string;
  label: string;
  value: string;
  children?: React.ReactNode;
  icon: React.ReactNode;
  onClick: () => void;
}

export default function EndIconButton(props: EndIconButtonProps) {
  const { className, label, value, children, icon, onClick } = props;

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
          {icon}
        </button>
        {children}
      </div>
    </div>
  );
}
