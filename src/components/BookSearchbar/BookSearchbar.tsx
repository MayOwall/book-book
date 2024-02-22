"use client";

import type { BookSearchbar } from "@/src/types";
import { useState } from "react";

export default function BookSearchbar({ handleSubmit }: BookSearchbar) {
  const [keyword, setKeyword] = useState("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setKeyword(() => value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(keyword);
  };

  return (
    <form className="w-full" onSubmit={onSubmit}>
      <input
        className="size-1 h-10 w-full rounded border px-2 outline-none"
        placeholder="검색할 책을 입력해주세요"
        value={keyword}
        onChange={onChange}
      />
    </form>
  );
}
