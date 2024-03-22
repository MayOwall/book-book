declare module "@/src/types";

interface book {
  id: string;
  userId: string;
  bookInfo: bookInfo;
  isFinished: boolean;
  finishedDate: Date | null;
}

interface bookInfo {
  title: string;
  isbn: string;
  author: string;
  publisher: string;
  imageURL: string;
}

interface readingRecord {
  id: string;
  userId: string;
  bookId: string;
  date: Date;
  title: string;
  startPage: number;
  endPage: number;
}

interface Icon {
  type: "calendar" | "list" | "write" | "arrowdown" | "book-storage";
  status?: "default" | "selected";
  alt: string;
  size?: number;
  style?: object;
}

interface BookInfoCard {
  bookInfo: bookInfo;
  type?: "small" | "large";
  onClick?: () => void;
}

interface ReadingBookShelf {
  readingBooks: book[];
  selectedBook: book | null;
  onClick: (book: book) => void;
}

interface DailyReadingRecords {
  readingRecords: readingRecord[];
}
