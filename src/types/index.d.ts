import { ReactNode } from "react";

export interface ReadingBookShelf {
  books?: ReactNode;
}

export interface LargeButton {
  children: ReactNode;
  type?: "fill" | "line";
  onClick?: () => any;
}
