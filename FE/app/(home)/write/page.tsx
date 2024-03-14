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
    <main className="flex flex-col gap-4">
      <NewBookButton isReadingbookExist={!!readingbooks.length} />
      <ReadingBookShelf
        readingbooks={readingbooks}
        selectedBook={selectedBook}
        onClick={handleSelectedBook}
      />
      {!readingbooks.length && (
        <Link href="/write/book/create">
          <Button>새로운 책 등록하기</Button>
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
          <Button>새로운 독서 기록하기</Button>
        </Link>
      )}
      {selectedBook && !!bookRecords.length && (
        <div className="w-full rounded-lg bg-white p-4">
          <BookRecordsByDate bookRecords={bookRecords} />
        </div>
      )}
      {selectedBook && !bookRecords.length && (
        <div className="text-center text-neutral-300">작성한 기록이 없어요</div>
      )}
      {!selectedBook && (
        <div className="p-3 text-center text-neutral-300">
          기록할 책을 선택해주세요
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
          className={`${!isReadingbookExist && "invisible"} text-emerald-400`}
        >
          새 책 등록
        </button>
      </Link>
    </div>
  );
}
