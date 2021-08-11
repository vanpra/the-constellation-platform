import { User } from "@supabase/supabase-js";
import classnames from "classnames/dedupe";
import { useRouter } from "next/dist/client/router";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback } from "react";
import { supabase } from "../../utils/supabaseClient";
import { RedRoundedButton, TransparentRoundedButton } from "../Buttons";

interface NavbarProps {
  setShowLoginDialog: (show: boolean) => void;
  setShowSignupDialog: (show: boolean) => void;
  user?: User;
}
interface NavButtonProps {
  href: string;
  children: React.ReactNode;
}

const NavButton = ({ href, children }: NavButtonProps) => {
  const router = useRouter();
  const isActive = router.asPath === href;

  return (
    <Link href={href} passHref>
      <a
        className={classnames(
          "px-6 min-h-12 max-h-full",
          "flex flex-wrap content-center",
          isActive ? "text-primary" : "text-black",
          "text-2xl font-normal"
        )}
      >
        {children}
      </a>
    </Link>
  );
};

export default function Navbar(props: NavbarProps) {
  const { setShowLoginDialog, setShowSignupDialog, user } = props;
  const showLoginDialog = useCallback(
    () => setShowLoginDialog(true),
    [setShowLoginDialog]
  );
  const showSignupDialog = useCallback(
    () => setShowSignupDialog(true),
    [setShowSignupDialog]
  );
  const signOut = useCallback(() => {
    supabase.auth.signOut();
  }, []);

  return (
    <div className="flex justify-between items-center">
      <div className="flex">
        <div
          className={classnames("ml-4 mr-6 my-1", "flex-col justify-center")}
        >
          <Image
            src="/logo.svg"
            alt="The Constellation Logo"
            height={50}
            width={50}
          />
        </div>
        <NavButton href="/">Home</NavButton>
        <NavButton href="/topics">Topics</NavButton>
        <NavButton href="/search">Search</NavButton>
      </div>

      {user ? (
        <RedRoundedButton className="mr-4" text="Sign Out" onClick={signOut} />
      ) : (
        <div className="flex items-center">
          <TransparentRoundedButton
            className="mr-6"
            text="Login"
            onClick={showLoginDialog}
          />
          <RedRoundedButton
            className="mr-4"
            text="Signup"
            onClick={showSignupDialog}
          />
        </div>
      )}
    </div>
  );
}
