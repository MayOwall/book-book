import { BookmitsByDate } from "../types";

export const getBookitems = async (keyword: string, page: number) => {
  const data = await fetch(`/api/searchbook?keyword=${keyword}&page=${page}`);
  const { total, bookitems } = await data.json();
  return { total, bookitems };
};

export const getReadingbooks = () => {
  const localReadingbooks = localStorage.getItem("readingbooks");
  const readingbooks = localReadingbooks ? JSON.parse(localReadingbooks) : [];
  return readingbooks;
};

export const getAllBookmits = () => {
  const localBookmits = localStorage.getItem("bookmits");
  const allBookmits: BookmitsByDate[] = localBookmits
    ? JSON.parse(localBookmits)
    : [];
  return allBookmits;
};

export const getSelectedBookmits = (isbn: string) => {
  const allBookmits = getAllBookmits();
  const selectedBookmits = allBookmits
    .map(({ date, bookmits }) => {
      const selectedBookmits = bookmits.filter(
        (bookmit) => bookmit.bookinfo.isbn === isbn,
      );
      return {
        date,
        bookmits: selectedBookmits,
      };
    })
    .filter(({ bookmits }) => !!bookmits.length);

  return selectedBookmits;
};
