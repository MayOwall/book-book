"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { LargeButton, BookInfoCard } from "@/src/components";
import { postBookmit } from "@/src/api";

export default function BookmitCreate() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const title = searchParams.get("title")!;
  const isbn = searchParams.get("isbn")!;
  const startPage = Number(searchParams.get("startpage")!);
  const endPage = Number(searchParams.get("endpage")!);

  const onSubmit = () => {
    postBookmit(title, isbn, startPage, endPage);
    router.push("/");
  };

  return (
    <main className="relative  flex h-full flex-col gap-4 py-16">
      <h1 className="mb-4 text-2xl font-bold">이 기록을 등록할까요?</h1>
      <div className="flex w-full justify-between">
        <span className="text-sm text-neutral-400">책 제목</span>
        <span className="text-sm font-bold">{searchParams.get("title")}</span>
      </div>
      <div className="flex w-full justify-between">
        <span className="text-sm text-neutral-400">시작 페이지</span>
        <span className="text-sm font-bold">
          {searchParams.get("startpage")}
        </span>
      </div>
      <div className="flex w-full justify-between">
        <span className="text-sm text-neutral-400">마지막 페이지</span>
        <span className="text-sm font-bold">{searchParams.get("endpage")}</span>
      </div>

      <div className="absolute bottom-28 flex w-full flex-col justify-center gap-4">
        <LargeButton onClick={onSubmit}>북밋 생성하기</LargeButton>
        <Link href="/" className="w-full text-center">
          <button className=" text-neutral-400">생성 취소</button>
        </Link>
      </div>
    </main>
  );
}
