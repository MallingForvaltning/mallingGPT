"use client";
import { FC, useEffect, useState } from "react";

interface Props {
  text: string;
  speed?: number;
}

export const TypewriterText: FC<Props> = ({ text, speed = 40 }) => {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    setDisplayed("");
    let index = 0;
    const id = setInterval(() => {
      setDisplayed((prev) => prev + text.charAt(index));
      index += 1;
      if (index >= text.length) {
        clearInterval(id);
      }
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);

  return (
    <span>
      {displayed}
      <span className="animate-pulse">|</span>
    </span>
  );
};
