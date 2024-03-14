import Image from "next/image";
import type { ReadingBookShelf } from "@/src/types";

export default function ReadingBookShelf({
  readingbooks,
  selectedBook,
  onClick,
}: ReadingBookShelf) {
  return (
    <div className="flex h-40 w-full gap-4 overflow-auto rounded-lg bg-white p-4">
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
          className={`relative aspect-book h-full shrink-0 overflow-auto rounded border border-neutral-200 ${selectedBook ? (selectedBook.isbn !== book.isbn ? "opacity-50" : "outline outline-2 outline-emerald-400") : ""}`}
          onClick={() => onClick(book)}
        >
          <Image
            src={book.image}
            alt={book.title}
            fill
            sizes="100px"
            style={{ objectFit: "fill" }}
            priority
          />
        </div>
      ))}
    </>
  );
}

function EmptyBookShelf() {
  return (
    <div className=" m-auto text-neutral-300">새로운 책을 등록해주세요</div>
  );
}
