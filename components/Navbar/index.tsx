import classnames from "classnames/dedupe";
import { useRouter } from "next/dist/client/router";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useContext } from "react";
import { useUserInfo } from "../../utils/supabase/db";
import { supabase } from "../../utils/supabase/supabaseClient";
import Avatar from "../Avatar/Avatar";
import { RedRoundedButton, TransparentRoundedButton } from "../Buttons";
import AddIcon from "../../assets/add.svg";
import { UserContext } from "../../pages/_app";

interface NavbarProps {
  setShowLoginDialog: (show: boolean) => void;
  setShowSignupDialog: (show: boolean) => void;
}
interface NavButtonProps {
  href: string;
  children: React.ReactNode;
}

const NavButton = ({ href, children }: NavButtonProps) => {
  const router = useRouter();
  const isActive = router.asPath.startsWith(href);

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
  const { setShowLoginDialog, setShowSignupDialog } = props;
  const user = useContext(UserContext);
  const router = useRouter();
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
    router.push("/");
  }, [router]);
  const { userInfo } = useUserInfo(user?.id);

  return (
    <div className="flex justify-between items-center">
      <div className="flex">
        <div
          className={classnames("ml-4 mr-6 my-1", "flex-col justify-center")}
        >
          <Image
            className="hover:cursor-pointer"
            src="/logo.svg"
            alt="The Constellation Logo"
            height={50}
            width={50}
            onClick={() => router.push("/home")}
          />
        </div>
        <NavButton href="/home">Home</NavButton>
        <NavButton href="/topics">Topics</NavButton>
        <NavButton href="/search">Search</NavButton>
      </div>

      <div className="flex items-center">
        {user && userInfo ? (
          <>
            <RedRoundedButton
              className="mr-4 flex-none"
              text="Create a post"
              icon={
                <AddIcon
                  height="24"
                  width="24"
                  className="fill-current text-white"
                />
              }
              onClick={() => router.push("/posts/create")}
            />
            <TransparentRoundedButton
              className="mr-5"
              text="Logout"
              onClick={signOut}
            />
            <Avatar
              name={userInfo?.full_name}
              avatarUrl={userInfo?.avatar_url}
              className="mr-4 h-12 w-12 flex-none"
              onClick={() => router.push(`/profile/${userInfo.id}`)}
            />
          </>
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
}
