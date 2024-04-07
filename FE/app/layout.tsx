import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/src/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "BOOKMIT 📚",
  description: "읽은 페이지를 꾸준히 기록하고 한눈에 모아 보세요",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={inter.className}>
      <body className="flex justify-center">
        <div className="min-h-fit w-full max-w-screen-sm">{children}</div>
      </body>
    </html>
  );
}
