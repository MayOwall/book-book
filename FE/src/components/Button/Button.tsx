"use client";

import { ReactNode } from "react";

export default function Button({
  children,
  type = "fill",
  onClick,
}: {
  children: ReactNode;
  type?: "fill" | "line";
  onClick?: () => any;
}) {
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
