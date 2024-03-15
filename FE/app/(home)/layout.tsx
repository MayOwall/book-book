"use client";

import { useModalStore } from "@/src/stores";
import { Modal, BottomBar } from "@/src/components";
import { Suspense } from "react";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const modalContent = useModalStore((state) => state.content);

  return (
    <Suspense>
      {modalContent && <Modal>{modalContent}</Modal>}
      <div className="h-full w-full pb-12">{children}</div>
      <BottomBar />
    </Suspense>
  );
}
