"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { LargeButton } from "@/src/components";

export default function BookmitCreate() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [startPage, setStartPage] = useState<number | undefined>(undefined);
  const [endPage, setEndPage] = useState<number | undefined>(undefined);

  const handleStartPage = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.currentTarget.value);
    if (!value) {
      setStartPage(() => undefined);
      return;
    }
    setStartPage(() => (!isNaN(value) ? value : undefined));
  };

  const handleEndPage = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.currentTarget.value);
    if (!value) {
      setEndPage(() => undefined);
      return;
    }
    setEndPage(() => (!isNaN(value) ? value : undefined));
  };

  const onSubmit = () => {
    if (!startPage || !endPage) {
      alert("페이지를 입력해주세요");
      return;
    }

    const isbn = searchParams.get("isbn");
    const title = searchParams.get("title");
    router.push(
      `./confirm?isbn=${isbn}&title=${title}&startpage=${startPage}&endpage=${endPage}`,
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
        <LargeButton onClick={onSubmit}>페이지 입력하기</LargeButton>
        <Link href="/" className="w-full text-center">
          <button className=" text-neutral-400">입력 취소</button>
        </Link>
      </div>
    </main>
  );
}
