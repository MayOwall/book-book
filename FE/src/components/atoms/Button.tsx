"use client";
import { ReactNode } from "react";

interface Button {
  children: ReactNode;
  size?: "tiny" | "small" | "large";
  status?: "primary" | "success" | "warning" | "danger" | "info" | "disabled";
  onClick?: () => void;
  type?: "button" | "submit";
}

export default function Button({
  size = "large",
  status = "primary",
  children,
  onClick,
  type = "button",
}: Button) {
  const sizeStyle = `button-${size}`;
  const statusStyle =
    size === "tiny"
      ? `status-${status}-line bg-transparent`
      : `status-${status}-fill`;

  return (
    <button
      className={`${sizeStyle} ${statusStyle}`}
      onClick={onClick}
      disabled={status === "disabled"}
      type={type}
    >
      {children}
    </button>
  );
}
