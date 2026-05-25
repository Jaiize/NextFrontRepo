"use client";
import Card from "@/components/card";
import { RawgGame, RawgResponse } from "@/rawg.games.type";
import { useEffect, useLayoutEffect, useState } from "react";
import { useDebounce } from "react-use";
import { BiSearch } from "react-icons/bi";
import { GrLinkPrevious, GrLinkNext } from "react-icons/gr";
import { writeFile } from "node:fs";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

if (!BASE_URL) {
  throw new Error("BASE_URL cannot be fetched from environment variable");
}

const CardDetail = () => {
  const [games, setGames] = useState<RawgGame[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [debounceSearch, setDebounceSearch] = useState("");


  // Store scroll position
  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      const handleScroll = () => {
        const path = window.location.pathname;
        const xy = window.pageXOffset + "," + window.pageYOffset;
        sessionStorage.setItem(path, xy);
      };

      window.addEventListener("scrollend", handleScroll);
      return () => window.removeEventListener("scrollend", handleScroll);
    }
  }, []);

  // Restore scroll position
  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      const path = window.location.pathname;
      const position = sessionStorage.getItem(path);
      if (position) {
        const [x, y] = position.split(",");

        const t = setTimeout(() => {
          window.scrollTo({
            top: parseInt(y),
            left: parseInt(x),
            behavior: "smooth",
          });
        }, 500);
        return () => {
          clearTimeout(t);
        };
      }
    }
  }, []);

  // clean up should be made when user logs out

  useEffect(() => {
    const pull = async () => {
      const res = await fetch(`${BASE_URL}/api/games/`);
      const fetched = await res.json();
      const RAWG = (fetched as RawgResponse).results;
      setGames(RAWG);
    };
    pull();
  }, []);

  const searchGames = async (pageNum: number, search: string = "") => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: pageNum.toString(),
        page_size: "40",
      });

      if (search) {
        params.append("search", search);
      }

      const res = await fetch(`${BASE_URL}/api/games/?${params}`);
      const fetched = await res.json();
      const rawg = (fetched as RawgResponse).results;
      if (rawg) {
        setGames(rawg);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useDebounce(() => setDebounceSearch(search), 450, [search]);

  useEffect(() => {
    setPage(1);
    searchGames(1, debounceSearch);
  }, [debounceSearch]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    searchGames(newPage, debounceSearch);
  };

  const [sel, setSel] = useState<string>()
  // const [sel, setSel] = useState<File>()
  // const handleSave = async () => {
  //   const im = await sel?.arrayBuffer()
  //   const img = Buffer.from(im!)
  //   await writeFile(`C:/Users/JosephET/Documents/For Next/My_Next_app/next_app/public/${sel?.name}`, img, (er) => {console.error(er)})
  // }

  return (
    <>
      <div className="font-play text-center w-full h-10 text-3xl my-10 mb-2 text-transparent bg-linear-to-r from-blue-500 to-red-600 bg-clip-text">
        Find Your favourite Games
      </div>
      <div className="flex flex-row justify-center w-full my-5 group">
        <div className="flex flex-row w-[30%] bg-[#323232] h-10 rounded-2xl sm: max-sm:w-[65%] sm: max-sm:h-9 transition-all duration-300">
          <BiSearch
            className="text-white text-2xl mt-2 ml-3 cursor-pointer sm: max-sm:text-xl"
            onClick={() => searchGames(page, debounceSearch)}
          />
          <input
            className="font-grotesk text-sm text-white w-full ml-2.5 h-full focus:outline-0 sm: max-sm:ml-2 sm: max-sm:text-xs"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for latest games"
          />
        </div>
      </div>
      <div className="w-full">
        <div>
          {"FileName: " + sel}
        </div>
        {/* <div>
          <input title="test" type="file" onChange={(e) => setSel(e.target.files![0])} />
          <button type="button" onClick={handleSave}>Save</button>
        </div> */}
        <div className="relative w-25 group">
          <select title="test" value={sel} onChange={(e) => setSel(e.target.value)} className="appearance-none w-fit rounded-2xl">
            <option value='red'>Red</option>
            <option value='blue'>Blue</option>
            <option value='yellow'>Yellow</option>
          </select>
          <div className="absolute inset-y-0 right-1 flex items-center group-hover:rotate-180 transition-transform duration-300 ease-in-out">
            <svg stroke="red" fill="none" viewBox="0 0 24 24" className="h-8 w-8">
              <path strokeLinecap="round" strokeLinejoin="bevel" strokeWidth={2} d="M19 9 l-7 7 l-7 -7"/>
            </svg>
          </div>
        </div>
      </div>
      <ul className="grid grid-cols-1 justify-items-center md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-1 p-2">
        {games &&
          games.length > 0 &&
          games.map((g) => (
            <li key={g.id}>
              <Card {...g} />
            </li>
          ))}
      </ul>
      <div className="flex flex-row justify-evenly w-full my-10">
        <div className={`flex flex-row rounded-xl transition-all duration-300  cursor-pointer ${page <= 1 ? "hover:shadow-none" : "hover:shadow-xs shadow-gray-800"}`}>
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
    </>
  );
};

export default CardDetail;
