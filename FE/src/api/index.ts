import {
  getSearchBooks,
  getBook,
  postBook,
  getReadingBooks,
  getFinishedBooks,
  putBook,
} from "./books";
import {
  getBookReadingRecords,
  postReadingRecord,
  getMonthReadingRecords,
  getCalendar,
  getDateReadingRecords,
} from "./bookRecords";
export {
  getSearchBooks,
  getBook,
  postBook,
  getReadingBooks,
  getFinishedBooks,
  getBookReadingRecords,
  postReadingRecord,
  getMonthReadingRecords,
  getCalendar,
  putBook,
  getDateReadingRecords,
};

// export const putBookInfo = (
//   isbn: string,
//   startPage: number,
//   endPage: number,
// ) => {
//   const bookInfos = getAllBookInfos();
//   const nextBookInfos = bookInfos.map((bookInfo) => {
//     if (bookInfo.isbn === isbn) {
//       const pages = endPage - startPage + 1;
//       const today = new Date().toDateString();
//       const lastDate = bookInfo.readDates[bookInfo.readDates.length - 1];
//       const nextReadDates =
//         today === lastDate
//           ? bookInfo.readDates
//           : [...bookInfo.readDates, today];

//       bookInfo = {
//         ...bookInfo,
//         readPages: bookInfo.readPages + pages,
//         readDates: nextReadDates,
//       };
//     }

//     return bookInfo;
//   });

//   localStorage.setItem(LOCAL_BOOK_INFOS_KEY, JSON.stringify(nextBookInfos));
// };

// export const putFinishedBookInfo = (isbn: string) => {
//   const bookInfos = getAllBookInfos();
//   const nextBookInfos = bookInfos.map((bookInfo) => {
//     if (bookInfo.isbn === isbn) {
//       bookInfo = {
//         ...bookInfo,
//         finishedDate: new Date().toDateString(),
//       };
//     }

//     return bookInfo;
//   });

//   localStorage.setItem(LOCAL_BOOK_INFOS_KEY, JSON.stringify(nextBookInfos));
// };

// export const putReStartBookInfo = (isbn: string) => {
//   const bookInfos = getAllBookInfos();
//   const nextBookInfos = bookInfos.map((bookInfo) => {
//     if (bookInfo.isbn === isbn) {
//       bookInfo = {
//         ...bookInfo,
//         finishedDate: null,
//       };
//     }

//     return bookInfo;
//   });

//   localStorage.setItem(LOCAL_BOOK_INFOS_KEY, JSON.stringify(nextBookInfos));
// };
