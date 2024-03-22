"use client";

import { useState } from "react";

export default function BookSearchbar({
  handleSubmit,
}: {
  handleSubmit: (keyword: string) => void;
}) {
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
        className="size-1 h-10 w-full rounded border border-neutral-300 px-2 outline-emerald-400"
        placeholder="검색할 책을 입력해주세요"
        value={keyword}
        onChange={onChange}
      />
    </form>
  );
}
