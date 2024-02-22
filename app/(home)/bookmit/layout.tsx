"use client";

import { Suspense } from "react";

export default function BookmitLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Suspense>{children}</Suspense>;
}
