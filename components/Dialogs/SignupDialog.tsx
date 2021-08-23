import React, { useCallback, useState } from "react";
import { supabase } from "../../utils/supabase/supabaseClient";
import DialogButton from "../Buttons/DialogButton";
import { GoogleButton } from "../Buttons/GoogleButtons";
import OrDivider from "../Dividers/OrDivider";
import DialogTextInput from "../Inputs/DialogTextInput";
import DialogTitle from "../Titles/DialogTitle";
import BaseDialog, { DialogSize } from "./BaseDialog";

interface SignupDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function SignupDialog(props: SignupDialogProps) {
  const { setIsOpen } = props;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const onEmailSignup = useCallback(async () => {
    if (password != confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);
    const { user, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      setError(signUpError.message);
      setIsLoading(false);
      return;
    }

    await supabase
      .from("users")
      .update({ full_name: `${firstName.trim()} ${lastName.trim()}` })
      .match({ id: user?.id });

    setIsOpen(false);
  }, [confirmPassword, email, firstName, lastName, password, setIsOpen]);

  const onGoogleSignUp = useCallback(async () => {
    setIsLoading(true);
    const { error: signUpError } = await supabase.auth.signIn({
      provider: "google",
    });

    if (signUpError) {
      setError(signUpError.message);
      setIsLoading(false);
    } else {
      setIsOpen(false);
    }
  }, [setIsOpen, setError, setIsLoading]);

  return (
    <BaseDialog {...props} isLoading={isLoading} size={DialogSize.ExtraLarge}>
      <DialogTitle text="Signup" />
      <div className="mt-8 flex gap-x-5">
        <DialogTextInput
          placeholder="First Name"
          value={firstName}
          setValue={setFirstName}
        />
        <DialogTextInput
          placeholder="Last Name"
          value={lastName}
          setValue={setLastName}
        />
      </div>
      <DialogTextInput
        className="mt-4"
        placeholder="Email"
        value={email}
        setValue={setEmail}
      />
      <div className="mt-4 flex gap-x-5">
        <DialogTextInput
          placeholder="Password"
          value={password}
          setValue={setPassword}
          type="password"
        />
        <DialogTextInput
          placeholder="Confirm Password"
          value={confirmPassword}
          setValue={setConfirmPassword}
          type="password"
        />
      </div>
      {error && <div className="mt-2 text-error">{error}</div>}
      <DialogButton
        className="mt-4 mr-2"
        text="Signup with Email"
        onClick={onEmailSignup}
      />
      <OrDivider className="pt-1 pb-1" />
      <GoogleButton text="Signup with Google" onClick={onGoogleSignUp} />
    </BaseDialog>
  );
}
