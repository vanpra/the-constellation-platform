import React from "react";
import LoadingSpinner from "../Loading";

interface ErrorDataScaffold<T> {
  error?: string;
  data?: T;
  children?: React.ReactNode;
}

// TODO: Maybe move and rename this as its not exactly a scaffold
export default function ErrorDataScaffold<T>(props: ErrorDataScaffold<T>) {
  const { error, data, children } = props;
  return (
    <>
      {error && <p>{error}</p>}
      {data && children}
      {!data && !error && <LoadingSpinner />}
    </>
  );
}
