import classNames from "classnames";
import React from "react";

interface PageScaffoldProps {
  title?: string;
  className?: string;
  children?: React.ReactNode;
}

export default function PageScaffold(props: PageScaffoldProps) {
  const { title, className, children } = props;
  return (
    <div
      className={classNames(
        "flex flex-col self-center",
        "w-full max-w-6xl mt-8",
        className
      )}
    >
      {title && (
        <h1 className={classNames("font-medium text-5xl mb-8")}>{title}</h1>
      )}
      {children}
    </div>
  );
}
