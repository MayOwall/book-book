"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import Button from "@/src/components/atoms/Button";
import IconButton from "@/src/components/atoms/IconButton";
import BookReadingLogCard from "@/src/components/molecules/BookLogCard";
import { getMindateString } from "@/src/utils";
import BookMemoCard from "@/src/components/molecules/BookMemoCard";
import Loading from "@/src/components/molecules/Loading";
import Modal from "@/src/components/molecules/Modal";
import FloatingButton from "@/src/components/molecules/FloatingButton";
import {
  deleteBook,
  getBook,
  getBookMemos,
  getBookReadingLogs,
  putBook,
} from "@/src/api";

export default function BookDetail() {
  const [modal, setModal] = useState(false);
  const router = useRouter();
  const pathname = usePathname().match(/[^\/]*1$/);
  if (!pathname) {
    router.push("/book");
  }

  const bookId = pathname![0];
  const {
    isSuccess,
    refetch,
    data: book,
  } = useQuery({
    queryKey: ["book", bookId],
    queryFn: () => getBook(bookId),
  });

  const onDeleteBtnClick = () => {
    deleteBook(bookId);
    router.push("/book");
  };

  const onCancelBtnClick = () => {
    setModal(false);
  };

  const handleBookStatus = async (status: "start" | "finish" | "again") => {
    let body = {};
    if (status === "start") {
      body = {
        startDate: new Date().toDateString(),
        status: "reading",
      };
    }
    if (status === "finish") {
      body = {
        status: "read",
        endDate: new Date().toDateString(),
      };
    }
    if (status === "again") {
      body = {
        status: "reading",
        endDate: null,
      };
    }

    await putBook(bookId, body);
    await refetch();
  };

  const modalProps = Object.freeze({
    type: "danger",
    title: "정말 이 책를 삭제할까요?",
    subTitle: "한번 삭제하면 되돌릴 수 없어요.",
    onAction: onDeleteBtnClick,
    onCancel: onCancelBtnClick,
    actionContent: "네, 삭제할게요",
    cancelContent: "삭제 취소",
  });

  return (
    <div className="flex min-h-svh w-full flex-col items-center gap-8 px-4 py-6 pb-20">
      {!isSuccess && <Loading />}
      {isSuccess && book && (
        <>
          <header className="flex w-full items-center justify-between">
            <IconButton type="back" width={32} onClick={() => router.back()} />
            <Button status="danger" size="tiny" onClick={() => setModal(true)}>
              이 책 삭제하기
            </Button>
          </header>
          <BookInfo book={book} handleBookStatus={handleBookStatus} />
          <BookLogList bookId={book.id} />
          <FloatingButton />
        </>
      )}
      {modal && <Modal {...modalProps} />}
    </div>
  );
}

function BookInfo({
  book,
  handleBookStatus,
}: {
  book: book_;
  handleBookStatus: (v: "start" | "finish" | "again") => void;
}) {
  return (
    <>
      <div className="relative h-48 w-36 flex-shrink-0 shadow">
        <Image
          fill
          src={book.cover}
          alt={book.title + " 표지"}
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="flex-shrink-0">
        <div className="text-large-bold mb-2">{book.title}</div>
        <div className="text-medium-regular text-gray-500">
          {book.author} | {book.publisher}
        </div>
      </div>
      <div className="flex w-full flex-shrink-0 flex-col items-end gap-2">
        {book.status === "toRead" && (
          <Button size="tiny" onClick={() => handleBookStatus("start")}>
            이 책을 읽기 시작할래요
          </Button>
        )}
        {book.status === "reading" && (
          <Button size="tiny" onClick={() => handleBookStatus("finish")}>
            이 책을 다 읽었어요
          </Button>
        )}
        {book.status === "read" && (
          <Button size="tiny" onClick={() => handleBookStatus("again")}>
            이 책을 다시 읽을래요
          </Button>
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

function BookLogList({ bookId }: { bookId: string }) {
  const [status, setStatus] = useState<"bookReadingLog" | "bookMemo">(
    "bookReadingLog",
  );

  const { isSuccess: isBookReadingLogsSuccess, data: bookReadingLogs } =
    useQuery({
      queryKey: ["book-reading-logs", bookId],
      queryFn: () => getBookReadingLogs({ bookId }),
    });

  const { isSuccess: isBookMemosSuccess, data: bookMemos } = useQuery({
    queryKey: ["book-memos-logs", bookId],
    queryFn: () => getBookMemos({ bookId }),
  });

  return (
    <section className="w-full">
      <header className="mb-4 w-full">
        <ul className="text-medium-bold flex gap-6">
          <li>
            <button
              className={`${status === "bookReadingLog" ? "text-[theme(colors.primary.default)]" : "text-gray-300"}`}
              onClick={() => setStatus("bookReadingLog")}
            >
              이 책의 독서 기록
            </button>
          </li>
          <li>
            <button
              className={`${status === "bookMemo" ? "text-[theme(colors.primary.default)]" : "text-gray-300"}`}
              onClick={() => setStatus("bookMemo")}
            >
              이 책의 메모
            </button>
          </li>
        </ul>
      </header>
      <div className="flex flex-col gap-2">
        {status === "bookReadingLog" && isBookReadingLogsSuccess && (
          <>
            {bookReadingLogs.map((v: bookReadingLog_) => (
              <BookReadingLogCard key={v.id} bookReadingLog={v} type="date" />
            ))}
            {!bookReadingLogs.length && (
              <div className="text-small-regular text-center text-gray-300">
                이 책의 독서 기록이 없어요. <br />
                새로운 독서 기록을 작성해 보세요!
              </div>
            )}
          </>
        )}
        {status === "bookMemo" && isBookMemosSuccess && (
          <>
            {bookMemos.map((v: bookMemo_) => (
              <BookMemoCard
                key={v.id}
                bookMemo={v}
                type="default"
                removable
                onDelete={(id) => console.log("remove memo id : ", id)}
              />
            ))}
            {!bookMemos.length && (
              <div className="text-small-regular text-center text-gray-300">
                이 책의 메모가 없어요.
                <br />
                새로운 메모을 작성해 보세요!
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
