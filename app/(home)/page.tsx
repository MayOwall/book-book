"use client";
import { ReadingBookShelf, LargeButton } from "@/src/components";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col gap-1">
      <ReadingBookShelf />
      <Link href="./create-new-book">
        <LargeButton>새 책 등록하기</LargeButton>
      </Link>
    </main>
  );
}
