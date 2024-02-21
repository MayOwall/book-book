"use client";

import { useState } from "react";
import { BookSearchbar } from "@/src/components";
import type { bookinfo } from "@/src/types";
import Link from "next/link";

export default function CreateNewBook() {
  const [bookitems, setBookitems] = useState<bookinfo[]>([]);

  const onSearchbarSubmit = (bookitems: bookinfo[]) => {
    setBookitems(() => bookitems);
  };

  return (
    <main>
      <div className="flex w-full gap-2 border">
        <BookSearchbar handleBookitems={onSearchbarSubmit} />
        <Link href="/">
          <button className="shrink-0 border px-3">취소</button>
        </Link>
      </div>
      {JSON.stringify(bookitems)}
    </main>
  );
}
