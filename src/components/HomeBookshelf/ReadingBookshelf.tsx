import type { ReadingBookShelf } from "@/src/types";

export default function ReadingBookShelf({ books }: ReadingBookShelf) {
  return (
    <div className="flex min-h-40 items-center gap-4 overflow-auto border border-black">
      {books || <EmptyBookShelf />}
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
