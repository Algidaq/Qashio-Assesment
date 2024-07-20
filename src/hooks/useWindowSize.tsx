"use client";
import { useState, useEffect } from "react";

type WindowSizeType = {
  width: number;
  height?: undefined | number;
};

const useWindowSize = (): WindowSizeType => {
  const [windowSize, setWindowSize] = useState<WindowSizeType>({
    width: typeof window !== "undefined" ? window.innerWidth : 1024,
    height: undefined,
  });
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSize;
};

export default useWindowSize;
