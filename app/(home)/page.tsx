"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { getReadingbooks, getAllBookmits } from "@/src/api";
import {
  ReadingBookShelf,
  LargeButton,
  BookmitsByDate,
} from "@/src/components";
import type { BookmitsByDate as bookmitsByDate, bookinfo } from "@/src/types";

export default function Home() {
  const [readingbooks, setReadingbooks] = useState([]);
  const [bookmits, setBookmits] = useState([]);
  const [selectedBook, setSelectedBook] = useState<bookinfo | null>(null);

  const handleSelectedBook = (bookinfo: bookinfo) => {
    if (bookinfo.isbn === selectedBook?.isbn) {
      setSelectedBook(null);
      return;
    }
    setSelectedBook(() => bookinfo);
  };

  useEffect(() => {
    const readingbooks = getReadingbooks();
    setReadingbooks(() => readingbooks);
  }, []);

  useEffect(() => {
    const bookmits = getAllBookmits();
    setBookmits(() => bookmits);
  }, []);

  return (
    <main className="flex flex-col gap-1">
      <NewBookButton isReadingbookExist={!!readingbooks.length} />
      <ReadingBookShelf
        readingbooks={readingbooks}
        selectedBook={selectedBook}
        onClick={handleSelectedBook}
      />
      {!readingbooks.length && (
        <Link href="./books/create">
          <LargeButton>새 책 등록하기</LargeButton>
        </Link>
      )}
      <div>선택 : {JSON.stringify(selectedBook)}</div>
      {!!bookmits &&
        bookmits.map((bookmitsByDate: bookmitsByDate) => (
          <BookmitsByDate key={bookmitsByDate.date} {...bookmitsByDate} />
        ))}
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
