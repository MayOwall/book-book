"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import FNB from "@/src/components/molecules/FNB";

export default function Layout({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="relative h-full min-w-80 max-w-screen-sm bg-gray-50">
        {children}
        <FNB />
      </div>
    </QueryClientProvider>
  );
}
