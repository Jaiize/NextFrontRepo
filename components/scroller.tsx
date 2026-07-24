"use client"
import { clearTimeout } from "node:timers";
import React, { useEffect, useLayoutEffect } from "react";

const Scroller = ({ children }: { children: React.ReactNode }) => {
    
  // Store scroll position
  useEffect(() => {
    if (typeof window !== "undefined") {
      let t: NodeJS.Timeout
      const handleScroll = () => {
        // Prevents re-writing scroll posn. as the init-view state/posn When client navigates backward
        t = setTimeout(() => {
          const path = window.location.pathname;
          const xy = (window.pageXOffset.toString() + "," + window.pageYOffset.toString());
          sessionStorage.setItem(path, xy);          
        }, 100)
      };

      window.addEventListener("scrollend", handleScroll);
      return () => {
        window.removeEventListener("scrollend", handleScroll)
        clearTimeout(t)
      };
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

  return (<div>{children}</div>);
};

export default Scroller;
