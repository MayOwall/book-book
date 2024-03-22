"use client";
import { useEffect, useState } from "react";
import { getCalendar, getDateReadingRecords } from "@/src/api";
import { DailyReadingRecords } from "@/src/components";
import { DAYS } from "@/src/constants";

interface CalendarItem {
  date: Date;
  readingRecords: readingRecord[];
}

export default function Calendar() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const [calendar, setCalendar] = useState<CalendarItem[]>([]);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedDateReadingRecords, setSelectedDateReadingRecords] = useState<
    readingRecord[] | null
  >(null);

  const handleSelectedDate = (date: number | null) => {
    setSelectedDate((v) => {
      if (!v || v !== date) return date;
      return null;
    });
  };

  const handleSelectedDateReadingRecords = async () => {
    if (!selectedDate) {
      return;
    }
    const next = await getDateReadingRecords(year, month, selectedDate);
    setSelectedDateReadingRecords(() => next);
  };

  useEffect(() => {
    (async function () {
      const calendar = await getCalendar(year, month);
      setCalendar(() => calendar);
    })();
  }, []);

  useEffect(() => {
    setSelectedDateReadingRecords(() => []);
    handleSelectedDateReadingRecords();
  }, [selectedDate]);

  return (
    <section className="w-full">
      <h3 className="mb-2 font-bold text-neutral-300">독서 달력</h3>
      <div className="flex w-full flex-col gap-4 rounded-lg bg-white p-4">
        <div className="flex w-full justify-end">
          <button className="flex items-center gap-2 rounded border bg-white p-1 px-2 text-neutral-500">
            <span>
              {year}년 {month + 1}월
            </span>
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

        {!!calendar.length && (
          <div className="flex w-full flex-wrap gap-1.5">
            <FirstWeekEmptySpace spaceCount={calendar[0].date.getDay()} />
            {calendar.map((item, i) => (
              <CalendarItem
                key={i}
                item={item}
                selectedDate={selectedDate}
                handleSelectedDate={handleSelectedDate}
              />
            ))}
          </div>
        )}

        {!!selectedDate &&
          !!selectedDateReadingRecords &&
          (selectedDateReadingRecords.length ? (
            <DailyReadingRecords readingRecords={selectedDateReadingRecords} />
          ) : (
            <div className="flex w-full flex-col text-center text-sm text-neutral-300">
              <span>
                {year}년 {month}월 {selectedDate}일에는
              </span>
              <span>기록한 책이 없어요</span>
            </div>
          ))}
      </div>
    </section>
  );
}

function FirstWeekEmptySpace({ spaceCount }: { spaceCount: number }) {
  return Array.from({ length: spaceCount }, () => null).map((_, i) => (
    <div key={i} className="aspect-square w-[calc((100%-36px)/7)]" />
  ));
}

function CalendarItem({
  item,
  selectedDate,
  handleSelectedDate,
}: {
  item: CalendarItem;
  selectedDate: number | null;
  handleSelectedDate: (date: number | null) => void;
}) {
  const { readingRecords } = item;
  const date = item.date.getDate();
  const pageSum = !readingRecords.length
    ? 0
    : readingRecords.reduce((acc, cur) => {
        const next = acc + cur.endPage - cur.startPage;
        return next;
      }, 0);
  const bgColor = (pages: number) => {
    if (!pages) return "none";
    if (0 < pages && pages <= 10) return "little";
    if (11 < pages && pages <= 30) return "ordinary";
    if (31 < pages) return "many";
  };

  return (
    <div
      className={`relative aspect-square w-[calc((100%-36px)/7)] rounded bg-page-${bgColor(pageSum)} border ${bgColor(pageSum) === "none" ? "border" : ""} ${selectedDate && date === selectedDate ? "border-2 border-emerald-600" : ""}`}
      onClick={() => handleSelectedDate(date)}
    >
      <span className="absolute left-1 top-1 text-xs font-bold text-white">
        {date}
      </span>
    </div>
  );
}
