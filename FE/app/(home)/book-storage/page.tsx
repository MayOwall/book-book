"use client";

import Image from "next/image";
import Link from "next/link";
import { getFinishedBooks } from "@/src/api";
import { useQuery } from "@tanstack/react-query";

export default function BookStorage() {
  const { data: finishedBooks } = useQuery({
    queryKey: ["finishedBooks"],
    queryFn: getFinishedBooks,
    staleTime: Infinity,
  });

  return (
    <main>
      <h1 className="mb-2 font-bold text-neutral-300">책 보관소</h1>
      <section className="flex max-h-full w-full flex-wrap gap-4 overflow-auto rounded-xl bg-white p-4">
        {!!finishedBooks &&
          finishedBooks.map((book) => (
            <FinishedBook key={book.id} id={book.id} bookInfo={book.bookInfo} />
          ))}
        {!finishedBooks ||
          (!finishedBooks?.length && (
            <span className="w-full text-center text-sm leading-relaxed text-neutral-300">
              다 읽은 책이 없어요
              <br />
              <Link href="/write" className="text-emerald-400 underline">
                책을 읽으러 가 볼까요?
              </Link>
            </span>
          ))}
      </section>
    </main>
  );
}

function FinishedBook({ id, bookInfo }: { id: string; bookInfo: bookInfo }) {
  return (
    <div className="relative aspect-book w-[calc((100%-2rem)/3)] rounded border">
      <Link href={`/book-storage/${bookInfo.title}?id=${id}`}>
        <Image src={bookInfo.imageURL} alt={bookInfo.title} fill />
      </Link>
    </div>
  );
}
