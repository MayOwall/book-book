"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useQueries } from "@tanstack/react-query";
import BookItem from "@/src/components/atoms/BookItem";
import Loading from "@/src/components/molecules/Loading";
import IconButton from "@/src/components/atoms/IconButton";
import { getBooks } from "@/src/api";

export default function BookPage() {
  const isFirstLoading = useRef(true);
  const [status, setStatus] = useState<bookStatus_>("reading");
  const [books, setBooks] = useState<book_[]>([]);
  const { data, isSuccess } = useQueries({
    queries: [
      {
        queryKey: ["readingBooks"],
        queryFn: () => getBooks("reading"),
      },
      {
        queryKey: ["toReadBooks"],
        queryFn: () => getBooks("toRead"),
      },
      {
        queryKey: ["readBooks"],
        queryFn: () => getBooks("read"),
      },
    ],
    combine: (results) => {
      return {
        data: results.map((v) => v.data as book_[]),
        isSuccess: results.every((v) => v.isSuccess),
      };
    },
  });

  useEffect(() => {
    const [readingBooks, toReadBooks, readBooks] = data;
    if (status === "reading") setBooks(readingBooks);
    if (status === "toRead") setBooks(toReadBooks);
    if (status === "read") setBooks(readBooks);
  }, [status]);

  useEffect(() => {
    if (isFirstLoading.current && isSuccess) {
      isFirstLoading.current = false;
      setBooks(data[0]);
    }
  }, [isSuccess]);

  return (
    <div className="flex h-svh flex-col gap-4 px-4 py-6 pb-16">
      {isFirstLoading.current && <Loading />}
      <Nav status={status} setStatus={setStatus} />
      <section className="flex h-full w-full flex-wrap content-start  gap-4 rounded-lg bg-white px-4 py-6">
        {!!books &&
          !!books.length &&
          books.map((book) => (
            <Link key={book.id} href={`/book/${book.id}`} tabIndex={0}>
              <BookItem type="cover" book={book} />
            </Link>
          ))}
        {!!books && !books.length && (
          <div className="text-small-regular flex h-full w-full flex-col items-center justify-center">
            <div className="text-gray-300">
              {status === "read"
                ? "다 읽은 책"
                : status === "reading"
                  ? "읽고 있는 책"
                  : "읽고 싶은 책"}
              이 없어요.
            </div>
            <Link href={""}>
              <div className="text-[theme(colors.primary.default)] underline">
                새로운 책을 추가하러 가 볼까요?
              </div>
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}

function Nav({
  status,
  setStatus,
}: {
  status: bookStatus_;
  setStatus: (v: bookStatus_) => void;
}) {
  return (
    <nav className="flex w-full justify-between">
      <ul className="text-small-bold flex gap-6">
        <Li
          type="reading"
          status={status}
          onClick={() => setStatus("reading")}
        />
        <Li type="toRead" status={status} onClick={() => setStatus("toRead")} />
        <Li type="read" status={status} onClick={() => setStatus("read")} />
      </ul>
      <IconButton type="plus" width={24} />
    </nav>
  );
}

function Li({
  type,
  status,
  onClick,
}: {
  type: bookStatus_;
  status: bookStatus_;
  onClick: (v: bookStatus_) => void;
}) {
  return (
    <li
      className={
        status === type
          ? "text-[theme(colors.primary.default)]"
          : "text-[theme(colors.disabled.default)]"
      }
    >
      <button onClick={() => onClick(type)}>
        {type === "read" && "다 읽은 책"}
        {type === "reading" && "읽고 있는 책"}
        {type === "toRead" && "읽고 싶은 책"}
      </button>
    </li>
  );
}
