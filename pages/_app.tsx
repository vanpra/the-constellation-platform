import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/Navbar";
import LoginDialog from "../components/Dialogs/LoginDialog";
import React, { useEffect, useState } from "react";
import SignupDialog from "../components/Dialogs/SignupDialog";
import { supabase } from "../utils/supabase/supabaseClient";
import { User } from "@supabase/supabase-js";
import classNames from "classnames";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import utc from "dayjs/plugin/utc";
import relativeTime from "dayjs/plugin/relativeTime";

export const UserContext = React.createContext<User | undefined>(undefined);

function MyApp({ Component, pageProps }: AppProps) {
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [showSignupDialog, setShowSignupDialog] = useState(false);

  const [user, setUser] = useState<User | undefined>();
  const [, setLoading] = useState(false);

  useEffect(() => {
    dayjs.extend(customParseFormat);
    dayjs.extend(utc);
    dayjs.extend(relativeTime);
  }, []);

  useEffect(() => {
    const session = supabase.auth.session();

    setUser(session?.user ?? undefined);
    setLoading(false);

    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? undefined);
        setLoading(false);
      }
    );

    return () => {
      listener?.unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={user}>
      <div
        className={classNames(
          " flex flex-1 flex-col",
          "w-full h-full min-h-screen min-w-screen pb-4",
          "bg-background"
        )}
      >
        <Navbar
          setShowLoginDialog={setShowLoginDialog}
          setShowSignupDialog={setShowSignupDialog}
        />
        <Component {...pageProps} />
        <LoginDialog isOpen={showLoginDialog} setIsOpen={setShowLoginDialog} />
        <SignupDialog
          isOpen={showSignupDialog}
          setIsOpen={setShowSignupDialog}
        />
      </div>
    </UserContext.Provider>
  );
}
export default MyApp;
