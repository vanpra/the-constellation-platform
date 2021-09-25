import { Dialog } from "@headlessui/react";
import classNames from "classnames";

interface DialogTitleProps {
  text: string;
}

export default function DialogTitle({ text }: DialogTitleProps) {
  return (
    <Dialog.Title
      as="h3"
      className={classNames("leading-6", "text-gray-900 font-medium text-3xl")}
    >
      {text}
    </Dialog.Title>
  );
}
