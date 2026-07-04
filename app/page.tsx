"use client";
import Card from "@/components/card";
import { RawgGame, RawgResponse } from "@/rawg.games.type";
import React, { useEffect, useRef, useState } from "react";
import { useDebounce } from "react-use";
import { BiSearch } from "react-icons/bi";
import { GrLinkPrevious, GrLinkNext } from "react-icons/gr";
import useTheme from "next-theme";
import CustomSelect from "@/components/customSelect";
import Loading from "./loading";
import SideNav from "@/components/sidenav";
// import Loading from "./loading";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

if (!BASE_URL) {
  throw new Error("BASE_URL cannot be fetched from environment variable");
}

const CardDetail = () => {
  const [games, setGames] = useState<RawgGame[]>([]);
  const [loading, setLoading] = useState(false);
  const [sideNav, setSideNav] = useState(false);
  const [genre, setGenre] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [debounceSearch, setDebounceSearch] = useState("");
  const { theme } = useTheme();
  const [order, setOrder] = useState("");

  /** ------------------------------------
   * Array of object options to order from
   */

  const options = [
    { value: "popularity", label: "Popularity", slug: "" },
    { value: "created", label: "Created", slug: "asc" },
    { value: "-created", label: "Created", slug: "dsc" },
    { value: "released", label: "Release Date", slug: "asc" },
    { value: "-released", label: "Release Date", slug: "dsc" },
    { value: "metacritic", label: "Metacritic", slug: "asc" },
    { value: "-metacritic", label: "Metacritic", slug: "dsc" },
    { value: "name", label: "Name", slug: "asc" },
    { value: "-name", label: "Name", slug: "dsc" },
    { value: "rating", label: "Rating", slug: "asc" },
    { value: "-rating", label: "Rating", slug: "dsc" },
  ];

  /** ------------------------------------------------------------------------------------------------------------
   * Order Effect and init view Effect
   */

  useEffect(() => {
    if (order.includes("-name")) {
      setDebounceSearch("a");
      searchGames({ pageNum: page, search: debounceSearch });
    } else if (order.includes("name")) {
      setDebounceSearch("z");
      searchGames({ pageNum: page, search: debounceSearch });
    } else {
      searchGames({ pageNum: page, orderBy: order });
    }
  }, [order]);

  /** ------------------------------------------------------------------------------------------------------------
   * Genres Effect
   */
  useEffect(() => {
    searchGames({ pageNum: page, gen: genre });
  }, [genre]);

   /** ------------------------------------------------------------------------------------------------------------
   * Init view Effect
   */

  useEffect(() => {
    const pull = async () => {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/api/games/`, { cache: 'no-store' });
      const fetched = await res.json();
      const RAWG = (fetched as RawgResponse).results;
      setGames(RAWG);
      setLoading(false);
    };
    pull();
  }, []);

  // searcGames method ------------------------------------------------------------------------------------------------------------

  const searchGames = async ({
    pageNum,
    orderBy,
    pageSize,
    search,
    gen,
  }: {
    pageNum: number;
    pageSize?: string;
    search?: string;
    orderBy?: string;
    gen?: string;
  }) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: pageNum.toString(),
        page_size: pageSize || "40",
      });

      if (search) {
        params.append("search", search);
      }

      if (orderBy) {
        params.append("ordering", orderBy);
      }
      if (gen) {
        params.append("genres", gen);
      }

      const res = await fetch(`${BASE_URL}/api/games/?${params}`);
      const fetched = await res.json();
      const rawg = (fetched as RawgResponse).results;

      if (rawg && rawg.length > 0) {
        setGames(rawg);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  /**  ------------------------------------------------------------------------------------------------------------------------------------------------
   *  Debounce => search
   */

  useDebounce(() => setDebounceSearch(search), 450, [search]);

  useEffect(() => {
    searchGames({ pageNum: page, search: debounceSearch });
  }, [debounceSearch]);

  /** ------------------------------------------------------------------------------------------------------------------------------------------------
   * Handles previous and next page
   */

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    searchGames({
      pageNum: page,
      search: debounceSearch,
      gen: genre,
      orderBy: order,
    });
  };

  // Parent side nav helper for keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!sideNav && (e.key === " " || e.key === "Enter")) {
      e.preventDefault();
      setSideNav(true);
    }else if(e.key === "Escape"){
      e.preventDefault();
      setSideNav(false);
    }
  
  };
  return (
    <section className={`${sideNav ? "md:flex sm:" : ""}`}>
      {/* Wrapper for Sidenav and svg */}
      <div
        onKeyDown={handleKeyDown}
        className={`${!sideNav ? "sm: max-sm:focus-within:border-0 focus-within:border-2 focus-within:rounded-lg focus-within:border-blue-600" : "border-0"} ${sideNav ? "flex sm: max-sm:absolute sm: max-sm:z-20 sm: max-sm:bg-zinc-700/85 sm: max-sm:w-fit sm: max-sm:rounded-br-lg" : "absolute"}`}
      >
        <svg
          onClick={() => {
            setSideNav((s) => !s);
          }}
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth={2}
          strokeLinejoin="round"
          viewBox="0 0 24 24"
          fill="none"
          className={`w-8 h-8 m-3 cursor-pointer sticky top-16 ${sideNav ? "sm: max-sm:static" : ""}`}
        >
          <path d="M0 3 H24 M0 12 H24 M0 21 H24" />
        </svg>
        <div
          className={`${sideNav ? "translate-x-0 opacity-100" : "-translate-x-20 opacity-0 top-0 pointer-events-none absolute z-0"} transition-all duration-300`}
        >
          <SideNav
            setGenre={setGenre}
            genre={genre}
            setSideNav={setSideNav}
            sideNav={sideNav}
          />
        </div>
      </div>
      {/* Wrapper for title and search bar and main grid */}
      <div>
        <div className="flex flex-col justify-center w-full mb-5">
          <div className="font-play text-center w-full h-10 text-3xl my-10 mb-2 text-transparent bg-linear-to-r from-blue-500 to-red-600 bg-clip-text sm: max-sm:mt-15">
            Find Your favourite Games
          </div>

          {/* Wrapper for search bar */}
          <div className="flex justify-center w-full my-5">
            <div
              className={`flex flex-row items-center w-[30%] ${theme === "light" ? "bg-gray-300" : "bg-[#323232]"} h-10 rounded-2xl sm: max-sm:w-[65%] sm: max-sm:h-9 transition-all duration-300`}
            >
              <BiSearch
                className="text-2xl ml-3 cursor-pointer sm: max-sm:text-xl"
                onClick={() =>
                  searchGames({ pageNum: page, search: debounceSearch })
                }
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
                className={`w-4 h-4 mr-3 transition-opacity duration-300 ${search && search.length > 0 ? "opacity-100 pointer-events-auto hover:cursor-pointer" : "opacity-0 pointer-events-none"}`}
              >
                {/* <path d="M4 4 L21 21 M21 4 L4 21" /> */}
                <path d="M4 4 l17 17 M21 4 l-17 17" />
              </svg>
            </div>
          </div>
        </div>
        {/* Wrapper for sorting */}
        <div
          className="flex flex-row items-center justify-between shadow-sm hover:shadow-mauve-600 transition-shadow duration-300 gap-1 w-fit mx-5 bg-zinc-900/45 h-10 px-3 rounded-xl 
          sm: max-sm:w-fit sm: max-sm:pl-3"
        >
          <div className="font-grotesk text-sm w-fit mr-1.5 sm: max-sm:text-xs sm: max-sm:mr-0 hover:cursor-default">
            Order by:
          </div>
          <CustomSelect
            onChange={setOrder}
            options={options}
            placeholder="Select order..."
            value={order}
          />
        </div>
        {/* Grid view */}
        {/* sm: max-sm:h-screen sm: max-sm:sticky sm: max-sm:top-0 */}
        <ul
          className={`grid grid-cols-1 justify-items-center md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 ${sideNav ? "2xl:grid-cols-5" : "2xl:grid-cols-6"} gap-3 p-2 sm: max-sm:snap-y sm: max-sm:snap-mandatory sm: max-sm:overflow-y-auto`}
        >
          {games &&
            games.length > 0 &&
            games.map((g) => (
              <li key={g.id} className="sm: max-sm:snap-start">
                <Card {...g} />
              </li>
            ))}
        </ul>
        <div className="flex flex-row justify-evenly w-full my-10">
          <div
            className={`flex flex-row rounded-xl transition-all duration-300  cursor-pointer ${page <= 1 ? "hover:shadow-none" : "hover:shadow-xs shadow-gray-800"}`}
          >
            {page >= 2 && (
              <GrLinkPrevious className="text-white flex flex-row self-center ml-2" />
            )}
            <button
              className="font-cause text-sm h-10 w-28 disabled:opacity-20"
              onClick={() => handlePageChange(page - 1)}
              disabled={loading || page <= 1}
              type="button"
            >
              Previous page
            </button>
          </div>
          <div className="flex flex-row rounded-xl transition-all duration-300 hover:shadow-xs shadow-gray-800">
            <button
              className="font-cause text-sm h-10 w-23 hover:cursor-pointer"
              onClick={() => handlePageChange(page + 1)}
              disabled={loading}
              type="button"
            >
              Next page
            </button>
            <GrLinkNext className="text-white flex flex-row self-center mr-2" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CardDetail;
