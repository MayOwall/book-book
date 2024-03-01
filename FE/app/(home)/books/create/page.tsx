"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { getBookitems } from "@/src/api";
import {
  BookSearchbar,
  BookInfoCard,
  CraeteBookModalContent,
} from "@/src/components";
import { SEARCH_BOOKITEMS_OFFSET } from "@/src/constants";
import type { bookInfo, bottomButtonStatus } from "@/src/types";
import { useModalStore } from "@/src/stores";

export default function CreateNewBook() {
  const searchPage = useRef(1);
  const searchword = useRef("");
  const [bookitems, setBookitems] = useState<bookInfo[]>([]);
  const [bottomButtonStatus, setBottomButtonStatus] =
    useState<bottomButtonStatus>("nonDisplay");

  // 검색어가 제출되었을 때의 동작
  const onSearchbarSubmit = async (keyword: string) => {
    const { total, bookitems } = await getBookitems(
      keyword,
      searchPage.current,
    );

    searchword.current = keyword;
    handleBookitems(total, bookitems);
  };

  // 새로운 검색 결과를 반영
  const handleBookitems = (total: number, bookitems: bookInfo[]) => {
    if (!total) {
      setBottomButtonStatus(() => "nobooks");
      return;
    }

    searchPage.current += 1;
    setBookitems(bookitems);
    setBottomButtonStatus(() => "more");
  };

  // 더보기 버튼을 클릭했을 때의 동작
  const onMoreButtonClick = () => {
    handleNextBookitems();
  };

  // 다음 검색 결과를 반영
  const handleNextBookitems = async () => {
    if (!searchword.current) return;

    const res = await getBookitems(searchword.current, searchPage.current);
    const nextBookitems = [...bookitems, ...res.bookitems];
    setBookitems(() => nextBookitems);

    isLastPage(res.total, searchPage.current)
      ? setBottomButtonStatus(() => "end")
      : (searchPage.current += 1);
  };

  // 마지막 페이지인지 판별
  const isLastPage = (total: number, current: number) => {
    return total <= current * SEARCH_BOOKITEMS_OFFSET;
  };

  const craeteModal = useModalStore((state) => state.createModal);

  return (
    <main>
      <div className="flex w-full gap-2">
        <BookSearchbar handleSubmit={onSearchbarSubmit} />
        <Link href="/" className="flex shrink-0 items-center justify-center">
          <button className="px-3">취소</button>
        </Link>
      </div>
      <section className="my-4 flex flex-col items-center gap-2">
        {bookitems.map((item) => (
          <BookInfoCard
            key={item.isbn}
            bookinfo={item}
            onClick={() =>
              craeteModal(<CraeteBookModalContent bookinfo={item} />)
            }
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
