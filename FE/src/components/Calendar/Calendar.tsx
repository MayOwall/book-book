"use client";
import { useEffect, useState } from "react";
import { getCalendarBookRecords } from "@/src/api";
import { Icon, BookRecordsByDate } from "@/src/components";
import { DAYS } from "@/src/constants";
import type {
  dailyBookRecord,
  calendarBookRecord,
  weeklyBookRecord,
} from "@/src/types";
import { getFormalizedDate } from "@/src/utils";

export default function Calendar() {
  const today = new Date();
  const [yearMonth, setYearMonth] = useState({
    year: today.getFullYear(),
    month: today.getMonth(),
  });
  const [selectedBookRecord, setSelectedBookRecord] =
    useState<dailyBookRecord | null>(null);
  const [calendarBookRecords, setCalendarBookRecords] =
    useState<calendarBookRecord>([]);

  const handleSelectedDate = (dailyBookRecord: dailyBookRecord) => {
    setSelectedBookRecord((v) => {
      if (!v) return dailyBookRecord;
      return v.date === dailyBookRecord.date ? null : dailyBookRecord;
    });
  };

  useEffect(() => {
    const { year, month } = yearMonth;
    const calendarBookRecords = getCalendarBookRecords(year, month);
    setCalendarBookRecords(() => calendarBookRecords);
  }, [yearMonth]);

  return (
    <section className="w-full">
      <h3 className="mb-2 font-bold text-neutral-300">독서 달력</h3>
      <div className="flex w-full flex-col gap-4 rounded-lg bg-white p-4">
        <div className="flex w-full justify-end">
          <button className="flex items-center gap-2 rounded border bg-white p-1 px-2 text-neutral-500">
            <span>
              {yearMonth.year}년 {yearMonth.month + 1}월
            </span>
            <Icon type="arrowdown" alt="달력 날짜 변경하기" size={10} />
          </button>
        </div>

        <div className="relative top-2 flex w-full">
          {DAYS.map((day) => (
            <span
              key={day}
              className="flex-1 text-center text-sm text-neutral-300"
            >
              {day}
            </span>
          ))}
        </div>

        <div className="mb-4 flex flex-col justify-evenly gap-2">
          {calendarBookRecords.map((weeklyBookRecord, i) => (
            <WeekItem
              key={`weeklyBookRecord${i}`}
              weeklyBookRecord={weeklyBookRecord}
              selectedBookRecord={selectedBookRecord}
              handleSelectedDate={handleSelectedDate}
            />
          ))}
        </div>

        {!!selectedBookRecord &&
          (selectedBookRecord.bookRecords.length ? (
            <BookRecordsByDate bookRecords={selectedBookRecord.bookRecords} />
          ) : (
            <div className="flex w-full flex-col text-center text-sm text-neutral-300">
              <span>{getFormalizedDate(selectedBookRecord.date)} 에는</span>
              <span>기록한 책이 없어요</span>
            </div>
          ))}
      </div>
    </section>
  );
}

function WeekItem({
  weeklyBookRecord,
  selectedBookRecord,
  handleSelectedDate,
}: {
  weeklyBookRecord: weeklyBookRecord;
  selectedBookRecord: dailyBookRecord | null;
  handleSelectedDate: (dailyBookRecord: dailyBookRecord) => void;
}) {
  return (
    <div className="flex w-full justify-around">
      {weeklyBookRecord.map((bookRecord, i) =>
        bookRecord ? (
          <CalendarItem
            key={bookRecord.date}
            dailyBookRecord={bookRecord}
            selectedBookRecord={selectedBookRecord}
            handleSelectedDate={handleSelectedDate}
          />
        ) : (
          <div key={`calendarItem${i}`} className="h-10 w-10 opacity-0" />
        ),
      )}
    </div>
  );
}

function CalendarItem({
  dailyBookRecord,
  selectedBookRecord,
  handleSelectedDate,
}: {
  dailyBookRecord: dailyBookRecord;
  selectedBookRecord: dailyBookRecord | null;
  handleSelectedDate: (dailyBookRecord: dailyBookRecord) => void;
}) {
  const { date, bookRecords } = dailyBookRecord;
  const pageSum = bookRecords.reduce(
    (acc, cur) => acc + cur.endPage - cur.startPage,
    0,
  );
  const bgColor = (pages: number) => {
    if (!pages) return "none";
    if (0 < pages && pages <= 10) return "little";
    if (11 < pages && pages <= 30) return "ordinary";
    if (31 < pages) return "many";
  };

  return (
    <div
      className={`h-10 w-10 rounded bg-page-${bgColor(pageSum)} border ${bgColor(pageSum) === "none" ? "border" : ""} ${selectedBookRecord && date === selectedBookRecord.date ? "border-2 border-red-500" : ""}`}
      onClick={() => handleSelectedDate(dailyBookRecord)}
    />
  );
}
