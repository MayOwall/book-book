import Image from "next/image";
import type { ReadingBookShelf } from "@/src/types";

export default function ReadingBookShelf({
  readingbooks,
  selectedBook,
  onClick,
}: ReadingBookShelf) {
  return (
    <div className="flex h-40 items-center gap-4 overflow-auto border border-black p-4">
      {readingbooks && readingbooks.length ? (
        <ReadingBookItems
          readingbooks={readingbooks}
          selectedBook={selectedBook}
          onClick={onClick}
        />
      ) : (
        <EmptyBookShelf />
      )}
    </div>
  );
}

function ReadingBookItems({
  readingbooks,
  selectedBook,
  onClick,
}: ReadingBookShelf) {
  return (
    <>
      {readingbooks.map((book) => (
        <div
          key={book.isbn}
          className={`relative aspect-book h-full shrink-0 overflow-auto rounded ${selectedBook && selectedBook.isbn !== book.isbn ? "opacity-50" : ""}`}
          onClick={() => onClick(book)}
        >
          <Image
            src={book.image}
            alt={book.title}
            fill
            sizes="100px"
            style={{ objectFit: "contain" }}
            priority
          />
        </div>
      ))}
    </>
  );
}

function EmptyBookShelf() {
  return (
    <div className=" w-full text-center text-neutral-500">
      새 책을 등록해주세요
    </div>
  );
}
