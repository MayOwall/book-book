import { getMindateString } from "@/src/utils";

interface BookReadingLogCard {
  type: "date" | "title";
  bookReadingLog: bookReadingLog_;
}

export default function BookReadingLogCard({
  type,
  bookReadingLog,
}: BookReadingLogCard) {
  const { bookTitle, date, startPage, endPage } = bookReadingLog;
  return (
    <div className="text-medium-regular flex h-14 w-full rounded-lg bg-white shadow">
      <div className="h-full flex-grow truncate p-4">
        {type === "date" ? getMindateString(date) : bookTitle}
      </div>
      <div className="h-full w-[120px] flex-shrink-0 border-l border-gray-100 p-4">
        p.{startPage} - {endPage}
      </div>
    </div>
  );
}
