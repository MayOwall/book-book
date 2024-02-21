import { ReactNode } from "react";

interface ReadingBookShelf {
  books?: ReactNode;
}

interface LargeButton {
  children: ReactNode;
  type?: "fill" | "line";
  onClick?: () => any;
}

interface BookSearchbar {
  handleBookitems: (bookitems: bookitems[]) => void;
}

interface bookitems {
  isbn: string;
  title: string;
  image: string;
  author: string;
  publisher: string;
}
