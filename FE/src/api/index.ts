import type {
  bookInfo,
  bookRecord,
  calendarBookRecord,
  dailyBookRecord,
} from "@/src/types";
import { sortBookRecordsByDate } from "@/src/utils";

export const getBookitems = async (keyword: string, page: number) => {
  const data = await fetch(`/api/searchbook?keyword=${keyword}&page=${page}`);
  const { total, bookitems } = await data.json();
  return { total, bookitems };
};

// 모든 읽고 있는 책을 불러오는 API
export const getReadingbooks = (): bookInfo[] => {
  const readingbooks = localStorage.getItem("readingbooks");
  if (!readingbooks) return [];
  return JSON.parse(readingbooks);
};

// 모든 책 기록을 불러오는 API
export const getAllBookRecords = (): bookRecord[] => {
  const bookRecords = localStorage.getItem("book-records");
  if (!bookRecords) return [];
  return JSON.parse(bookRecords);
};

// 선택한 책의 기록을 불러오는 API
export const getSelectedBookRecords = (isbn: string) => {
  const allBookRecords = getAllBookRecords();
  const selectedBookmits = allBookRecords.filter(
    (record) => record.bookInfo.isbn === isbn,
  );
  return selectedBookmits;
};

export const getMonthBookRecords = (year: number, month: number) => {
  const bookRecords = getAllBookRecords();
  const monthBookRecords = bookRecords.filter(
    ({ date }) =>
      new Date(date).getMonth() === month &&
      new Date(date).getFullYear() === year,
  );
  return monthBookRecords;
};

export const getCalendarBookRecords = (
  year: number,
  month: number,
): calendarBookRecord => {
  const monthBookRecords = getMonthBookRecords(year, month);
  const monthBookRecordsByDate = sortBookRecordsByDate(monthBookRecords);

  const weeks = [];
  let week: (null | dailyBookRecord)[] = Array.from({ length: 7 }, () => null);
  const lastDate = new Date(year, month + 1, 0).getDate();

  for (let i = 1; i <= lastDate; i++) {
    const curDate = new Date(year, month, i);
    const day = curDate.getDay();

    if (
      monthBookRecordsByDate.length &&
      monthBookRecordsByDate[0].date === curDate.toDateString()
    ) {
      const records = monthBookRecordsByDate.shift()!;
      week[day] = records;
    } else {
      week[day] = { date: curDate.toDateString(), bookRecords: [] };
    }

    if (day === 6) {
      weeks.push(week);
      week = Array.from({ length: 7 }, () => null);
    }
  }

  if (week.filter((v) => v).length) {
    weeks.push(week);
  }

  return weeks;
};

export const postBookmit = (
  title: string,
  isbn: string,
  startPage: number,
  endPage: number,
) => {
  const localBookRecords = getAllBookRecords();
  const newBookRecord = {
    _id: `${localBookRecords.length}-${Math.random()}`,
    date: new Date().toDateString(),
    bookInfo: {
      isbn,
      title,
    },
    startPage,
    endPage,
  };

  const nextLocalBookRecords = JSON.stringify([
    ...localBookRecords,
    newBookRecord,
  ]);
  localStorage.setItem("book-records", nextLocalBookRecords);
};

export const getIsTodayBookRecordExist = () => {
  const today = new Date().toDateString();
  const bookRecords = getAllBookRecords();
  const isTodayBookRecordExist = !!bookRecords.find((v) => v.date === today);

  return isTodayBookRecordExist;
};
