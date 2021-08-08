import { Dialog } from "@headlessui/react";
import { SupabaseClient } from "@supabase/supabase-js";
import classNames from "classnames";
import { useRouter } from "next/dist/client/router";
import React, { useCallback, useEffect, useState } from "react";
import { supabase } from "../../utils/supabaseClient";
import DialogButton from "../Buttons/DialogButton";
import DialogInput from "../Inputs/DialogInput";
import DialogTitle from "../Titles/DialogTitle";
import BaseDialog from "./BaseDialog";

interface LoginDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function LoginDialog(props: LoginDialogProps) {
  const { setIsOpen } = props;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [signInError, setSignInError] = useState<String | undefined>(undefined);

  const onClose = useCallback(async () => {
    setIsLoading(true);
    const { error } = await supabase.auth.signIn({
      email,
      password,
    });

    if (error) {
      setSignInError(error.message);
      setIsLoading(false);
    } else {
      setIsOpen(false);
    }
  }, [email, password, setIsOpen]);

  return (
    <BaseDialog {...props} isLoading={isLoading}>
      <DialogTitle text="Login" />
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
        type="password"
      />
      {signInError && <div className="mt-2 text-error">{signInError}</div>}
      <DialogButton className="mt-4 mr-2" text="Login" onClick={onClose} />
    </BaseDialog>
  );
}
