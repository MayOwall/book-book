"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getFinishedBookInfos } from "@/src/api";
import { bookInfo } from "@/src/types";

export default function BookStorage() {
  const [finishedBookInfos, setFinishedBookInfos] = useState<bookInfo[]>([]);

  useEffect(() => {
    setFinishedBookInfos(() => getFinishedBookInfos());
  }, []);

  return (
    <main>
      <h1 className="mb-2 font-bold text-neutral-300">책 보관소</h1>
      <section className="flex max-h-full w-full flex-wrap gap-4 overflow-auto rounded-xl bg-white p-4">
        {finishedBookInfos.map((bookInfo) => (
          <FinishedBook key={bookInfo.isbn} bookInfo={bookInfo} />
        ))}
      </section>
    </main>
  );
}

function FinishedBook({ bookInfo }: { bookInfo: bookInfo }) {
  return (
    <div className="relative aspect-book w-[calc((100%-2rem)/3)] rounded border">
      <Link href={`/book-storage/${bookInfo.title}?isbn=${bookInfo.isbn}`}>
        <Image src={bookInfo.image} alt={bookInfo.title} fill />
      </Link>
    </div>
  );
}
