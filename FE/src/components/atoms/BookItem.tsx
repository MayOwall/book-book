import Image from "next/image";
import { getMindateString } from "@/src/utils";

interface BookItem {
  type?: "cover" | "card" | "modal";
  book: book_;
}

export default function BookItem({ type = "cover", book }: BookItem) {
  switch (type) {
    case "card":
      return <Cover book={book} />;
    default:
      return <Cover book={book} />;
  }
}

function Cover({ book }: BookItem) {
  return (
    <div className="flex w-24 flex-col gap-2">
      <Image
        src={book.cover}
        alt={book.title}
        width={96}
        height={132}
        className="shadow-lg"
        style={{ objectFit: "cover", height: 132 }}
      />
      <div className="flex flex-col gap-1">
        <h3 className="text-small-bold truncate">{book.title}</h3>
        {book.status !== "toRead" && (
          <div className="text-xsmall-regular text-gray-300">
            {getMindateString(book.startDate)} ~
            {book.status === "read"
              ? `\n${getMindateString(book.endDate)}`
              : ""}
          </div>
        )}
      </div>
    </div>
  );
}
