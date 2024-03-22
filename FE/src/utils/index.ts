import { DAYS } from "@/src/constants";

// 날짜별로 bookRecord를 묶어주는 로직.
export const sortBookRecordsByDate = (readingRecords: readingRecord[]) => {
  const result: { date: Date; readingRecords: readingRecord[] }[] = [];
  readingRecords.forEach((readingRecord) => {
    const { date } = readingRecord;
    if (!result.length) {
      return result.push(getNewDate(date, readingRecord));
    }

    const last = result[result.length - 1];
    if (!isSameDate(last.date, date)) {
      return result.push(getNewDate(date, readingRecord));
    }

    last.readingRecords.push(readingRecord);
  });

  return result;

  function getNewDate(date: Date, readingRecord: readingRecord) {
    const newDate = {
      date: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
      readingRecords: [readingRecord],
    };
    return newDate;
  }
};

// 0000년 00월 00일 (요일) 형식의 날짜 문자열을 리턴하는 로직
export const getFormalizedDate = (date: Date) => {
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 (${DAYS[date.getDay()]})`;
};

export const isSameDate = (a: Date, b: Date) => {
  const year1 = a.getFullYear();
  const year2 = b.getFullYear();
  if (year1 !== year2) return false;

  const month1 = a.getMonth();
  const month2 = b.getMonth();
  if (month1 !== month2) return false;

  const date1 = a.getDate();
  const date2 = b.getDate();
  if (date1 !== date2) return false;

  return true;
};
