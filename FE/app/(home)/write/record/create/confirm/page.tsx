"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/src/components";
import { postBookmit } from "@/src/api";

export default function BookmitCreate() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const title = searchParams.get("title")!;
  const isbn = searchParams.get("isbn")!;
  const startPage = Number(searchParams.get("startPage")!);
  const endPage = Number(searchParams.get("endPage")!);

  const onSubmit = () => {
    postBookmit(title, isbn, startPage, endPage);
    router.push("/write");
  };

  return (
    <main className="relative  flex h-full flex-col gap-4 py-16">
      <h1 className="mb-4 text-2xl font-bold">이 독서 내용을 기록할까요?</h1>
      <div className="flex w-full flex-col gap-4 rounded-lg bg-white p-4">
        <div className="flex w-full justify-between font-bold">
          <span className="flex-1 text-neutral-300">책 제목</span>
          <span className="flex-1 truncate text-right font-bold">{title}</span>
        </div>
        <div className="flex w-full justify-between font-bold">
          <span className="flex-1 text-neutral-300">시작 페이지</span>
          <span className=" flex-1font-bold text-right">p.{startPage}</span>
        </div>
        <div className="flex w-full justify-between font-bold">
          <span className="flex-1 text-neutral-300">마지막 페이지</span>
          <span className="flex-1 text-right font-bold">p.{endPage}</span>
        </div>
        <div className="flex w-full justify-between font-bold">
          <span className="flex-1 text-neutral-300">총 읽은 페이지 수</span>
          <span className="flex-1 text-right font-bold">
            {endPage - startPage + 1}
          </span>
        </div>
      </div>

      <div className="absolute bottom-28 flex w-full flex-col justify-center gap-4">
        <Button onClick={onSubmit}>네, 이 독서 내용을 기록할게요</Button>
        <Link href="/write" className="w-full text-center">
          <button className=" text-neutral-300">기록 취소</button>
        </Link>
      </div>
    </main>
  );
}
