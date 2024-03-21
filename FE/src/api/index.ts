import {
  getSearchBooks,
  getBook,
  postBook,
  getReadingBooks,
  getFinishedBooks,
} from "./books";
import {
  getBookRecords,
  postBookRecord,
  getMonthRecords,
  getAllBookRecords,
  getIsTodayBookRecordExist,
} from "./bookRecords";
export {
  getSearchBooks,
  getBook,
  postBook,
  getReadingBooks,
  getFinishedBooks,
  getBookRecords,
  postBookRecord,
  getMonthRecords,
  getAllBookRecords,
  getIsTodayBookRecordExist,
};

const LOCAL_BOOK_INFOS_KEY = "book-infos";

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
