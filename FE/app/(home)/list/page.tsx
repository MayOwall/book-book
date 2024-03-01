"use client";

import { useEffect, useState } from "react";
import { getAllBookRecords } from "@/src/api";
import { BookRecordsByDate } from "@/src/components";
import type { bookRecord } from "@/src/types";

export default function ListPage() {
  const [bookRecords, setBookRecords] = useState<bookRecord[]>([]);

  useEffect(() => {
    const bookRecords = getAllBookRecords();
    setBookRecords(() => bookRecords);
  }, []);

  return (
    <main className="flex w-full flex-col gap-2">
      <h2 className="w-full px-4 font-bold text-neutral-300">독서 리스트</h2>
      <section className="flex w-full flex-col items-end rounded-2xl bg-white p-4">
        <YearMonthChangeButton />
        <BookRecordsByDate bookRecords={bookRecords} />
      </section>
    </main>
  );
}

function YearMonthChangeButton() {
  return (
    <button className="rounded border border-neutral-100 p-1 px-2 text-sm text-neutral-500">
      2024 2월
    </button>
  );
}
