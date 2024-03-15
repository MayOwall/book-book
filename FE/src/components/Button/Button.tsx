"use client";

import type { Button } from "@/src/types";

export default function Button({ children, onClick }: Button) {
  return (
    <button
      className={`h-12 w-full shrink-0 rounded-lg bg-main font-bold text-white`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
