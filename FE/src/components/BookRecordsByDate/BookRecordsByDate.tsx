import { DAYS } from "@/src/constants";
import type { DailyBookRecord, bookRecord } from "@/src/types";

export default function DailyBookRecord({ bookRecords }: DailyBookRecord) {
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

// 날짜별로 bookRecord를 묶어주는 로직.
const sortBookRecordsByDate = (bookRecords: bookRecord[]) => {
  const result: { date: string; bookRecords: bookRecord[] }[] = [];
  bookRecords.forEach((bookRecord) => {
    const { date } = bookRecord;

    if (!result.length) {
      return result.push({
        date,
        bookRecords: [bookRecord],
      });
    }

    const last = result[result.length - 1];
    if (last.date !== date) {
      const newDate = {
        date,
        bookRecords: [bookRecord],
      };
      result.push(newDate);
      return;
    }

    last.bookRecords.push(bookRecord);
  });

  return result;
};

const getFormalizedDate = (dateStr: string) => {
  const dateInfo = new Date(dateStr);
  const year = dateInfo.getFullYear();
  const month = (dateInfo.getMonth() + 1).toString().padStart(2, "0");
  const date = dateInfo.getDate();
  const day = DAYS[dateInfo.getDay()];

  return `${year}년 ${month}월 ${date}일 (${day})`;
};
