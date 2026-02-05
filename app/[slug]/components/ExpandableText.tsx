"use client";

import { useState } from "react";

interface Props {
  text: string;
  maxLines?: number;
}

export default function ExpandableText({
  text,
  maxLines = 3,
}: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <p
        style={{
          margin: 0,
          fontSize: 14,
          lineHeight: 1.5,
          display: "-webkit-box",
          WebkitLineClamp: expanded ? "none" : maxLines,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {text}
      </p>

      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          background: "none",
          border: "none",
          padding: 0,
          marginTop: 4,
          color: "#1B5E3C",
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        {expanded ? "Ver menos" : "Ver más"}
      </button>
    </>
  );
}
