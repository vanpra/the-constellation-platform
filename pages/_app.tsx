import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/Navbar";
import LoginDialog from "../components/Dialogs/LoginDialog";
import { useState } from "react";
import SignupDialog from "../components/Dialogs/SignupDialog";

function MyApp({ Component, pageProps }: AppProps) {
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [showSignupDialog, setShowSignupDialog] = useState(false);

  return (
    <div className="bg-background flex-1">
      <Navbar
        setShowLoginDialog={setShowLoginDialog}
        setShowSignupDialog={setShowSignupDialog}
      />
      <Component {...pageProps} />
      <LoginDialog isOpen={showLoginDialog} setIsOpen={setShowLoginDialog} />
      <SignupDialog isOpen={showSignupDialog} setIsOpen={setShowSignupDialog} />
    </div>
  );
}
export default MyApp;
