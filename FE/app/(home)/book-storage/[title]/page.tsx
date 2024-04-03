"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { DailyReadingRecords, BookInfoCard, Button } from "@/src/components";
import { getBook, getBookReadingRecords, putBook } from "@/src/api";
import { useQueryClient } from "@tanstack/react-query";

export default function BookStorageDetail() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id")!;
  const router = useRouter();
  const [book, setBook] = useState<book | null>(null);
  const [bookReadingRecords, setBookReadingRecords] = useState<readingRecord[]>(
    [],
  );
  const queryClient = useQueryClient();

  const onReReadButtonClick = () => {
    putBook(id, { isFinished: false });
    queryClient.invalidateQueries({
      queryKey: ["readingbooks"],
    });
    queryClient.invalidateQueries({
      queryKey: ["finishedBooks"],
    });
    router.push("/write");
  };

  useEffect(() => {
    (async function () {
      const book = await getBook(id);
      const bookReadingRecords = await getBookReadingRecords(id);
      setBook(() => book);
      setBookReadingRecords(() => bookReadingRecords);
    })();
  }, []);

  return (
    <main className="flex h-full w-full flex-col gap-8">
      {book && (
        <section className="flex flex-col gap-4">
          <h2 className="font-bold text-neutral-300">책 정보</h2>
          <BookInfoCard bookInfo={book.bookInfo} />
          <Button type="line" onClick={onReReadButtonClick}>
            이 책 다시 읽을래요
          </Button>
        </section>
      )}
      {book && (
        <section className="flex flex-col gap-4">
          <h2 className="font-bold text-neutral-300">독서 기록</h2>
          <DailyReadingRecords readingRecords={bookReadingRecords} />
        </section>
      )}
    </main>
  );
}
