"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { getBookReadingRecords, getReadingBooks } from "@/src/api";
import {
  ReadingBookShelf,
  Button,
  DailyReadingRecords,
} from "@/src/components";
import { useQuery } from "@tanstack/react-query";

export default function Write() {
  const [bookReadingRecords, setBookReadingRecords] = useState<readingRecord[]>(
    [],
  );
  const [selectedBook, setSelectedBook] = useState<book | null>(null);
  const { isPending, data: readingbooks } = useQuery({
    queryKey: ["readingbooks"],
    queryFn: getReadingBooks,
    staleTime: Infinity,
  });

  // 책 변경에 대한 값 반영.
  const handleSelectedBook = (nextSelectedBook: book) => {
    if (!selectedBook || nextSelectedBook.id !== selectedBook.id) {
      return setSelectedBook(() => nextSelectedBook);
    }
    setSelectedBook(null);
  };

  const handleBookReadingRecords = async () => {
    if (!selectedBook) return setBookReadingRecords(() => []);

    const bookReadingRecords = await getBookReadingRecords(selectedBook.id);
    setBookReadingRecords(() => bookReadingRecords);
  };

  // 선택한 책이 변경될 때 마다 해당 책의 기록을 불러옴.
  useEffect(() => {
    handleBookReadingRecords();
  }, [selectedBook]);

  return (
    <main className="flex h-full w-full flex-col gap-4">
      <NewBookButton
        isReadingbookExist={!readingbooks || !!readingbooks.length}
      />
      {isPending && <span>Loading...</span>}
      {!isPending && !!readingbooks && (
        <>
          <ReadingBookShelf
            readingBooks={readingbooks}
            selectedBook={selectedBook}
            onClick={handleSelectedBook}
          />
          {!readingbooks.length && (
            <Link href="/write/book/create">
              <Button>새로운 책 등록하기</Button>
            </Link>
          )}
          {selectedBook && (
            <div className="flex flex-col gap-2">
              <Link
                href={{
                  pathname: `/write/record/create/${selectedBook.bookInfo.title}`,
                  query: {
                    book: JSON.stringify(selectedBook),
                  },
                }}
              >
                <Button>새로운 독서 기록하기</Button>
              </Link>
              <Link
                href={{
                  pathname: "/finish-book",
                  query: {
                    book: JSON.stringify(selectedBook),
                  },
                }}
              >
                <Button type="line">이 책을 다 읽었어요</Button>
              </Link>
            </div>
          )}
          {selectedBook && !!bookReadingRecords.length && (
            <div className="w-full overflow-auto rounded-lg bg-white p-4">
              <DailyReadingRecords readingRecords={bookReadingRecords} />
            </div>
          )}
          {selectedBook && !bookReadingRecords.length && (
            <div className="text-center text-neutral-300">
              작성한 기록이 없어요
            </div>
          )}
          {!!readingbooks.length && !selectedBook && (
            <div className="p-3 text-center text-neutral-300">
              기록할 책을 선택해주세요
            </div>
          )}
        </>
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
    <div className="shrink-0 text-right">
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
