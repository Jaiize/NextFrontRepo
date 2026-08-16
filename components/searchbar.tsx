import { searchProps } from "@/app/page";
import useTheme from "next-theme";
import { BiSearch } from "react-icons/bi";


interface SearchBarProps {
    searchGames: (val: searchProps) => void,
    setSearch: (val: string) => void,
    search: string,
    page: number,
    debounceSearch: string
}

const Searchbar = ({ search, searchGames, setSearch, page, debounceSearch }: SearchBarProps) => {
    const {theme} = useTheme()

  return (
    <div className="flex justify-center w-full my-5">
      <div
        className={`flex flex-row items-center w-[35%] ${theme === "light" ? "bg-gray-300" : "bg-[#323232]"} h-10 rounded-2xl sm: max-sm:w-[65%] sm: max-sm:h-9 transition-all duration-200 md:outline-2 md:outline-transparent md:focus-within:outline-offset-1 md:focus-within:outline-2 md:focus-within:outline-blue-400`}
      >
        <BiSearch
          className="text-2xl ml-3 cursor-pointer sm: max-sm:text-xl"
          onClick={() => searchGames({ pageNum: page, search: debounceSearch })}
        />
        <input
          className="font-grotesk text-sm w-full ml-2.5 h-full focus:outline-0 sm: max-sm:ml-2 sm: max-sm:text-xs"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for latest games"
        />
        <svg
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth={2}
          strokeLinejoin="round"
          fill="none"
          viewBox="0 0 24 24"
          onClick={() => setSearch("")}
          className={`w-4 h-4 mr-3 transition-opacity duration-200 ${search && search.length > 0 ? "opacity-100 pointer-events-auto hover:cursor-pointer" : "opacity-0 pointer-events-none"}`}
        >
          {/* <path d="M4 4 L21 21 M21 4 L4 21" /> */}
          <path d="M4 4 l17 17 M21 4 l-17 17" />
        </svg>
      </div>
    </div>
  );
};

export default Searchbar;
