import type {
  bookInfo,
  bookRecord,
  calendarBookRecord,
  dailyBookRecord,
} from "@/src/types";
import { sortBookRecordsByDate } from "@/src/utils";

const LOCAL_BOOK_INFOS_KEY = "book-infos";
const LOCAL_BOOK_RECORDS_KEY = "book-records";

export const getBookitems = async (keyword: string, page: number) => {
  const data = await fetch(`/api/searchbook?keyword=${keyword}&page=${page}`);
  const { total, bookitems } = await data.json();
  return { total, bookitems };
};

export const getBookInfo = (isbn: string) => {
  const bookInfo = getAllBookInfos().find((v) => v.isbn === isbn);
  return bookInfo || null;
};

export const getAllBookInfos = (): bookInfo[] => {
  const bookInfos = localStorage.getItem(LOCAL_BOOK_INFOS_KEY);
  if (!bookInfos) return [];
  return JSON.parse(bookInfos);
};

// 모든 읽고 있는 책을 불러오는 API
export const getReadingbookInfos = (): bookInfo[] => {
  const readingbooks = getAllBookInfos().filter((v) => !v.finishedDate);
  return readingbooks;
};

export const getFinishedBookInfos = (): bookInfo[] => {
  const finishedBookInfos = getAllBookInfos().filter((v) => v.finishedDate);
  return finishedBookInfos;
};

export const postBookInfo = async (bookinfo: bookInfo) => {
  try {
    const data = await fetch("/api/books/create", {
      method: "POST",
      body: JSON.stringify(bookinfo),
      headers: {
        "content-type": "application/json",
      },
    });
    const { status } = await data.json();
    if (status !== "success") throw new Error();
  } catch (e) {
    console.log(e);
  }

  const localReadingBooks = localStorage.getItem(LOCAL_BOOK_INFOS_KEY);
  const readingBooks = localReadingBooks ? JSON.parse(localReadingBooks) : [];
  const nextReadingBooks = [...readingBooks, bookinfo];

  localStorage.setItem(LOCAL_BOOK_INFOS_KEY, JSON.stringify(nextReadingBooks));
};

export const putBookInfo = (
  isbn: string,
  startPage: number,
  endPage: number,
) => {
  const bookInfos = getAllBookInfos();
  const nextBookInfos = bookInfos.map((bookInfo) => {
    if (bookInfo.isbn === isbn) {
      const pages = endPage - startPage + 1;
      const today = new Date().toDateString();
      const lastDate = bookInfo.readDates[bookInfo.readDates.length - 1];
      const nextReadDates =
        today === lastDate
          ? bookInfo.readDates
          : [...bookInfo.readDates, today];

      bookInfo = {
        ...bookInfo,
        readPages: bookInfo.readPages + pages,
        readDates: nextReadDates,
      };
    }

    return bookInfo;
  });

  localStorage.setItem(LOCAL_BOOK_INFOS_KEY, JSON.stringify(nextBookInfos));
};

export const putFinishedBookInfo = (isbn: string) => {
  const bookInfos = getAllBookInfos();
  const nextBookInfos = bookInfos.map((bookInfo) => {
    if (bookInfo.isbn === isbn) {
      bookInfo = {
        ...bookInfo,
        finishedDate: new Date().toDateString(),
      };
    }

    return bookInfo;
  });

  localStorage.setItem(LOCAL_BOOK_INFOS_KEY, JSON.stringify(nextBookInfos));
};

export const putReStartBookInfo = (isbn: string) => {
  const bookInfos = getAllBookInfos();
  const nextBookInfos = bookInfos.map((bookInfo) => {
    if (bookInfo.isbn === isbn) {
      bookInfo = {
        ...bookInfo,
        finishedDate: null,
      };
    }

    return bookInfo;
  });

  localStorage.setItem(LOCAL_BOOK_INFOS_KEY, JSON.stringify(nextBookInfos));
};

// 모든 책 기록을 불러오는 API
export const getAllBookRecords = (): bookRecord[] => {
  const bookRecords = localStorage.getItem(LOCAL_BOOK_RECORDS_KEY);
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
  localStorage.setItem(LOCAL_BOOK_RECORDS_KEY, nextLocalBookRecords);
};

export const getIsTodayBookRecordExist = () => {
  const today = new Date().toDateString();
  const bookRecords = getAllBookRecords();
  const isTodayBookRecordExist = !!bookRecords.find((v) => v.date === today);

  return isTodayBookRecordExist;
};
