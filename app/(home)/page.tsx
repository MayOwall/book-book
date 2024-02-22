"use client";

import Link from "next/link";
import { useState } from "react";
import { ReadingBookShelf, LargeButton } from "@/src/components";
import { bookinfo } from "@/src/types";

export default function Home() {
  const [selectedbook, setSelectedbook] = useState<bookinfo | null>(null);
  const handleSelectedBook = (bookinfo: bookinfo) => {
    setSelectedbook(() => bookinfo);
  };
  return (
    <main className="flex flex-col gap-1">
      <ReadingBookShelf handleSelectedBook={handleSelectedBook} />
      <Link href="./books/create">
        <LargeButton>새 책 등록하기</LargeButton>
      </Link>
      {JSON.stringify(selectedbook)}
    </main>
  );
}
