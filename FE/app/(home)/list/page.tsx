"use client";

import { useEffect, useState } from "react";
import { getMonthReadingRecords } from "@/src/api";
import { DailyReadingRecords } from "@/src/components";

export default function ListPage() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const [readingRecords, setReadingRecords] = useState<readingRecord[]>([]);

  useEffect(() => {
    (async function () {
      const bookRecords = await getMonthReadingRecords(year, month);
      setReadingRecords(() => bookRecords);
    })();
  }, []);

  return (
    <main className="flex w-full flex-col gap-2">
      <h2 className="w-full px-4 font-bold text-neutral-300">독서 리스트</h2>
      <section className="flex w-full flex-col items-end rounded-2xl bg-white p-4">
        <YearMonthChangeButton year={year} month={month} />
        <DailyReadingRecords readingRecords={readingRecords} />
      </section>
    </main>
  );
}

function YearMonthChangeButton({ year, month }: { [key: string]: number }) {
  return (
    <button className="rounded border border-neutral-100 p-1 px-2 text-sm text-neutral-500">
      {year} {month + 1}월
    </button>
  );
}
