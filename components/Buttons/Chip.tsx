import classNames from "classnames";

interface ChipProps {
  label: string;
  button?: React.ReactNode;
  onClick?: () => void;
}

export default function Chip(props: ChipProps) {
  const { label, button, onClick } = props;

  return (
    <div
      className={classNames(
        { "pl-5 pr-3": button },
        { "px-5": !button },
        "py-2",
        "flex flex-row items-center",
        "bg-white rounded-full shadow-sm content"
      )}
      onClick={onClick}
    >
      <p className="text-xl">{label}</p>
      {button && <div className="ml-1">{button}</div>}
    </div>
  );
}
