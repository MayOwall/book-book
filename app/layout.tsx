import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

export const inter = Inter({
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
      <body>{children}</body>
    </html>
  );
}
