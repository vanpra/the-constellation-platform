import classNames from "classnames";
import React, { ReactNode } from "react";

interface PageScaffoldProps {
  title?: string;
  icon?: ReactNode;
  className?: string;
  children?: React.ReactNode;
}

export default function PageScaffold(props: PageScaffoldProps) {
  const { title, icon, className, children } = props;
  return (
    <div
      className={classNames(
        "flex flex-col self-center",
        "w-full max-w-6xl mt-8",
        className
      )}
    >
      <div className="flex flex-row items-center  mb-8">
        {icon}
        {icon && <div className="w-3" />}
        {title && (
          <h1 className={classNames("font-medium text-5xl")}>{title}</h1>
        )}
      </div>

      {children}
    </div>
  );
}
