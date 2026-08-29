import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface SideNavGenre {
  name: string;
  slug: string;
  img: string;
}

interface SideNavProps {
  setGenre: React.Dispatch<React.SetStateAction<string>>;
  genre: string;
  setSideNav: (set: boolean) => void;
  sideNav: boolean;
  masterRef: React.RefObject<HTMLElement | null>
}

const SideNav = ({ setGenre, genre, sideNav, setSideNav, masterRef }: SideNavProps) => {
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
      img: "https://media.rawg.io/media/games/0bd/0bd5646a3d8ee0ac3314bced91ea306d.jpg",
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
      slug: "role-playing-games-rpg",
    },
    {
      name: "Platformer",
      img: "https://media.rawg.io/media/games/4cf/4cfc6b7f1850590a4634b08bfab308ab.jpg",
      slug: "platformer",
    },
    {
      name: "Racing",
      img: "https://media.rawg.io/media/games/e96/e96d3582bf1bd6dbe6edae5319dcdb83.jpg",
      slug: "racing",
    },
    {
      name: "Shooter",
      img: "https://media.rawg.io/media/games/1e5/1e5e33b88be978f451196a751424a72e.jpg",
      slug: "shooter",
    },
    {
      name: "Arcade",
      img: "https://media.rawg.io/media/games/082/082365507ff04d456c700157072d35db.jpg",
      slug: "arcade",
    },
    {
      name: "Fighting",
      img: "https://media.rawg.io/media/games/aa3/aa36ba4b486a03ddfaef274fb4f5afd4.jpg",
      slug: "fighting",
    },
  ];

  // Half-displayed sidenavbar goes back into hiding after a touch or selection
  const handleMobileSelect = () => {
    const touch = navigator.maxTouchPoints > 0;
    if (touch) {
      setSideNav(false);
    }
  };
  // Handles mobile click outside for half-displayed sidenavbar (PC version) NB: It's almost useless for now. (< 800 was < 1240 before)
  const handleMobClickOutside = (e: TouchEvent) => {
    if (typeof window !== 'undefined') {
      if (masterRef.current && !masterRef.current.contains(e.target as Node) && window.innerWidth < 800) {
        if (sideNav) {
          setTimeout(() => {
            setSideNav(false);
          }, 10);
        }
      }

    }
  };

  // To turn off highlight for half-displayed sidenavbar items / properties
  const turnOffIndicator = (e: MouseEvent) => {
    if (butRef.current && !butRef.current.contains(e.target as Node)) {
      setScreen(false);
    }
  }

  // Turn off indicator for screen reader
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.addEventListener("click", turnOffIndicator);
    }
    return () =>
      document.removeEventListener("click", turnOffIndicator);
  }, []);

  // Handling touch outside
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.addEventListener("touchend", handleMobClickOutside);
    }
    return () =>
      document.removeEventListener("touchend", handleMobClickOutside);
  }, [sideNav]);

  const cleanGenre = (): string => {
    localStorage.setItem("genre", "");
    return ""
  }

  // On Keydown
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
            setGenre(prev => (prev === Genre[activeIndex].slug ? cleanGenre() : Genre[activeIndex].slug));
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
      className="flex flex-col items-center w-30 justify-start m-3 pretty-focus md:sticky md:top-17"
      role="combobox"
      aria-expanded={sideNav}
      aria-pressed={sideNav}
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
              className={`${screen && activeIndex === i ? "bg-gray-500" : "bg-transparent"} flex flex-row gap-3 w-full h-10 py-3 pr-3 rounded-md mb-2 items-center justify-start hover:text-blue-500`}
              id={`option-${i}`}
              role="option"
              aria-selected={genre === slug}
              key={name}
              onClick={() => {
                setGenre(prev => (prev === slug ? cleanGenre() : slug));
                handleMobileSelect();
              }}
            >
              <Image
                className="w-12 h-10 rounded-md my-3 object-cover"
                title={name}
                alt={name}
                src={img || "/Nocontent.jpg"}
                loading="eager"
                width={100}
                height={50}
              />
              <h3
                className={`${genre === slug ? "text-blue-500" : ""} sm: max-sm:text-xs text-sm md:active:text-xs transition-all duration-100 cursor-pointer font-grotesk`}
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
