"use client";

import { useEffect, useState } from "react";
import { getAllBookmits } from "@/src/api";
import { BookmitsByDate } from "@/src/components";
import type { BookmitsByDate as bookmitsByDate } from "@/src/types";

export default function ListPage() {
  const [bookmits, setBookmits] = useState<bookmitsByDate[]>([]);

  useEffect(() => {
    const bookmits = getAllBookmits();
    setBookmits(() => bookmits);
  }, []);

  return (
    <main className="flex w-full flex-col gap-2">
      <h2 className="w-full px-4 font-bold text-neutral-300">독서 리스트</h2>
      <section className="flex w-full flex-col items-end rounded-2xl bg-white p-4">
        <YearMonthChangeButton />
        <BookmitList bookmits={bookmits} />
      </section>
    </main>
  );
}

function BookmitList({ bookmits }: { bookmits: bookmitsByDate[] }) {
  return (
    <>
      {!!bookmits.length &&
        bookmits.map((bookmitsByDate: bookmitsByDate) => (
          <BookmitsByDate key={bookmitsByDate.date} {...bookmitsByDate} />
        ))}
    </>
  );
}

function YearMonthChangeButton() {
  return (
    <button className="rounded border border-neutral-100 p-1 px-2 text-sm text-neutral-500">
      2024 2월
    </button>
  );
}
