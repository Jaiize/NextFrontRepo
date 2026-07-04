import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface SideNavGenre {
  name: string;
  slug: string;
  img: string;
}

interface SideNavProps {
  setGenre: (val: string) => void;
  genre: string;
  setSideNav: (set: boolean) => void;
  sideNav: boolean;
}

const SideNav = ({ setGenre, genre, sideNav, setSideNav }: SideNavProps) => {
  const [screen, setScreen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const butRef = useRef<HTMLButtonElement | null>(null);

  const Genre: SideNavGenre[] = [
    {
      name: "Adventure",
      img: "https://media.rawg.io/media/games/8d6/8d69eb6c32ed6acfd75f82d532144993.jpg",
      slug: "adventure",
    },
    {
      name: "Action",
      img: "https://media.rawg.io/media/games/4be/4be6a6ad0364751a96229c56bf69be59.jpg",
      slug: "action",
    },
    {
      name: "Strategy",
      img: "",
      slug: "strategy",
    },
    {
      name: "Sports",
      img: "https://media.rawg.io/media/games/8cc/8cce7c0e99dcc43d66c8efd42f9d03e3.jpg",
      slug: "sports",
    },
    {
      name: "RPG",
      img: "https://media.rawg.io/media/games/26d/26d4437715bee60138dab4a7c8c59c92.jpg",
      slug: "rpg",
    },
    {
      name: "Platformer",
      img: "https://media.rawg.io/media/games/4cf/4cfc6b7f1850590a4634b08bfab308ab.jpg",
      slug: "platformer",
    },
    { name: "Racing", img: "", slug: "racing" },
    { name: "Shooting", img: "", slug: "shooting" },
    { name: "Arcade", img: "", slug: "arcade" },
    { name: "Fighting", img: "", slug: "fighting" },
  ];

  const handleMobileSelect = () => {
    const touch = navigator.maxTouchPoints > 0;
    if (touch) {
      setSideNav(false);
    }
  };

  const handleMobClickOutside = (e: TouchEvent) => {
    if (butRef.current && !butRef.current.contains(e.target as Node)) {
      if(sideNav){
        setTimeout(() => {
          setSideNav(false);
        }, 10)
      }
    }
  };

  // Handling touch outside
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.addEventListener("touchend", handleMobClickOutside);
    }
    return () =>
      document.removeEventListener("touchend", handleMobClickOutside);
  }, [sideNav]);

  // In progress
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (sideNav && butRef.current) {
      e.preventDefault();

      switch (e.key) {
        case "Escape":
          e.preventDefault();
          setSideNav(false);
          setScreen(false);
          butRef.current?.focus();
          break;
        case "ArrowDown":
          e.preventDefault();
          setScreen(true);
          setActiveIndex((prev) => (prev === Genre.length - 1 ? 0 : prev + 1));
          break;
        case "ArrowUp":
          e.preventDefault();
          setScreen(true);
          setActiveIndex((prev) => (prev === 0 ? Genre.length - 1 : prev - 1));
          break;
        case "Home":
          e.preventDefault();
          setScreen(true);
          setActiveIndex(0);
          break;
        case "End":
          e.preventDefault();
          setScreen(true);
          setActiveIndex(Genre.length - 1);
          break;
        case "Enter":
          e.preventDefault();
          if (sideNav) {
            setGenre(Genre[activeIndex].slug);
            setSideNav(false);
            setScreen(false);
            butRef.current?.focus();
          }
          break;
      }
    }
  };



  return (
    <button
      type="button"
      ref={butRef}
      className="flex flex-col items-center w-30 justify-start m-3 sticky top-16"
      role="combobox"
      aria-expanded={genre}
      aria-controls="dropdown-listbox"
      aria-haspopup="listbox"
      aria-activedescendant={`option-${activeIndex}`}
      onKeyDown={handleKeyDown}
    >
      <div className="flex items-center h-10 text-xl self-start mb-8 -mt-1 cursor-default">
        Genres
      </div>

      <div
        className="flex flex-col items-center self-start -ml-12"
        role="listbox"
        id="dropdown-listbox"
      >
        {Genre &&
          Genre.map(({ img, name, slug }, i) => (
            <div
              className={`${screen && activeIndex === i ? "bg-gray-900" : ""} flex flex-row gap-3 w-30 h-10 py-3 pr-3 rounded-md mb-2 items-center justify-start hover:text-blue-500`}
              id={`option-${i}`}
              role="option"
              aria-selected={genre === slug}
              key={name}
              onClick={() => {
                setGenre(slug);
                handleMobileSelect();
              }}
            >
              <Image
                className="w-10 h-10 rounded-md my-3 object-cover"
                title={name}
                alt={name}
                src={img || "/Nocontent.jpg"}
                loading="eager"
                width={100}
                height={50}
              />
              <h3
                className={`${genre === slug ? "text-blue-500" : ""} sm: max-sm:text-xs text-sm md:active:text-xs transition-all duration-300 cursor-pointer font-grotesk`}
              >
                {name}
              </h3>
            </div>
          ))}
      </div>
    </button>
  );
};

export default SideNav;

/**
 * Adventure: The Walking Dead Season 1 => "https://media.rawg.io/media/games/8d6/8d69eb6c32ed6acfd75f82d532144993.jpg"
 * Action: God of War (2018) => "https://media.rawg.io/media/games/4be/4be6a6ad0364751a96229c56bf69be59.jpg"
 * Racing:
 * Shooting:
 * Massively Multiplayer: Warframe => "https://media.rawg.io/media/games/f87/f87457e8347484033cb34cde6101d08d.jpg"
 * Sports: Rocket League => "https://media.rawg.io/media/games/8cc/8cce7c0e99dcc43d66c8efd42f9d03e3.jpg"
 * RPG: Cyberpunk 2077 => "https://media.rawg.io/media/games/26d/26d4437715bee60138dab4a7c8c59c92.jpg"
 * Platformer: Hollow Knight => "https://media.rawg.io/media/games/4cf/4cfc6b7f1850590a4634b08bfab308ab.jpg"
 */
