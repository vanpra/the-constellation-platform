import classNames from "classnames";

interface OrDividerProps {
  className?: string;
}

export default function OrDivider({ className }: OrDividerProps) {
  return (
    <div
      className={classNames(
        "flex items-center justify-center",
        className
      )}
    >
      <div className="flex-1 h-0.5 bg-black"></div>
      <p className="p-2 font-medium text-lg">OR</p>
      <div className="flex-1 h-0.5 bg-black"></div>
    </div>
  );
}
