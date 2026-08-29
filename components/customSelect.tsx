import useTheme from "next-theme";
import React, { useEffect, useRef, useState } from "react";
// import { BiChevronDown } from 'react-icons/bi'
import { HiCheck } from "react-icons/hi2";
import { GrAscend, GrDescend } from "react-icons/gr";
import { FcAlphabeticalSortingAz } from "react-icons/fc";
import { FcAlphabeticalSortingZa } from "react-icons/fc";
import { TbChartBarPopular } from "react-icons/tb";

export interface SelectProps {
  value: string;
  options: { value: string; label: string; slug: string }[];
  onChange: (val: string | ((val: string) => string)) => void;
  placeholder: string;
}

const CustomSelect = ({
  value,
  options,
  onChange,
  placeholder,
}: SelectProps) => {
  const [show, setShow] = useState(false);
  const [nav, setNav] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const buttonref = useRef<HTMLButtonElement | null>(null);
  const listref = useRef<HTMLDivElement | null>(null);
  const optionRefs = useRef<HTMLDivElement[]>([]);
  const { theme } = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);

  const handleOutside = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setShow(false);
      setNav(false);
    }
  };

  // Focus on options when navigating through select options
  useEffect(() => {
    if (show && optionRefs.current[activeIndex]) {
      optionRefs.current[activeIndex].scrollIntoView({
        block: "nearest",
      });
    }
  }, [show, activeIndex]);

  // Handling mousedown outside
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.addEventListener("mousedown", handleOutside);
    }
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const selectedOPt = options.find((f) => f.value === value);

  // Set activeIndex from current value's index
  useEffect(() => {
    const setIndex = (i: number) => setActiveIndex(i >= 0 ? i : 0);
    if (show) {
      const idx = options.findIndex((o) => o.value === value);
      setIndex(idx);
    }
  }, [show, value, options]);

    const cleanOrder = (): string => {
    localStorage.setItem("order", "");
    return ""
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (
      !show &&
      (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ")
    ) {
      e.preventDefault();
      setShow(true);
      return;
    }

    switch (e.key) {
      case "Escape":
        e.preventDefault();
        setShow(false);
        setNav(false);
        buttonref.current?.focus();
        break;
      case "ArrowDown":
        e.preventDefault();
        setNav(true);
        setActiveIndex((prev) => (prev === options.length - 1 ? 0 : prev + 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setNav(true);
        setActiveIndex((prev) => (prev === 0 ? options.length - 1 : prev - 1));
        break;
      case "Home":
        e.preventDefault();
        setNav(true);
        setActiveIndex(0);
        break;
      case "End":
        e.preventDefault();
        setNav(true);
        setActiveIndex(options.length - 1);
        break;
      case "Enter":
        e.preventDefault();
        if (show) {
          onChange((v) => v === options[activeIndex].value ? cleanOrder() : options[activeIndex].value);
          setShow(false);
          setNav(false);
          buttonref.current?.focus();
        }
        break;
    }
  };

  return (
    <div ref={ref} className="relative w-fit sm: max-sm:ml-1">
      <button
        onKeyDown={handleKeyDown}
        type="button"
        ref={buttonref}
        role="combobox"
        aria-expanded={show}
        aria-pressed={show}
        aria-haspopup="listbox"
        aria-controls="dropdown-listbox"
        aria-activedescendant={show ? `option-${activeIndex}` : undefined}
        className="flex items-center justify-between w-full gap-1.5 hover:cursor-pointer pretty-focus"
        onClick={() => setShow((s) => !s)}
      >
        {selectedOPt ? (
          <span className="font-grotesk text-sm sm: max-sm:text-xs">
            {selectedOPt.label}
          </span>
        ) : (
          <div className="font-grotesk text-sm sm: max-sm:text-xs">
            {placeholder}
          </div>
        )}
        <div
          className={`transition-transform duration-300 ease-in-out ${show ? "rotate-180" : ""}`}
        >
          <svg
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth={2}
            strokeLinejoin="round"
            fill="none"
            viewBox="0 0 24 24"
            className="w-5 h-5"
          >
            <path d="M19 9 l-7 7 l-7 -7" />
          </svg>
          {/* <BiChevronDown className='w-6 h-6'/> */}
        </div>
      </button>
      <div
        ref={listref}
        role="listbox"
        id="dropdown-listbox"
        className={`${theme === "dark" ? "bg-zinc-900" : "bg-zinc-500"} absolute z-20 w-50 top-8 -left-20 sm: max-sm:-left-18 transition-all duration-300 
          shadow-md shadow-zinc-900 rounded-md py-2 sm: max-sm:w-47 ${show ? "opacity-100 translate-y-0 pointer-events-auto" : "translate-y-3 pointer-events-none opacity-0"}`}
      >
        {options.map((o, i) => (
          <div
            ref={(el) => {
              if (el) optionRefs.current[i] = el;
            }}
            id={`option-${i}`}
            onClick={() => {
              onChange((v) => v === o.value ? cleanOrder() : o.value);
              setShow(false);
              buttonref.current?.focus();
            }}
            role="option"
            aria-selected={value === o.value}
            key={o.value}
            className={`${i === activeIndex && nav === true ? "bg-blue-500/20 shadow-sm shadow-zinc-800" : "bg-none"} flex flex-row gap-7 hover:cursor-pointer items-center justify-between hover:text-blue-800`}
          >
            <div className="font-grotesk h-8.5 ml-5 text-sm flex flex-row items-center gap-3 sm: max-sm:text-xs sm: max-sm:h-8">
              {o.slug.includes("asc") && <GrAscend className="h-4 w-4" />}
              {o.slug.includes("dsc") && <GrDescend className="h-4 w-4" />}
              {o.slug.includes("az") && <FcAlphabeticalSortingAz className="h-4 w-4" />}
              {o.slug.includes("za") && <FcAlphabeticalSortingZa className="h-4 w-4" />}
              {o.slug.includes("known") && <TbChartBarPopular className="h-4 w-4" />}
              {o.label}
            </div>
            <div className="flex items-center mr-3">
              {value === o.value && <HiCheck className="h-5 w-5" />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomSelect;
