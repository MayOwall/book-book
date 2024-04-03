"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, BookInfoCard } from "@/src/components";
import { putBook } from "@/src/api";
import { useQueryClient } from "@tanstack/react-query";

export default function CreateRecord() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const book: book = JSON.parse(searchParams.get("book")!);
  const queryClient = useQueryClient();

  const onSubmit = () => {
    putBook(book.id, { isFinished: true });
    queryClient.invalidateQueries({ queryKey: ["readingbooks"] });
    router.push("/write");
  };

  return (
    <main className="relative flex h-full flex-col gap-8 pt-4">
      <div>
        <h1 className="mb-4 text-2xl font-bold">
          이 책을 다 읽은 책으로 저장할까요?
        </h1>
        <p className="text-neutral-300">다 읽은 책은 책 보관소에 보관돼요.</p>
      </div>
      <BookInfoCard bookInfo={book.bookInfo} type="large" />
      <div className="absolute bottom-4 flex w-full flex-col justify-center gap-4">
        <Button onClick={onSubmit}>네, 다 읽은 책으로 저장할게요</Button>
        <Link href="/write" className="w-full text-center">
          <button className=" text-neutral-300">저장 취소</button>
        </Link>
      </div>
    </main>
  );
}
