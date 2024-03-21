declare module "@/src/types";

interface book {
  id: string;
  bookInfo: bookInfo;
  isFinished: boolean;
  readingRecords: readingRecord[];
}

interface bookInfo {
  isbn: string;
  title: string;
  author: string;
  publisher: string;
  imageURL: string;
}

interface readingRecord {
  date: Date;
  readingRecords: { startPage: number; endPage: number }[];
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
