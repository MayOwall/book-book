"use client";

import { useState } from "react";
import Image from "next/image";
import Button from "@/src/components/atoms/Button";
import IconButton from "@/src/components/atoms/IconButton";
import { getMindateString } from "@/src/utils";

const bookInit = Object.freeze({
  id: "1",
  title: "UX 디자인의 모든 것",
  author: "한상훈",
  publisher: "치즈덕 주식회사",
  cover: "https://image.yes24.com/goods/101334074/XL",
  status: "toRead",
  startDate: "2024.04.04",
  endDate: "2024.04.14",
});

export default function BookDetail() {
  const [book, setBook] = useState<book_>(bookInit);
  return (
    <div className="flex h-svh w-full flex-col items-center gap-8 border px-4 py-6 pb-16">
      <header className="flex w-full items-center justify-between">
        <IconButton type="back" width={32} />
        <Button status="danger" size="tiny">
          이 책 삭제하기
        </Button>
      </header>
      <BookInfo book={book} />
    </div>
  );
}

function BookInfo({ book }: { book: book_ }) {
  return (
    <>
      <div className="relative h-48 w-36 shadow">
        <Image
          fill
          src={book.cover}
          alt={book.title + " 표지"}
          style={{ objectFit: "cover" }}
        />
      </div>
      <div>
        <div className="text-large-bold mb-2">{book.title}</div>
        <div className="text-medium-regular text-gray-500">
          {book.author} | {book.publisher}
        </div>
      </div>
      <div className="flex w-full flex-col items-end gap-2">
        {book.status === "toRead" && (
          <Button size="tiny">이 책을 읽기 시작할래요</Button>
        )}
        {book.status === "reading" && (
          <Button size="tiny">이 책을 다 읽었어요</Button>
        )}
        {book.status === "read" && (
          <Button size="tiny">이 책을 다시 읽을래요</Button>
        )}
        <div className="text-small-bold flex w-full flex-col gap-4 rounded-lg bg-white p-4 shadow">
          <div className="flex justify-between">
            <span className="text-gray-500">독서 상태</span>
            <span>
              {book.status === "read"
                ? "다 읽음"
                : book.status === "reading"
                  ? "읽고 있는 중"
                  : "읽을 예정"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">읽기 시작한 날짜</span>
            <span>
              {book.startDate ? getMindateString(book.startDate) : "-"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">다 읽은 날짜</span>
            <span>{book.endDate ? getMindateString(book.endDate) : "-"}</span>
          </div>
        </div>
      </div>
    </>
  );
}
