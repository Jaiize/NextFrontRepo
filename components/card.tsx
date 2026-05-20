"use client";

import { RawgGenre, RawgPlatform, Store } from "@/rawg.games.type";
import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  FaPlaystation,
  FaXbox,
  FaWindows,
  FaStar,
  FaLinux,
  FaApple,
  FaSteam,
} from "react-icons/fa6";
import { BsNintendoSwitch } from "react-icons/bs";
import { SiEpicgames } from "react-icons/si";
import Link from "next/link";

export type CardProps = {
  background_image: string;
  name: string;
  id: number;
  rating: number;
  released: string;
  genres: RawgGenre[];
  platforms: RawgPlatform[];
  stores: Store[];
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
}: CardProps) => {
  const [show, setShow] = useState(false);
  const divRef = useRef<HTMLDivElement | null>(null);

  const ref = useRef<HTMLButtonElement | null>(null);
  const handleShow = () => {
    setShow((s) => !s);
  };

  useEffect(() => {
    const button = ref.current;
    if (!button) return;
    const controller = new AbortController();
    const { signal } = controller;
    button?.addEventListener("click", handleShow, { signal });
    return () => controller.abort();
  }, []);

  useEffect(() => {
    // (div && e.target !== div)
    const div = divRef.current;
    const handleOutsideClick = (e: MouseEvent) => {
      if (div && !div.contains(e.target as Node)) setShow(false);
    };
    if(typeof document !== 'undefined'){
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [show]);

  // bg-[#151414]
  return (
    <div ref={divRef} className={`m-2 relative`}>
      <div
        className={`bg-[#151414] shadow-md flex flex-col transition-all rounded-[10px] duration-300 hover:shadow-gray-900 ${show ? "rounded-b-none shadow-none" : ""}`}
      >
        <div className="rounded-t-[10px] overflow-hidden">
          <Link href={`/carousel/${id}`} target="_blank">
            <Image
              className="w-full h-48 cursor-pointer object-cover"
              title={name}
              alt={name}
              src={background_image}
              width={300}
              loading="eager"
              height={250}
            />
          </Link>
        </div>
        <div
          className={`h-1/2 flex flex-col justify-center ${show ? "px-4 pt-4 pb-2" : "p-4"}`}
        >
          <div className="flex flex-row gap-2">
            {platforms && platforms.some((p) => p.platform.slug.includes("pc")) && (
              <FaWindows className="text-white-500" />
            )}
            {platforms && platforms.some((p) => p.platform.slug.includes("playstation")) && (
              <FaPlaystation className="text-blue-500" />
            )}
            {platforms && platforms.some((p) => p.platform.slug.includes("xbox")) && (
              <FaXbox className="text-green-500" />
            )}
            {platforms && platforms.some((p) => p.platform.slug.includes("linux")) && (
              <FaLinux className="text-amber-300" />
            )}
            {platforms && platforms.some((p) => p.platform.slug.includes("macos")) && (
              <FaApple className="text-white-500" />
            )}
            {platforms && platforms.some((p) =>
              p.platform.slug.includes("nintendo-switch"),
            ) && <BsNintendoSwitch className="text-white-500" />}
          </div>
          <Link href={`/carousel/${id}`} target="_blank">
            <p className="font-rob text-white-600 line-clamp-3 text-sm hover:text-blue-300 mt-2 hover:cursor-pointer">
              {name}
            </p>
          </Link>
          <div className="flex flex-row justify-between mt-1">
            <span className="text-zinc-500 text-xs">Rating:</span>
            <span className="text-xs text-white-600">
              <FaStar
                size={10}
                className="text-yellow-300 inline mx-1 pb-0.5"
              />
              {rating}
            </span>
          </div>
          <section
            className={`bg-[#151414] transition-shadow duration-300 ${show ? "absolute top-full z-20 w-full left-0 right-0 px-4 pb-4 shadow-md hover:shadow-gray-900 rounded-b-[10px]" : "relative z-10"}`}
          >
            {show && (
              <>
                <hr className="mb-1 text-zinc-500" />
                <div className="flex flex-row justify-between">
                  <span className="text-zinc-500 text-xs">Genre:</span>
                  <div className="flex flex-col items-end">
                    {genres &&
                      genres.map((g) => (
                        <span key={g.id} className="text-xs text-gray-300">
                          {g.name}
                        </span>
                      ))}
                  </div>
                </div>
                <hr className="my-1 text-zinc-500" />
                <div className="flex flex-row justify-between my-1.5">
                  <span className="text-zinc-500 text-xs">Purchase from:</span>
                  <div className="flex flex-row">
                    {stores.some((p) => p.store.slug.includes("steam")) && (
                      <FaSteam className="text-white-500 mx-0.5" />
                    )}
                    {stores.some((p) =>
                      p.store.slug.includes("epic-games"),
                    ) && <SiEpicgames className="text-white-500 mx-0.5" />}
                  </div>
                </div>
                <hr className="my-1 text-zinc-500" />
                <div className="flex flex-row justify-between">
                  <span className="text-zinc-500 text-xs justify-start">
                    Release:
                  </span>
                  <span className="text-[11px] text-gray-400 justify-end">
                    {new Date(released).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                      day: "2-digit",
                    })}
                  </span>
                </div>
              </>
            )}
            <div className="flex flex-row text-[11px] text-zinc-400 justify-center mt-1.5">
              {show && "Click photo to view detail"}
            </div>
            <div className=" text-blue-300 flex flex-row items-center justify-center text-[11px] py-3 cursor-pointer">
              {/* <button type="button" className="underline cursor-pointer" onClick={() => setShow((s) => !s)}> */}
              <button
                ref={ref}
                type="button"
                className={`underline cursor-pointer`}
              >
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
