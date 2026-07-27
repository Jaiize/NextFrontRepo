"use client";

import { RawgGenre, RawgPlatform, Store } from "@/rawg.games.type";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  FaPlaystation,
  FaXbox,
  FaWindows,
  FaStar,
  FaLinux,
  FaApple,
  FaSteam,
} from "react-icons/fa6";
import { DiAndroid } from "react-icons/di";
import { BsNintendoSwitch } from "react-icons/bs";
import { SiEpicgames } from "react-icons/si";
import Link from "next/link";
import useTheme from "next-theme";
import SideNav from "./sidenav";

export type CardProps = {
  background_image: string;
  name: string;
  id: number;
  rating: number;
  released: string;
  genres: RawgGenre[];
  platforms: RawgPlatform[];
  stores: Store[];
  isOpen: boolean
};


const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

if (!BASE_URL) {
  throw new Error("BASE_URL cannot be fetched from environment variable");
}

const Card = ({
  background_image,
  name,
  rating,
  genres,
  released,
  platforms,
  stores,
  id,
  isOpen
}: CardProps) => {
  const [show, setShow] = useState(false);
  const divRef = useRef<HTMLDivElement | null>(null);
  const {theme} = useTheme();


  
  // Close opened card when outside click is detected
  useEffect(() => {
    // (div && e.target !== div)
    const div = divRef.current;
    const handleOutsideClick = (e: MouseEvent) => {
      if (div && !div.contains(e.target as Node)) setShow(false);
    };

    const controller = new AbortController();
    const { signal } = controller;

    if (typeof document !== "undefined") {
      document.addEventListener("mousedown", handleOutsideClick, { signal });
    }
    return () => controller.abort();
  }, [show]);

  // Available Stores
  const isAvailable = stores && (stores.some((p) => p.store.slug.includes("steam")) || stores.some((p) => p.store.slug.includes("epic-games")) || 
  stores.some((p) => p.store.slug.includes("playstation")) || stores.some((p) => p.store.slug.includes("xbox")));

  
  return (
    <div ref={divRef} className={`my-2 relative`}>
      <div
        className={`${theme === "dark" ? "bg-[#151414]" : "bg-[#bab6b6]"} shadow-md flex flex-col transition-all rounded-[10px] duration-150 hover:shadow-gray-900 ${show ? "rounded-b-none shadow-none" : ""}`}
      >
        <div className="rounded-t-[10px] overflow-hidden">
          <Link href={`/carousel/${id}`} className={`${isOpen ? "sm: max-sm:pointer-events-none" : "sm: max-sm:pointer-events-auto"}`}>
            <Image
              className="min-w-full h-48 aspect-auto cursor-pointer object-cover"
              title={name}
              alt={name}
              src={background_image || '/Nocontent.jpg'}
              width={1280}
              height={720}
              loading="eager"
              sizes="(max-width: 360px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          </Link>
        </div>
        <div
          className={`h-1/2 flex flex-col justify-center ${show ? "px-4 pt-4 pb-2" : "p-4"}`}
        >
          <div className="flex flex-row gap-2 mb-2">
            {platforms &&
              platforms.some((p) => p.platform.slug.includes("pc")) && (
                <FaWindows className="text-white-500" />
              )}
            {platforms &&
              platforms.some((p) =>
                p.platform.slug.includes("playstation"),
              ) && <FaPlaystation className="text-blue-500" />}
            {platforms &&
              platforms.some((p) => p.platform.slug.includes("xbox")) && (
                <FaXbox className="text-green-500" />
              )}
            {platforms &&
              platforms.some((p) => p.platform.slug.includes("linux")) && (
                <FaLinux className="text-amber-300" />
              )}
            {platforms &&
              platforms.some((p) => p.platform.slug.includes("macos")) && (
                <FaApple className="text-white-500" />
              )}
            {platforms &&
              platforms.some((p) => p.platform.slug.includes("android")) && (
                <DiAndroid className="text-green-500" />
              )}
            {platforms &&
              platforms.some((p) =>
                p.platform.slug.includes("nintendo-switch"),
              ) && <BsNintendoSwitch className="text-white-500" />}
          </div>
          <Link href={`/carousel/${id}`} className={`pretty-focus ${isOpen ? "sm: max-sm:pointer-events-none" : "sm: max-sm:pointer-events-auto"}`}>
            <p className="font-rob line-clamp-1 text-sm hover:text-blue-600 mt-2 hover:cursor-pointer mb-1.5">
              {name}
            </p>
          </Link>
          <div className="flex flex-row justify-between mt-1">
            <span className={`${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-900'} text-sm font-rob cursor-default`}>Rating:</span>
            <span className="cursor-default text-xs text-white-600">
              <FaStar
                size={10}
                className="text-yellow-300 inline mx-1 pb-0.5"
              />
              {rating}
            </span>
          </div>
          {/* Shrink filler for card below a currently opened card in small screens */}
          {show && <span className="sm: max-sm:h-12.25 sm: max-sm:z-0 sm: max-sm:pointer-events-none"/>}
          <section
            className={`${theme === 'dark' && show ? 'bg-[#151414]' : theme === 'light' && show ? 'bg-[#bab6b6] shadow-none' : ''} transition-shadow duration-300 
            ${show ? "absolute sm: max-sm:top-[85%] top-full z-20 w-full left-0 right-0 px-4 pb-4 shadow-md hover:shadow-gray-900 rounded-b-[10px]" : "relative z-10"}`}
          >
            {show && (
              <>
                { genres.length > 0 && 
                  (<div>
                    <hr className="mb-1 text-zinc-500" />
                    <div className="flex flex-row justify-between">
                      <span className={`text-sm font-rob cursor-default ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-900'}`}>Genre:</span>
                      <div className="flex flex-col items-end justify-center">
                        {genres &&
                          genres.map((g) => (
                            <span key={g.id} className="text-xs cursor-default font-grotesk">
                              {g.name}
                            </span>
                          ))}
                      </div>
                    </div>
                  </div>)
                }
                <hr className="my-1 text-zinc-500" />
                {stores && isAvailable &&
                  <>
                    <div className="flex flex-row justify-between my-1.5">
                      <span className={`text-sm font-rob ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-900'} cursor-default `}>Store:</span>
                      <div className="flex flex-row items-center">
                        {stores && stores.some((p) => p.store.slug.includes("playstation")) && (
                          <FaPlaystation className="text-white-500 mx-1"/>
                        )}
                        {stores && stores.some((p) => p.store.slug.includes("xbox")) && (
                           <FaXbox className="text-white-500 mx-1" />
                        )}
                        {stores && stores.some((p) => p.store.slug.includes("steam")) && (
                          <FaSteam className="text-white-500 mx-1" />
                        )}
                        {stores && stores.some((p) =>
                          p.store.slug.includes("epic-games"),
                        ) && <SiEpicgames className="text-white-500 ml-1" />}
                      </div>
                    </div>
                    <hr className="my-1 text-zinc-500" />
                  </>
                }
                <div className="flex flex-row justify-between">
                  <span className={`text-sm font-rob ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-900'} cursor-default`}>
                    Release:
                  </span>
                  <span className={`text-xs font-rob ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-900'} cursor-default`}>
                    {new Date(released).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                      day: "2-digit", 
                    })}
                  </span>
                </div>
              </>
            )}
            { show && <div className={`flex flex-row text-[11px] font-sans cursor-default ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-900'} justify-center mt-1.5`}>Click image to view details</div> }
            <div className={`${theme === 'dark' ? 'text-blue-300' : 'text-black'} flex flex-row items-center justify-center text-[11px] py-3 cursor-pointer`}>
              <button type="button" className="underline cursor-pointer pretty-focus" onClick={() => setShow((s) => !s)}>
                {show ? "Show less" : "Show More"}
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Card;