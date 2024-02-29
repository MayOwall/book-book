import type { bookRecord } from "@/src/types";
import { DAYS } from "@/src/constants";

// 날짜별로 bookRecord를 묶어주는 로직.
export const sortBookRecordsByDate = (bookRecords: bookRecord[]) => {
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

// 0000년 00월 00일 (요일) 형식의 날짜 문자열을 리턴하는 로직
export const getFormalizedDate = (dateStr: string) => {
  const dateInfo = new Date(dateStr);
  const year = dateInfo.getFullYear();
  const month = (dateInfo.getMonth() + 1).toString().padStart(2, "0");
  const date = dateInfo.getDate();
  const day = DAYS[dateInfo.getDay()];

  return `${year}년 ${month}월 ${date}일 (${day})`;
};
