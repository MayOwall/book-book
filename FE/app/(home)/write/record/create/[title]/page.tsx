"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { Button } from "@/src/components";
import { bookInfo } from "@/src/types";

export default function CreateRecord() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { title, isbn }: bookInfo = JSON.parse(searchParams.get("bookInfo")!);
  const [startPage, setStartPage] = useState<number | undefined>(undefined);
  const [endPage, setEndPage] = useState<number | undefined>(undefined);

  // 시작 페이지의 값을 다루는 로직
  const handleStartPage = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.currentTarget.value);
    if (!value) {
      setStartPage(() => undefined);
      return;
    }
    setStartPage(() => (!isNaN(value) ? value : undefined));
  };

  // 마지막 페이지의 값을 다루는 로직
  const handleEndPage = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.currentTarget.value);
    if (!value) {
      setEndPage(() => undefined);
      return;
    }
    setEndPage(() => (!isNaN(value) ? value : undefined));
  };

  // 제출시의 로직
  const onSubmit = () => {
    if (!startPage || !endPage) {
      alert("페이지를 입력해주세요");
      return;
    }

    router.push(
      `/write/record/create/confirm?title=${title}&isbn=${isbn}&startPage=${startPage}&endPage=${endPage}`,
    );
  };

  return (
    <main className="relative  flex h-full flex-col gap-4 py-16">
      <h1 className="mb-4 text-2xl font-bold">페이지 정보를 입력해주세요</h1>
      <input
        className="w-3/4 outline-none"
        type="number"
        value={startPage}
        onChange={handleStartPage}
        placeholder="시작 페이지를 입력해주세요"
      />
      <input
        className="w-3/4 outline-none"
        type="number"
        value={endPage}
        onChange={handleEndPage}
        placeholder="마지막 페이지를 입력해주세요"
      />
      <div className="absolute bottom-28 flex w-full flex-col justify-center gap-4">
        <Button onClick={onSubmit}>페이지 입력하기</Button>
        <Link href="/write" className="w-full text-center">
          <button className=" text-neutral-400">입력 취소</button>
        </Link>
      </div>
    </main>
  );
}
