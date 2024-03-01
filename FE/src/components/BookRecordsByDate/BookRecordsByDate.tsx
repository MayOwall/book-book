import type { bookRecord } from "@/src/types";
import { sortBookRecordsByDate, getFormalizedDate } from "@/src/utils";

export default function DailyBookRecord({
  bookRecords,
}: {
  bookRecords: bookRecord[];
}) {
  const bookRecordsByDate = sortBookRecordsByDate(bookRecords);

  return (
    <div className="flex w-full flex-col-reverse gap-4 text-neutral-800">
      {bookRecordsByDate.map(({ date, bookRecords }) => (
        <div key={date} className="flex flex-col gap-2">
          <span className="font-bold">{getFormalizedDate(date)}</span>
          <ul className="flex flex-col-reverse gap-2">
            {bookRecords.map((bookRecord) => (
              <BookRecordItem key={bookRecord._id} bookRecord={bookRecord} />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

// 책 기록 아이템 컴포넌트
function BookRecordItem({ bookRecord }: { bookRecord: bookRecord }) {
  const { _id, bookInfo, startPage, endPage } = bookRecord;
  return (
    <li
      key={_id}
      className="rounded border border-neutral-100 bg-white p-2 py-3"
    >
      <div>{bookInfo.title}</div>
      <div className="text-neutral-500">
        p.{startPage}-{endPage}
      </div>
    </li>
  );
}
