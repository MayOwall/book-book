import type { ReadingBookShelf, bookinfo } from "@/src/types";
import Image from "next/image";

export default function ReadingBookShelf({
  handleSelectedBook,
}: ReadingBookShelf) {
  const readingbooks = localStorage.getItem("readingbooks") || "[]";
  const bookitems = JSON.parse(readingbooks).map((book: bookinfo) => (
    <div
      key={book.isbn}
      className="relative aspect-book h-full shrink-0 overflow-auto rounded"
      onClick={() => handleSelectedBook(book)}
    >
      <Image
        src={book.image}
        alt={book.title}
        fill
        sizes="100px"
        style={{ objectFit: `contain` }}
      />
    </div>
  ));
  return (
    <div className="flex h-40 items-center gap-4 overflow-auto border border-black p-4">
      {bookitems.length ? bookitems : <EmptyBookShelf />}
    </div>
  );
}

function EmptyBookShelf() {
  return (
    <div className=" w-full text-center text-neutral-500">
      새 책을 등록해주세요
    </div>
  );
}
