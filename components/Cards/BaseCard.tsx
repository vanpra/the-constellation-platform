import classNames from "classnames";

interface BaseCardProps {
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode;
}

export default function BaseCard(props: BaseCardProps) {
  const { className, onClick, children } = props;
  return (
    <div
      className={classNames(
        "flex flex-col",
        "w-full rounded-2xl",
        "pl-8 pr-8 pt-5 pb-5",
        "bg-background-light active:bg-background-dark shadow hover:cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
