import { Dialog } from "@headlessui/react";
import classNames from "classnames";
import React, { useCallback, useState } from "react";
import DialogButton from "../Buttons/DialogButton";
import DialogInput from "../Inputs/DialogInput";
import BaseDialog from "./BaseDialog";

interface LoginDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function LoginDialog(props: LoginDialogProps) {
  const { setIsOpen } = props;

  const closeModal = useCallback(() => setIsOpen(false), [setIsOpen]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <BaseDialog {...props}>
      <Dialog.Title
        as="h3"
        className={classNames(
          "leading-6",
          "text-gray-900 font-medium text-3xl"
        )}
      >
        Login
      </Dialog.Title>

      <DialogInput
        className="mt-8"
        placeholder="Email"
        value={email}
        setValue={setEmail}
      />

      <DialogInput
        className="mt-4"
        placeholder="Password"
        value={password}
        setValue={setPassword}
      />

      <DialogButton className="mt-6 mr-2" text="Login" onClick={closeModal} />
    </BaseDialog>
  );
}
