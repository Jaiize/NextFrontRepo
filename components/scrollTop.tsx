"use client";
import { useEffect, useState } from "react";
import { FaArrowAltCircleUp } from "react-icons/fa";

const ScrollTop = () => {
  const [release, setRelease] = useState(false);
  const handlePopOut = (e: Event) => {
    if (typeof document !== "undefined") {
      const scrollTop = document.documentElement.scrollTop;
      const height = document.body.scrollHeight;
      if (scrollTop >= Math.round(height / 2)) {
        setRelease(true);
        return;
      }
      setRelease(false);
    }
  };

  const handleClick = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({
        behavior: "smooth",
        top: 0,
        left: 0,
      });
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handlePopOut, { signal });
    }
    return () => controller.abort();
  }, []);
  return (
    <div
      className={`fixed h-9 w-9 bottom-5 transition-all duration-200 ${release ? "opacity-100 right-5 pointer-events-auto cursor-pointer" : "pointer-events-none right-0 opacity-0"}`}
      onClick={() => handleClick()}
    >
      <FaArrowAltCircleUp className="h-full w-full" />
    </div>
  );
};

export default ScrollTop;
