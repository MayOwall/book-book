"use client";
import { ReactNode } from "react";

interface Button {
  children: ReactNode;
  size?: "tiny" | "small" | "large";
  status?: "primary" | "success" | "warning" | "danger" | "info" | "disabled";
  onClick?: () => void;
}

export default function Button({
  size = "large",
  status = "primary",
  children,
  onClick,
}: Button) {
  const sizeStyle = `button-${size}`;
  const statusStyle =
    size === "tiny" ? `status-${status}-line` : `status-${status}-fill`;

  return (
    <button
      className={`${sizeStyle} ${statusStyle}`}
      onClick={onClick}
      disabled={status === "disabled"}
    >
      {children}
    </button>
  );
}
