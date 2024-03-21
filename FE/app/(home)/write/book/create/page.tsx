"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { getSearchBooks } from "@/src/api";
import {
  BookSearchbar,
  BookInfoCard,
  CraeteBookModalContent,
} from "@/src/components";
import { SEARCH_BOOKITEMS_OFFSET } from "@/src/constants";
import { useModalStore } from "@/src/stores";

export default function CreateNewBook() {
  const searchPage = useRef(1);
  const searchword = useRef("");
  const [books, setBooks] = useState<book[]>([]);
  const [bottomButtonStatus, setBottomButtonStatus] = useState("nonDisplay");
  const craeteModal = useModalStore((state: any) => state.createModal);

  // 검색어가 제출되었을 때의 동작
  const onSearchbarSubmit = async (keyword: string) => {
    const { total, books } = await getSearchBooks(keyword, 1);
    searchword.current = keyword;

    if (!total) return;
    setBooks(books);
    searchPage.current = 2;
  };

  // 더보기 버튼을 클릭했을 때의 동작
  const onMoreButtonClick = async () => {
    const { total, books: nextPageBooks } = await getSearchBooks(
      searchword.current,
      searchPage.current,
    );
    const nextBooks = [...books, ...nextPageBooks];
    setBooks(() => nextBooks);

    isLastPage(total, searchPage.current)
      ? setBottomButtonStatus(() => "end")
      : (searchPage.current += 1);
  };

  // 마지막 페이지인지 판별
  const isLastPage = (total: number, current: number) => {
    return total <= current * SEARCH_BOOKITEMS_OFFSET;
  };

  return (
    <main>
      <div className="flex w-full gap-4">
        <BookSearchbar handleSubmit={onSearchbarSubmit} />
        <Link
          href="/write"
          className="flex shrink-0 items-center justify-center"
        >
          <button className="text-neutral-500">취소</button>
        </Link>
      </div>
      <section className=" my-4 flex flex-col items-center gap-2">
        {books.map((book) => (
          <BookInfoCard
            key={book.id}
            bookInfo={book.bookInfo}
            onClick={() => craeteModal(<CraeteBookModalContent book={book} />)}
          />
        ))}
        {bottomButtonStatus === "more" && (
          <button className="m-2 text-blue-500" onClick={onMoreButtonClick}>
            더 보기
          </button>
        )}
        {bottomButtonStatus === "end" && (
          <div className="end m-2">마지막 책 입니다</div>
        )}
      </section>
    </main>
  );
}
