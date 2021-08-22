import React, { useCallback, useState } from "react";
import { supabase } from "../../utils/supabaseClient";
import DialogButton from "../Buttons/DialogButton";
import { GoogleButton } from "../Buttons/GoogleButtons";
import OrDivider from "../Dividers/OrDivider";
import DialogTextInput from "../Inputs/DialogTextInput";
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
  const [signInError, setSignInError] = useState<string | undefined>(undefined);

  const onSignIn = useCallback(
    async (google: boolean) => {
      setIsLoading(true);
      const { error } = google
        ? await supabase.auth.signIn({ provider: "google" })
        : await supabase.auth.signIn({ email, password });

      if (error) {
        setSignInError(error.message);
        setIsLoading(false);
      } else {
        setIsOpen(false);
      }
    },
    [email, password, setIsOpen]
  );

  return (
    <BaseDialog {...props} isLoading={isLoading}>
      <DialogTitle text="Login" />
      <DialogTextInput
        className="mt-8"
        placeholder="Email"
        value={email}
        setValue={setEmail}
      />
      <DialogTextInput
        className="mt-4"
        placeholder="Password"
        value={password}
        setValue={setPassword}
        type="password"
      />
      {signInError && <div className="mt-2 text-error">{signInError}</div>}
      <DialogButton
        className="mt-4 mr-2"
        text="Login with email"
        onClick={() => onSignIn(false)}
      />
      <OrDivider className="pt-1 pb-1" />
      <GoogleButton text="Login with Google" onClick={() => onSignIn(true)} />
    </BaseDialog>
  );
}
