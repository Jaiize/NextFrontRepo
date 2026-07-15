import Link from "next/link";
import { IoHome } from "react-icons/io5";
import ThemeToggle from "./themeToggle";

const NavBar = () => {
  return (
    <nav className="h-13 w-full flex flex-row items-center justify-between gap-3 px-2 bg-[#343434]/30 sticky top-0 z-50">
      <Link href="/" className="font-grotesk border-2 border-transparent focus-visible:outline-0 focus-visible:border-2 focus-visible:border-blue-500 focus-visible:rounded-xl">
        <div className="flex flex-row cursor-pointer items-center w-fit p-1">
          <IoHome className="text-xl" />
        </div>
      </Link>
      <ThemeToggle />
    </nav>
  );
};
export default NavBar;
