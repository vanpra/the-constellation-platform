import React from "react";
import LoadingSpinner from "../Loading";

interface ErrorDataScaffold<T> {
  error?: string;
  data?: T;
  children?: React.ReactNode;
}

export default function ErrorDataLayout<T>(props: ErrorDataScaffold<T>) {
  const { error, data, children } = props;
  return (
    <>
      {error && !data && <p>{error}</p>}
      {data && children}
      {!data && !error && <LoadingSpinner />}
    </>
  );
}
