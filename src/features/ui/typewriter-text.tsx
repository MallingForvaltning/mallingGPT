"use client";
import { FC, useEffect, useRef, useState } from "react";

interface Props {
  text: string;
  speed?: number;
}

export const TypewriterText: FC<Props> = ({ text, speed = 40 }) => {
  const [displayed, setDisplayed] = useState("");
  const indexRef = useRef(0);

  useEffect(() => {
    setDisplayed("");
    indexRef.current = 0;
    const id = setInterval(() => {
      setDisplayed(text.slice(0, indexRef.current + 1));
      indexRef.current += 1;
      if (indexRef.current >= text.length) {
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
