"use client";
import { clearTimeout } from "node:timers";
import React, { useEffect, useLayoutEffect } from "react";

const Scroller = ({ children }: { children: React.ReactNode }) => {

  // Store scroll position
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    if (typeof window !== "undefined") {
      const handleScroll = () => {
        const path = window.location.pathname;
        const xy = window.pageXOffset.toString() + "," + window.pageYOffset.toString();
        sessionStorage.setItem(path, xy);
      };

      window.addEventListener("click", handleScroll, { signal });
      window.addEventListener("touchend", handleScroll, { signal });
    }
    return () => {
      controller.abort();
    };
  }, []);


  // Restore scroll position
  useLayoutEffect(() => {
    let time: NodeJS.Timeout;
    const controller = new AbortController();
    const { signal } = controller;
    if (typeof window !== "undefined") {
      const scrollto = () => {
        const path = window.location.pathname;
        const position = sessionStorage.getItem(path);
        if (position) {
          const [x, y] = position.split(",");
          
          time = setTimeout(() => {
            window.scrollTo({
              top: parseInt(y),
              left: parseInt(x),
              behavior: "smooth",
            });
          }, 450);
        }
      }
      scrollto()
      
      window.addEventListener('popstate', scrollto, { signal })

    }
    return () => {
      controller.abort();
      clearTimeout(time);
    };
  }, []);

  return <div>{children}</div>;
};

export default Scroller;
