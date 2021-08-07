import { Dialog } from "@headlessui/react";
import classNames from "classnames";
import React, { useCallback } from "react";
import BaseDialog from "./BaseDialog";

interface SignupDialogProps {
  isOpen: boolean,
  setIsOpen: (isOpen: boolean) => void
}

export default function SignupDialog(props: SignupDialogProps) {
  const { setIsOpen } = props 
  const closeModal = useCallback(() => setIsOpen(false), [setIsOpen])

  return (
    <BaseDialog {...props}>
      <div
        className={classNames(
          "w-full max-w-md p-6 my-8",
          "inline-block align-middle overflow-hidden text-left transform",
          " bg-white shadow-xl rounded-2xl"
        )}
      >
        <Dialog.Title
          as="h3"
          className={classNames(
            "leading-6",
            "text-gray-900 font-medium text-3xl"
          )}
        >
          Signup
        </Dialog.Title>

        <input
          className={classNames(
            "w-full py-2 px-4 leading-tight",
            "appearance-none border-2",
            "bg-gray-200  border-gray-200 rounded text-gray-700",
            "focus:outline-none focus:bg-white focus:border-purple-500"
          )}
          id="inline-full-name"
          type="text"
          value="Jane Doe"
        />

        <div className="mt-4">
          <button
            type="button"
            className={classNames(
              "inline-flex justify-center px-4 py-2",
              "text-sm font-medium text-blue-900",
              "bg-blue-100 border border-transparent rounded-md",
              "hover:bg-blue-200",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
            )}
            onClick={closeModal}
          >
            Got it, thanks!
          </button>
        </div>
      </div>
    </BaseDialog>
  );
}
