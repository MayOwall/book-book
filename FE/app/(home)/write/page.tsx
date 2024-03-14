"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  getReadingbooks,
  getAllBookRecords,
  getSelectedBookRecords,
} from "@/src/api";
import { ReadingBookShelf, Button, BookRecordsByDate } from "@/src/components";
import type { bookInfo, bookRecord } from "@/src/types";

export default function Write() {
  const [readingbooks, setReadingbooks] = useState<bookInfo[]>([]);
  const [bookRecords, setBookRecords] = useState<bookRecord[]>([]);
  const [selectedBook, setSelectedBook] = useState<bookInfo | null>(null);

  // 책 변경에 대한 값 반영.
  const handleSelectedBook = (nextSelectedBook: bookInfo) => {
    if (!selectedBook || nextSelectedBook.isbn !== selectedBook.isbn) {
      return setSelectedBook(() => nextSelectedBook);
    }
    setSelectedBook(null);
  };

  // 첫 랜더링시 모든 읽고 있는 책을 불러옴.
  useEffect(() => {
    const readingbooks = getReadingbooks();
    setReadingbooks(() => readingbooks);
  }, []);

  // 첫 랜더링시 모든 책 기록을 불러옴.
  useEffect(() => {
    const allBookRecords = getAllBookRecords();
    setBookRecords(() => allBookRecords);
  }, []);

  // 선택한 책이 변경될 때 마다 해당 책의 기록을 불러옴.
  useEffect(() => {
    if (!selectedBook) {
      const nextBookRecords = getAllBookRecords();
      return setBookRecords(() => nextBookRecords);
    }

    const nextBookRecords = getSelectedBookRecords(selectedBook.isbn);
    setBookRecords(() => nextBookRecords);
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
        <Link href="/write/book/create">
          <Button>새 책 등록하기</Button>
        </Link>
      )}
      {selectedBook && (
        <Link
          href={{
            pathname: `/write/record/create/${selectedBook.title}`,
            query: {
              bookInfo: JSON.stringify(selectedBook),
            },
          }}
        >
          <Button>새 북밋 생성</Button>
        </Link>
      )}
      {!!bookRecords.length && <BookRecordsByDate bookRecords={bookRecords} />}
      {!bookRecords.length && (
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
      <Link href="/write/book/create">
        <button
          className={`${!isReadingbookExist && "invisible"} text-sm text-blue-500`}
        >
          새 책 등록
        </button>
      </Link>
    </div>
  );
}
