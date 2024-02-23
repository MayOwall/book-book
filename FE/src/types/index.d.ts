import { ReactNode } from "react";

interface ReadingBookShelf {
  readingbooks: bookinfo[];
  selectedBook: bookinfo | null;
  onClick: (bookinfo: bookinfo) => void;
}

interface LargeButton {
  children: ReactNode;
  type?: "fill" | "line";
  onClick?: () => any;
}

interface BookSearchbar {
  handleSubmit: (keyword: string) => void;
}

interface bookinfo {
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
