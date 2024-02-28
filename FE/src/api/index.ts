import type { bookInfo, bookRecord } from "@/src/types";

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
