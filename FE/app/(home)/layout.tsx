"use client";

import { useModalStore } from "@/src/stores";
import { Modal, BottomBar } from "@/src/components";
import { Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const modalContent = useModalStore((state) => state.content);
  const queryClient = new QueryClient();

  return (
    <Suspense>
      <QueryClientProvider client={queryClient}>
        {modalContent && <Modal>{modalContent}</Modal>}
        <div className="h-full w-full pb-12">{children}</div>
        <BottomBar />
      </QueryClientProvider>
    </Suspense>
  );
}
