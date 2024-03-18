import Link from "next/link";
import { Icon } from "@/src/components";
import { usePathname } from "next/navigation";

const ITEM_STYLE =
  "flex-1 flex flex-col justify-center items-center text-xs h-full";

const SELECTED_FONT_STYLE = "font-bold text-green";

export default function BottomBar() {
  const pathname = usePathname();
  const currentPath = getCurrentPath(pathname);

  return (
    <nav className="fixed bottom-0 left-0 flex w-lvw justify-center bg-white text-neutral-300 ">
      <ul className="flex h-12 w-full max-w-screen-sm">
        <Link href="/write" className="w-full">
          <li className={ITEM_STYLE}>
            <Icon
              type="write"
              status={currentPath === "write" ? "selected" : "default"}
              alt="기록하기"
            />
            <span
              className={currentPath === "write" ? SELECTED_FONT_STYLE : ""}
            >
              기록하기
            </span>
          </li>
        </Link>
        <Link href="/calendar" className="w-full">
          <li className={ITEM_STYLE}>
            <Icon
              type="calendar"
              status={currentPath === "calendar" ? "selected" : "default"}
              alt="기록하기"
            />
            <span
              className={currentPath === "calendar" ? SELECTED_FONT_STYLE : ""}
            >
              독서 달력
            </span>
          </li>
        </Link>
        <Link href="/list" className="w-full">
          <li className={ITEM_STYLE}>
            <Icon
              type="list"
              status={currentPath === "list" ? "selected" : "default"}
              alt="기록하기"
            />
            <span className={currentPath === "list" ? SELECTED_FONT_STYLE : ""}>
              독서 리스트
            </span>
          </li>
        </Link>
        <Link href="/book-storage" className="w-full">
          <li className={ITEM_STYLE}>
            <Icon
              type="book-storage"
              status={currentPath === "book-storage" ? "selected" : "default"}
              alt="책 보관소"
            />
            <span
              className={
                currentPath === "book-storage" ? SELECTED_FONT_STYLE : ""
              }
            >
              책 보관소
            </span>
          </li>
        </Link>
      </ul>
    </nav>
  );
}

const getCurrentPath = (path: string) => {
  if (path.match(/^\/calendar/)) return "calendar";
  if (path.match(/^\/list/)) return "list";
  if (path.match(/^\/write/)) return "write";
  if (path.match(/^\/book-storage/)) return "book-storage";
  return "calendar";
};
