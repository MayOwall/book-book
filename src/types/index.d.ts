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
