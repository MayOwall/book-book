"use client";

import type { LargeButton } from "@/src/types";

export default function LargeButton({
  children,
  type = "fill",
  onClick,
}: LargeButton) {
  const buttonStyle = type === "fill" ? "bg-black text-white" : "bg-white";
  return (
    <button
      className={`${buttonStyle} h-14 w-full rounded border`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
