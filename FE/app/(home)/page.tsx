"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  getReadingbooks,
  getAllBookmits,
  getSelectedBookmits,
} from "@/src/api";
import {
  ReadingBookShelf,
  LargeButton,
  BookmitsByDate,
} from "@/src/components";
import type { BookmitsByDate as bookmitsByDate, bookinfo } from "@/src/types";

export default function Home() {
  const [readingbooks, setReadingbooks] = useState([]);
  const [bookmits, setBookmits] = useState<bookmitsByDate[]>([]);
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

  useEffect(() => {
    if (!selectedBook) {
      const bookmits = getAllBookmits();
      setBookmits(() => bookmits);
      return;
    }
    const bookmits = getSelectedBookmits(selectedBook.isbn);
    setBookmits(() => bookmits);
  }, [selectedBook]);

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
      {selectedBook && (
        <Link
          href={`/bookmit/create?isbn=${selectedBook.isbn}&title=${selectedBook.title}`}
        >
          <LargeButton>새 북밋 생성</LargeButton>
        </Link>
      )}
      {!!bookmits.length &&
        bookmits.map((bookmitsByDate: bookmitsByDate) => (
          <BookmitsByDate key={bookmitsByDate.date} {...bookmitsByDate} />
        ))}
      {!bookmits.length && (
        <div className="m-2 text-center text-sm text-neutral-400">
          작성한 북밋이 없어요
        </div>
      )}
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