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
      <NewBookButton isReadingbookExist={!!readingbooks.length} />
      <ReadingBookShelf
        readingbooks={readingbooks}
        onClick={handleSelectedBook}
      />
      {!readingbooks.length && (
        <Link href="./books/create">
          <LargeButton>새 책 등록하기</LargeButton>
        </Link>
      )}
      {selectedbookIsbn}
    </main>
  );
}

function NewBookButton({
  isReadingbookExist,
}: {
  isReadingbookExist: boolean;
}) {
  return (
    <div className="text-right">
      <Link href="/books/create">
        <button
          className={`${!isReadingbookExist && "invisible"} text-sm text-blue-500`}
        >
          새 책 등록
        </button>
      </Link>
    </div>
  );
}
