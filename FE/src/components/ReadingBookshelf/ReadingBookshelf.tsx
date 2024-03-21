import Image from "next/image";

export default function ReadingBookShelf({
  readingBooks,
  selectedBook,
  onClick,
}: ReadingBookShelf) {
  return (
    <div className="flex h-40 w-full shrink-0 gap-4 overflow-auto rounded-lg bg-white p-4">
      {readingBooks && readingBooks.length ? (
        <ReadingBookItems
          readingBooks={readingBooks}
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
  readingBooks,
  selectedBook,
  onClick,
}: ReadingBookShelf) {
  return (
    <>
      {readingBooks.map((book) => (
        <div
          key={book.id}
          className={`relative aspect-book h-full shrink-0 overflow-auto rounded border border-neutral-200 ${selectedBook ? (selectedBook.id !== book.id ? "opacity-50" : "outline outline-2 outline-emerald-400") : ""}`}
          onClick={() => onClick(book)}
        >
          <Image
            src={book.bookInfo.imageURL}
            alt={book.bookInfo.title}
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
