import Link from "next/link";
import React from "react";
import { IoHome } from "react-icons/io5";
import ThemeToggle from "./themeToggle";

const NavBar = () => {
  return (
    <nav className="h-13 w-full flex flex-row items-center justify-between gap-3 px-2 bg-[#343434]/30 sticky top-0 z-50">
      <Link href="/" className="font-grotesk">
        <div className="flex flex-row cursor-pointer items-center justify-between w-22 p-1 rounded-xl">
          <IoHome className="text-xl" />
          <span className="font-grotesk text-md mr-2">Home</span>
        </div>
      </Link>
      <ThemeToggle />
    </nav>
  );
};
export default NavBar;
