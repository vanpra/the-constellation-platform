import classnames from "classnames/dedupe";
import { useRouter } from "next/dist/client/router";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { RedRoundedButton, TransparentRoundedButton } from "../Buttons";

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
          isActive
            ? "bg-gray-500 bg-opacity-40 pointer-events-none"
            : "hover:bg-gray-500 hover:bg-opacity-40",
          "text-xl"
        )}
      >
        {children}
      </a>
    </Link>
  );
};

export default function Navbar() {
  return (
    <div className="flex justify-between items-center">
      <div className="flex">
        <div className={classnames("ml-8 mr-6 my-1", "flex-col justify-center")}>
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

      <div className="flex items-center">
        <TransparentRoundedButton className="mr-6" text="Login" />
        <RedRoundedButton className="mr-4" text="Signup" />
      </div>
    </div>
  );
}
