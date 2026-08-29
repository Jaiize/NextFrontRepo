import { searchProps } from "@/app/page";
import useTheme from "next-theme";
import { useEffect } from "react";
import { BiSearch } from "react-icons/bi";

interface SearchBarProps {
  searchGames: (val: searchProps) => void;
  setSearch: (val: string) => void;
  search: string;
  page: number;
  debounceSearch: string;
  cleanUpSearch(): void;
}

const Searchbar = ({
  search,
  searchGames,
  setSearch,
  page,
  debounceSearch,
  cleanUpSearch,
}: SearchBarProps) => {
  const { theme } = useTheme();

  // Scroll to top when user touches the search field
  const scrollForSearch = () => {
    if(typeof window !== 'undefined' && window.innerWidth <= 640){
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    }
  }

  // const temp = (e: any) => {
  //   setSearch("");
  //   console.log("Seen...", e.persisted)
  //   const searched = localStorage.getItem("searched");
  //   if (searched) {
  //     localStorage.removeItem("searched");
  //   }
  // };

  // useEffect(() => {
  //   const controller = new AbortController();
  //   const { signal } = controller;

  //   if(typeof window !== 'undefined'){
  //     // window.addEventListener("pageshow", cleanUpSearch, { signal })
  //     window.addEventListener("loadstart", temp, { signal })
  //   }

  //   return () => controller.abort();

  // }, [])


  return (
    <div className="flex justify-center w-full my-5">
      <div
        className={`flex flex-row items-center w-[35%] ${theme === "light" ? "bg-gray-300" : "bg-[#323232]"} h-10 rounded-2xl max-sm:w-[65%] max-sm:h-9 transition-normal duration-200 md:outline-2 md:outline-transparent md:focus-within:outline-offset-1 md:focus-within:outline-2 md:focus-within:outline-blue-400`}
      >
        <BiSearch
          className="text-2xl ml-3 cursor-pointer sm: max-sm:text-xl"
          onClick={() => searchGames({ pageNum: page, search: debounceSearch })}
        />
        <input
          className="font-grotesk text-sm w-full ml-2.5 h-full focus:outline-0 max-sm:ml-2 max-sm:text-xs"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for latest games"
          type="search"
          onTouchEnd={() => scrollForSearch()}
          title="Search field"
          aria-label="Search field"
        />
        <svg
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth={2}
          strokeLinejoin="round"
          fill="none"
          viewBox="0 0 24 24"
          onClick={() => cleanUpSearch()}
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
