"use client";
import React, { useState, useEffect } from "react";

// Types
import { CountdownProps } from "./types";

const Countdown: React.FC<CountdownProps> = ({
  className,
  countdown,
  speed,
  step = 1,
  preText,
  postText,
}) => {
  const [currentCount, setCurrentCount] = useState<number>(0);

  useEffect(() => {
    if (currentCount < countdown) {
      const timerId = setInterval(() => {
        setCurrentCount((prevCount) => Math.min(prevCount + step, countdown));
      }, speed * 3);

      return () => clearInterval(timerId);
    }
  }, [currentCount, countdown, speed, step]);

  return (
    <div className={className}>
      {preText && <span>{preText}</span>}
      <span>{currentCount}</span>
      {postText && <span>{postText}</span>}
    </div>
  );
};

export default Countdown;
