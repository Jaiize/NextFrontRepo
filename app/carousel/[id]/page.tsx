"use client"

import { RawgClickGames } from "@/rawg.games.type";
import useTheme from "next-theme";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsNintendoSwitch } from "react-icons/bs";
import { FaApple, FaLinux, FaPlaystation, FaStar, FaSteam, FaWindows, FaXbox } from "react-icons/fa6";
import { SiEpicgames, SiPlaystation2, SiPlaystation3, SiPlaystation4, SiPlaystation5 } from "react-icons/si";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const GameDetail = ({ params }: { params: Promise<{id: string}>} ) => {
  const [game, setGame] = useState<RawgClickGames>({})
  const {theme} = useTheme()

  
  useEffect(() => {    
    const pullOne = async () => {
      try {
        const { id } = await params;
        const res = await fetch(`${BASE_URL}/api/games/one/${id}`);
        const fetched = await res.json();
        const game = (fetched as RawgClickGames);
        setGame(game)
      } catch (e) {
        console.error(e)
      }
    }
    pullOne();

  }, [params])

  const {background_image, name, slug, background_image_additional, description_raw, platforms, 
    genres, stores, rating, released, added, movies_count, metacritic, achievements_count, esrb_rating, playtime } = game;

  const bg_height = `${ description_raw && (description_raw.length > 1400 && description_raw.length < 1550) ? 
    'h-220 max-sm:h-170' : description_raw && (description_raw.length > 1560 && description_raw.length < 2000) ? 
    'h-170 max-sm:h-205' : description_raw && description_raw.length > 2000 ? 
    'h-180 max-sm:h-220 max-md:h-220 md:h-200' : 'h-170 max-sm:h-138'}`
  

  return (
    <>
      <div className={`flex flex-col items-center relative justify-center overflow-hidden ${bg_height}`}>
        {background_image && 
          <Image loading="eager" alt={name || slug} width={1920} height={1080} src={background_image_additional || '/Nocontent.jpg'} className={`w-full absolute top-0 left-0 h-full ${theme === 'dark' ? 'opacity-45' : 'opacity-80'} aspect-video object-cover`}/>
        }
        {/* add inset-x-0 max-md:text-2xl */}
        <div className={`font-rob 2xl:text-7xl xl:text-6xl lg:text-5xl md:text-4xl text-3xl ${name && name.length > 35 ? 'max-sm:text-[16px]' : 'max-sm:text-2xl'} w-full absolute top-10 lg:top-20 flex flex-row justify-center max-sm:top-5 max-sm:px-3`}>{name}</div>
        <div className={`w-[80%] absolute h-50 top-30 lg:top-50 flex flex-row justify-center font-grotesk z-30 max-sm:top-20 max-sm:text-xs`} >
          {description_raw && description_raw}
        </div>
        {background_image && 
          <div  className={`w-full absolute bg-linear-to-t ${theme === 'dark' ? 'from-black h-50' : 'from-white h-10'} to-transparent bottom-0 z-10`}/>
        }
      </div>

      {/* Platforms */}
      <div className="w-fit flex flex-col items-start justify-start space-y-5 mx-3 mt-10 h-auto" aria-label="Platforms">
        {/* {description_raw && <div className="text-blue-600 font-cause text-2xl">{description_raw.length}</div>} */}
        <div className="font-play text-xl max-sm:text-md">
          { platforms && 'Platforms:'}
        </div>
        <div className="flex flex-row items-center justify-start gap-4 flex-wrap ">
          { platforms && platforms.some((p) => (
            p.platform.slug.includes('pc') 
          )) && 
          <div className="bg-[#232121]/20 rounded-2xl w-auto px-2.5 h-18 flex flex-row gap-4 items-center justify-between max-sm:w-25 max-sm:h-13">
            <span aria-label="Available on windows" className="text-lg font-extrabold max-sm:text-sm">PC</span>
            <FaWindows className="text-white-500 text-5xl max-sm:text-4xl" aria-label="Windows Icon" />
          </div>}
          {platforms && platforms.some((p) => (
            p.platform.slug.includes('playstation') 
          )) && 
          <div className="bg-[#232121]/20 rounded-2xl w-auto px-3 h-auto flex flex-col items-start justify-center max-sm:h-20">
            <span aria-label="Available on PlayStation" className="text-lg mt-2 font-extrabold max-sm:text-sm">Playstation</span>
            <div className="flex flex-row items-center gap-5">
              {platforms && platforms.some((p) => (
                p.platform.slug.includes('playstation5') 
              )) && <SiPlaystation5 aria-label="PlayStation Icon" className="text-blue-500 text-5xl max-sm:text-4xl"/>}
              {platforms && platforms.some((p) => (
                p.platform.slug.includes('playstation4') 
              )) && <SiPlaystation4 aria-label="PlayStation Icon" className="text-blue-500 text-5xl max-sm:text-4xl"/>}
              {platforms && platforms.some((p) => (
                p.platform.slug.includes('playstation3') 
              )) && <SiPlaystation3 aria-label="PlayStation Icon" className="text-blue-500 text-5xl max-sm:text-4xl"/>}
              {platforms && platforms.some((p) => (
                p.platform.slug.includes('playstation2') 
              )) && <SiPlaystation2 aria-label="PlayStation Icon" className="text-blue-500 text-5xl max-sm:text-4xl"/>}
            </div>

          </div>
          }
          {platforms && platforms.some((p) => (
            p.platform.slug.includes('xbox') 
          )) && 
          <div className="bg-[#232121]/20 rounded-2xl w-auto px-2.5 h-18 flex flex-row gap-4 items-center justify-between max-sm:w-30 max-sm:h-13">
            <span aria-label="Available on Xbox" className="text-lg font-extrabold max-sm:text-sm">Xbox</span>
            <FaXbox aria-label="Xbox Icon" className="text-green-500 text-5xl max-sm:text-4xl" />
          </div>                  
          }
          {platforms && platforms.some((p) => (
            p.platform.slug.includes('linux') 
          )) && 
            <div className="bg-[#232121]/20 rounded-2xl w-auto px-2.5 h-18 flex flex-row gap-4 items-center justify-between max-sm:w-30 max-sm:h-13">
            <span aria-label="Available on Linux" className="text-lg font-extrabold max-sm:text-sm">Linux</span>
            <FaLinux aria-label="Linux Icon" className="text-amber-300 text-5xl max-sm:text-4xl"/>
          </div>                  
          }
          {platforms && platforms.some((p) => (
            p.platform.slug.includes('macos') 
          )) && 
            <div className="bg-[#232121]/20 rounded-2xl w-auto px-2.5 h-18 flex flex-row gap-4 items-center justify-between max-sm:w-30 max-sm:h-13">
            <span aria-label="Available on MacOS" className="text-lg font-extrabold max-sm:text-sm">MacOS</span>
            <FaApple aria-label="MacOS Icon" className="text-5xl max-sm:text-4xl"/>
          </div>                  
          }
          {platforms && platforms.some((p) => (
            p.platform.slug.includes('nintendo-switch') 
          )) && 
          <div className="bg-[#232121]/20 rounded-2xl w-auto px-2.5 h-18 flex flex-row gap-4 items-center justify-between max-sm:w-40 max-sm:h-13">
            <span aria-label="Available on Nintendo Switch" className="text-lg font-extrabold max-sm:text-sm">Nintendo</span>
            <BsNintendoSwitch aria-label="Nintendo Switch Icon" className="text-5xl max-sm:text-4xl"/>
          </div>
          }
        </div>
      </div>
      {/* Stats  */}
      <div className="w-auto flex flex-row max-sm:flex-col gap-10 h-auto my-10 mx-3">
        <div className="w-1/2 flex flex-col space-y-10 h-auto max-sm:w-full max-sm:space-y-5">
          {background_image && 
            <div className="flex flex-row justify-between items-center">
              <span className="font-play text-lg">Rating:</span>
                <span className="text-lg text-white-600 font-grotesk">
                  <FaStar  className="text-yellow-300 inline mx-1.5 text-sm mb-1"/>
                {rating}</span>
            </div>
          }
          {added && 
            <div className="flex flex-row justify-between items-center">
              <span className="font-play text-lg">Added:</span>
                <span className="text-lg text-white-600 font-grotesk">{added}</span>
            </div>
          }
          {genres && 
            <div className="flex flex-row justify-between">
              <span className="text-lg font-play">Genre:</span>
              <div className="flex flex-col items-end">
                {genres &&
                  genres.map((g) => (
                    <span key={g.id} className="text-md font-grotesk">
                      {g.name}
                    </span>
                  ))}
              </div>
            </div>}
          {released && 
            <div className="flex flex-row justify-between items-center">
                <span className="text-lg justify-start font-play">Release:</span>
                <span className="text-gray-400 justify-end text-md font-grotesk">
                  {new Date(released).toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                    day: "2-digit",
                  })}
                </span>
            </div>}
        </div>
        <div className="w-1/2 flex flex-col space-y-10 h-auto max-sm:w-full max-sm:space-y-5">
          {movies_count >= 1 && 
              <div className="flex flex-row justify-between items-center">
                <span className="font-play text-lg">Movies Count:</span>
                  <span className="text-lg text-white-600 font-grotesk">{movies_count}</span>
              </div>
          }
          {metacritic >= 1 && 
              <div className="flex flex-row justify-between items-center">
                <span className="font-play text-lg">Metacritic:</span>
                  <span className="text-lg text-white-600 font-grotesk">{metacritic}</span>
              </div>
          }
          {playtime >= 1 && 
              <div className="flex flex-row justify-between items-center">
                <span className="font-play text-lg">Playtime:</span>
                  <span className="text-lg text-white-600 font-grotesk">{playtime}</span>
              </div>
          }
          {achievements_count >= 1 && 
              <div className="flex flex-row justify-between items-center">
                <span className="font-play text-lg">Achievements Count:</span>
                  <span className="text-lg text-white-600 font-grotesk">{achievements_count}</span>
              </div>
          }
          {esrb_rating && 
              <div className="flex flex-row justify-between items-center">
                <span className="font-play text-lg">ESRB Rating:</span>
                  <span className="text-lg text-white-600 font-grotesk">{esrb_rating.name}</span>
              </div>
          }
        </div>
      </div>
      {/* Requirements  */}
      {platforms && platforms.some((r) => r.requirements?.minimum) &&
        <div className="flex flex-col justify-start my-10 mx-3 space-y-1.5 max-sm:space-y-0">
          {platforms && platforms.some((r) => r.requirements?.minimum) && <span className="text-xl justify-start font-play mb-3 max-sm:text-sm">PC Requirement:</span>}
          {platforms && platforms.map((r, i) => <span key={i} className="text-zinc-500 text-lg font-black max-sm:text-xs">{r.requirements?.minimum}</span>)}
          {platforms && platforms.map((r, i) => <span key={i} className="text-zinc-500 text-lg font-black max-sm:text-xs">{r.requirements?.recommended}</span>)}
        </div>
      }
      {/* Stores  */}
      {stores && stores.some((p) => (
        p.store.slug.includes('playstation') || p.store.slug.includes('xbox')) || p.store.slug.includes('steam') || p.store.slug.includes('epic-games')) &&
        <section className="w-full">
          <div className="flex flex-col mx-3 items-start justify-start w-fit text-lg font-mont p-3 rounded-t-2xl bg-[#323232]/20 max-sm:text-xs">
            {stores && 'Purchase From'}
          </div>
          <div className="w-fit flex flex-row flex-wrap gap-3 items-start justify-start space-y-1 mx-3 h-auto border border-gray-600 p-4 mb-2 rounded-b-3xl rounded-se-3xl max-sm:w-auto">
            {stores && stores.some((p) => (
              p.store.slug.includes('playstation') 
            )) && 
            <Link href={`https://store.playstation.com/en-us/search/${name}`} target="_blank" aria-label="Playstation store link">
              <div className="bg-[#232121]/20 rounded-2xl w-auto px-4 h-18 transition-shadow duration-300 shadow-md active:shadow-none hover:shadow-blue-600 flex flex-row gap-4 items-center justify-between max-sm:h-13">
                <span aria-label="Available on PlayStation store" className="text-lg cursor-pointer font-rob max-sm:text-sm">PlayStation Store</span>
                <FaPlaystation aria-label="PlayStation store Icon" className="text-blue-500 text-5xl max-sm:text-4xl"/>
              </div>
            </Link>
            }
            {stores && stores.some((p) => (
              p.store.slug.includes('xbox') 
            )) && 
            <Link href={`https://www.xbox.com/en-us/Search/Results?q=${name}`} target="_blank" aria-label="Xbox store link">
              <div className="bg-[#232121]/20 rounded-2xl w-auto cursor-pointer px-4 h-18 transition-shadow duration-300 active:shadow-none shadow-md hover:shadow-green-800 flex flex-row gap-4 items-center justify-between max-sm:h-13 max-sm:px-3">
                <span aria-label="Available on Xbox store" className="text-lg font-extrabold max-sm:text-sm">Xbox Store</span>
                <FaXbox aria-label="Xbox store Icon" className="text-green-500 text-5xl max-sm:text-4xl" />
              </div>                  
            </Link>
            }
            {stores && stores.some((p) => (
              p.store.slug.includes('steam') 
            )) && 
            <Link href={`https://store.steampowered.com/search?term=${name.replace(/(\s)/g, '+')}`} target="_blank" aria-label="Steam store link">
              <div className="bg-[#232121]/20 rounded-2xl cursor-pointer w-auto px-4 h-18 transition-shadow duration-300 active:shadow-none shadow-md hover:shadow-gray-400 flex flex-row gap-4 items-center justify-between max-sm:h-13 max-sm:px-3">
                <span aria-label="Available on Steam store" className="text-lg font-extrabold max-sm:text-sm">Steam</span>
                <FaSteam aria-label="Steam Icon" className="text-shadow-white text-5xl max-sm:text-4xl"/>
              </div>                  
            </Link>
            }
            {stores && stores.some((p) => (
              p.store.slug.includes('epic-games') 
            )) &&
            <Link href={`https://store.epicgames.com/browse?q=${name}&sortBy=relevancy&sortDir=DESC&count=40`} target="_blank" aria-label="Epic-Games store link">
              <div className="bg-[#232121]/20 cursor-pointer rounded-2xl w-auto px-4 h-18 transition-shadow duration-300 active:shadow-none shadow-md hover:shadow-gray-600 flex flex-row gap-4 items-center justify-between max-sm:h-13 max-sm:px-2.5">
                <span aria-label="Available on Epic-Games store" className="text-lg font-extrabold max-sm:text-sm">Epic Games</span>
                <SiEpicgames aria-label="Epic-Games Icon" className="text-gray-500 text-5xl max-sm:text-4xl"/>
              </div>
            </Link>
            }
          </div>
        </section>
      }
    </>
  );
};

export default GameDetail;
