import { ReactNode } from "react";

interface ReadingBookShelf {
  readingbooks: bookinfo[];
  selectedBook: bookinfo | null;
  onClick: (bookinfo: bookinfo) => void;
}

interface Button {
  children: ReactNode;
  onClick?: () => any;
}

interface BookSearchbar {
  handleSubmit: (keyword: string) => void;
}

interface bookInfo {
  isbn: string;
  title: string;
  image: string;
  author: string;
  publisher: string;
}

interface BookInfoCard {
  bookinfo: bookinfo;
  type?: "small" | "large";
  onClick?: () => void;
}

type bottomButtonStatus = "nonDisplay" | "more" | "nobooks" | "end";

interface Modal {
  children: ReactNode;
}

interface useModalState {
  content: null | ReactNode;
  createModal: (nextContent: ReactNode) => void;
  remoteModal: () => void;
}

interface bookmitInfo {
  _id: string;
  bookinfo: {
    title: string;
    isbn: string;
  };
  startPage: number;
  endPage: number;
}

interface BookmitCard extends bookmitInfo {}

interface BookmitsByDate {
  date: string;
  bookmits: bookmitInfo[];
}

interface BookmitList {
  bookmits: BookmitsByDate[];
}

interface Icon {
  type: "calendar" | "list" | "write" | "arrowdown";
  status?: "default" | "selected";
  alt: string;
  size?: number;
  style?: object;
}

interface bookRecord {
  _id: string;
  date: string;
  bookInfo: {
    isbn: string;
    title: string;
  };
  startPage: number;
  endPage: number;
}

interface dailyBookRecord {
  date: string;
  bookRecords: bookRecord[];
}

type weeklyBookRecord = (dailyBookRecord | null)[];
type calendarBookRecord = weeklyBookRecord[];
