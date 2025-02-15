import { useState, useEffect } from "react";

export const useTruncateText = (text: string, sentenceLimit: number) => {
  const [truncatedText, setTruncatedText] = useState(text);

  useEffect(() => {
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [text]; // Split text into sentences
    const truncated = sentences.slice(0, sentenceLimit).join(" ") + (sentences.length > sentenceLimit ? "..." : "");
    setTruncatedText(truncated);
  }, [text, sentenceLimit]);

  return truncatedText;
};

