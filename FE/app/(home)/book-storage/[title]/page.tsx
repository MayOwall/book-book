"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BookRecordsByDate, BookInfoCard, Button } from "@/src/components";
import {
  getBookInfo,
  getSelectedBookRecords,
  putReStartBookInfo,
} from "@/src/api";
import type { bookRecord, bookInfo } from "@/src/types";

export default function BookStorageDetail() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isbn = searchParams.get("isbn")!;

  const [bookInfo, setBookInfo] = useState<bookInfo | null>(null);
  const [bookRecords, setBookRecords] = useState<bookRecord[]>([]);

  const onReReadButtonClick = () => {
    if (!bookInfo) return;

    putReStartBookInfo(bookInfo.isbn);
    router.push("/write");
  };

  useEffect(() => {
    const bookInfo = getBookInfo(isbn);
    setBookInfo(() => bookInfo);

    const bookRecords = getSelectedBookRecords(isbn);
    setBookRecords(() => bookRecords);
  }, []);

  return (
    <main className="flex h-full w-full flex-col gap-8">
      {bookInfo && (
        <section className="flex flex-col gap-4">
          <h2 className="font-bold text-neutral-300">책 정보</h2>
          <BookInfoCard bookinfo={bookInfo} />
          <Button type="line" onClick={onReReadButtonClick}>
            이 책 다시 읽을래요
          </Button>
        </section>
      )}
      {bookInfo && (
        <section className="flex flex-col gap-4">
          <h2 className="font-bold text-neutral-300">독서 기록</h2>
          <div className="flex w-full flex-col gap-2 rounded-lg bg-white p-4 text-sm font-bold">
            <div className="flex w-full justify-between">
              <span className="text-neutral-300">읽은 날짜</span>
              <span>{`${bookInfo.readDates.length}일`}</span>
            </div>
            <div className="flex w-full justify-between">
              <span className="text-neutral-300">읽은 페이지 수</span>
              <span>{bookInfo.readPages} 페이지</span>
            </div>
          </div>
          <BookRecordsByDate bookRecords={bookRecords} />
        </section>
      )}
    </main>
  );
}
