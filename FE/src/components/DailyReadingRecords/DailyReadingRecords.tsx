import { sortBookRecordsByDate, getFormalizedDate } from "@/src/utils";

export default function DailyReadingRecords({
  readingRecords,
}: DailyReadingRecords) {
  const dailyReadingRecords = sortBookRecordsByDate(readingRecords);

  return (
    <div className="flex w-full flex-col-reverse gap-4 text-neutral-800">
      {dailyReadingRecords.map(({ date, readingRecords }) => (
        <div key={date.getDate()} className="flex flex-col gap-2">
          <span className="font-bold">{getFormalizedDate(date)}</span>
          <ul className="flex flex-col-reverse gap-2">
            {readingRecords.map((readingRecord) => (
              <BookRecordItem
                key={readingRecord.id}
                readingRecord={readingRecord}
              />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

// 책 기록 아이템 컴포넌트
function BookRecordItem({ readingRecord }: { readingRecord: readingRecord }) {
  const { id, title, startPage, endPage } = readingRecord;
  return (
    <li
      key={id}
      className="rounded border border-neutral-100 bg-white p-2 py-3"
    >
      <div>{title}</div>
      <div className="text-neutral-500">
        p.{startPage}-{endPage}
      </div>
    </li>
  );
}
