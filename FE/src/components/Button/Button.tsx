"use client";

import type { Button } from "@/src/types";

export default function Button({ children, type = "fill", onClick }: Button) {
  const styleByType =
    type === "fill"
      ? "bg-main text-white"
      : "bg-white text-emerald-400 border border-emerald-400";
  return (
    <button
      className={`h-12 w-full shrink-0 rounded-lg font-bold ${styleByType}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
