"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ReadingBookShelf, LargeButton } from "@/src/components";

export default function Home() {
  const [readingbooks, setReadingbooks] = useState([]);
  const [selectedbookIsbn, setSelectedbookIsbn] = useState<string | null>(null);

  const handleSelectedBook = (isbn: string) => {
    setSelectedbookIsbn(() => (isbn === selectedbookIsbn ? null : isbn));
  };

  useEffect(() => {
    const localReadingbooks = localStorage.getItem("readingbooks");
    const readingbooks = localReadingbooks ? JSON.parse(localReadingbooks) : [];
    setReadingbooks(() => readingbooks);
  }, []);

  return (
    <main className="flex flex-col gap-1">
      <ReadingBookShelf
        readingbooks={readingbooks}
        onClick={handleSelectedBook}
      />
      <Link href="./books/create">
        <LargeButton>새 책 등록하기</LargeButton>
      </Link>
      {selectedbookIsbn}
    </main>
  );
}
