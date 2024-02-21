"use client";

import { useState } from "react";
import type { BookSearchbar } from "@/src/types";

export default function BookSearchbar({ handleBookitems }: BookSearchbar) {
  const [keyword, setKeyword] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setKeyword(() => value);
  };

  const onSearchbarSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = await fetch(`/api/searchbook?keyword=${keyword}`);
    const { bookitems } = await data.json();
    handleBookitems(bookitems);
  };

  return (
    <form className="w-full" onSubmit={onSearchbarSubmit}>
      <input
        className="size-1 h-10 w-full rounded border px-2 outline-none"
        placeholder="검색할 책을 입력해주세요"
        value={keyword}
        onChange={onChange}
      />
    </form>
  );
}
