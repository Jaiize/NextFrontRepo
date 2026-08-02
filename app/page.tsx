"use client";
import Card from "@/components/card";
import { RawgGame, RawgResponse } from "@/rawg.games.type";
import React, { useEffect, useRef, useState } from "react";
import { useDebounce } from "react-use";
import { GrLinkPrevious, GrLinkNext } from "react-icons/gr";
import CustomSelect from "@/components/customSelect";
import SideNav from "@/components/sidenav";
import Searchbar from "@/components/searchbar";
import ScrollTop from "@/components/scrollTop";

export interface searchProps {
  pageNum: number;
  pageSize?: string;
  search?: string;
  orderBy?: string;
  gen?: string;
}

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
  const [order, setOrder] = useState("");
  const ref = useRef<HTMLElement | null>(null)

  /** ------------------------------------
   * Array of object options to order from
   */

  const options = [
    { value: "popularity", label: "Popularity", slug: "known" },
    { value: "created", label: "Created", slug: "asc" },
    { value: "-created", label: "Created", slug: "dsc" },
    { value: "released", label: "Release Date", slug: "asc" },
    { value: "-released", label: "Release Date", slug: "dsc" },
    { value: "metacritic", label: "Metacritic", slug: "asc" },
    { value: "-metacritic", label: "Metacritic", slug: "dsc" },
    { value: "name", label: "Name", slug: "az" },
    { value: "-name", label: "Name", slug: "za" },
    { value: "rating", label: "Rating", slug: "asc" },
    { value: "-rating", label: "Rating", slug: "dsc" },
  ];

  /** ------------------------------------------------------------------------------------------------------------
   * Order Effect and init view Effect
   */

  useEffect(() => {
    if (order.includes("-name")) {
      setDebounceSearch("z");
    } else if (order.includes("name")) {
      setDebounceSearch("a");
    } else {
      searchGames({ pageNum: page, orderBy: order, gen: genre });
    }
  }, [order]);

  /** ------------------------------------------------------------------------------------------------------------
   * Genres Effect
   */
  useEffect(() => {
    searchGames({ pageNum: page, gen: genre, orderBy: order });
  }, [genre]);

  /** ------------------------------------------------------------------------------------------------------------
   * Init view Effect
   */

  useEffect(() => {
    const pull = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${BASE_URL}/api/games/`);
        const fetched = await res.json();
        const RAWG = (fetched as RawgResponse).results;
        setGames(RAWG);
        setLoading(false);
      } catch (e) {
        console.error(e);
      }
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
  }: searchProps) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: pageNum.toString(),
        page_size: pageSize || "40",
      });

      if (search) params.append("search", search);

      if (orderBy) params.append("ordering", orderBy);

      if (gen) params.append("genres", gen);

      const res = await fetch(`${BASE_URL}/api/games/?${params}`);
      const fetched = await res.json();
      const rawg = (fetched as RawgResponse).results;
      // console.log("Here...", rawg)

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
      pageNum: newPage,
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
    } else if (e.key === "Escape") {
      e.preventDefault();
      setSideNav(false);
    }
  };
  return (
    <section className={`${sideNav ? "md:flex sm:" : ""}`}>
      {/* Wrapper for Sidenav and svg */}
      <aside ref={ref}
        onKeyDown={handleKeyDown}
        className={`${!sideNav ? "max-sm:focus-within:border-2 max-sm:focus-within:border-transparent focus-within:border-2 focus-within:rounded-lg focus-within:border-blue-600" : ""}
         border-2 border-transparent ${sideNav ? "flex flex-row max-md:absolute max-md:z-30 max-md:bg-zinc-700/30 max-md:backdrop-blur-sm max-md:w-full" :
           "absolute"}`}
      >
        <svg
          onClick={() => {
            setSideNav((s) => !s);
          }}
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
          fill="none"
          className={`w-8 h-8 m-3 cursor-pointer ${sideNav ? "md:sticky md:top-17" : ""}`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M0 3 H24 M0 12 H24 M0 21 H24"
          />
        </svg>
        <div
          className={`${sideNav ? "translate-x-0 opacity-100" : "-translate-x-20 opacity-0 top-0 pointer-events-none absolute z-0"} transition-all duration-300`}
        >
          <SideNav
            setGenre={setGenre}
            genre={genre}
            setSideNav={setSideNav}
            sideNav={sideNav}
            masterRef={ref}
          />
        </div>
      </aside>
      {/* Wrapper for title and search bar and main grid */}
      <main className="overflow-hidden">
        <div className="flex flex-col justify-center w-full mb-5">
          <div className="font-play text-center w-full h-10 text-3xl sm: max-sm:text-2xl my-10 mb-2 text-transparent bg-linear-to-r from-blue-500 to-red-600 bg-clip-text sm: max-sm:mt-15 sm: max-sm:px-1">
            Find Your favourite Games
          </div>
          {/* Wrapper for search bar */}
          <Searchbar
            debounceSearch={debounceSearch}
            page={page}
            search={search}
            searchGames={searchGames}
            setSearch={setSearch}
          />
        </div>
        {/* Wrapper for sorting */}
        <div
          className="flex flex-row items-center justify-between shadow-sm hover:shadow-mauve-600 transition-shadow duration-300 gap-1 w-fit ml-3 sm: max-sm:ml-5 bg-zinc-900/45 h-10 px-3 rounded-xl 
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
        <ul
          className={`grid grid-cols-1 sm:grid-cols-2 justify-items-center ${sideNav ? "2xl:grid-cols-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "2xl:grid-cols-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"} gap-3 p-2`}
        >
          {games &&
            games.length > 0 &&
            games.map((g) => (
              <li key={g.id} className="sm: max-sm:px-2.5">
                <Card {...g} isOpen={sideNav} />
              </li>
            ))}
        </ul>
        <div className="flex flex-row items-center justify-evenly w-full my-10">
          <button
            className={`flex flex-row items-center justify-between disabled:opacity-20 rounded-xl h-10 transition-all duration-300 pretty-focus ${page <= 1 ? "hover:shadow-none" : "hover:shadow-xs shadow-gray-800 cursor-pointer"}`}
            onClick={() => handlePageChange(page - 1)}
            disabled={loading || page <= 1}
            type="button"
          >
            {page >= 2 && (
              <GrLinkPrevious className="text-white ml-2" />
            )}
            <div className="font-cause text-sm w-28">
              Previous page
            </div>
          </button>
          <button
            className="flex flex-row justify-between h-10 items-center rounded-xl transition-shadow duration-300 hover:shadow-xs shadow-gray-800 pretty-focus"
            onClick={() => handlePageChange(page + 1)}
            disabled={loading}
            type="button"
          >
            <div className="font-cause text-sm h-fit w-23 hover:cursor-pointer">
              Next page
            </div>
            <GrLinkNext className="text-white mr-2" />
          </button>
        </div>
      </main>
      <ScrollTop />
    </section>
  );
};

export default CardDetail;
