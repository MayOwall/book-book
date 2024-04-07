"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import * as Icon from "@/src/assets/icons";

export default function FNB() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-1/2 flex h-12 w-full max-w-screen-sm -translate-x-1/2 items-center justify-evenly bg-white shadow-lg">
      <Item type="book" selected={pathname === "/book"} />
      <Item type="log" selected={pathname === "/log"} />
      <Item type="setting" selected={pathname === "/setting"} />
    </div>
  );
}

function Item({
  type,
  selected,
}: {
  type: "book" | "log" | "setting";
  selected: boolean;
}) {
  return (
    <Link href={`/${type}`}>
      <div className="flex w-16 flex-col items-center">
        {type === "book" && selected && <Icon.BookFill />}
        {type === "book" && !selected && <Icon.BookLine />}
        {type === "log" && selected && <Icon.CalendarFill />}
        {type === "log" && !selected && <Icon.CalendarLine />}
        {type === "setting" && selected && <Icon.GearFill />}
        {type === "setting" && !selected && <Icon.GearLine />}
        <div
          className={`text-small-regular ${selected ? "text-[theme(colors.primary.default)]" : "text-gray-300"}`}
        >
          {type === "book" && "도서 목록"}
          {type === "log" && "독서 기록"}
          {type === "setting" && "설정"}
        </div>
      </div>
    </Link>
  );
}
