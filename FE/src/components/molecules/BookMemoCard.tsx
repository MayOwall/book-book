import { getMindateString } from "@/src/utils";
import TrashIcon from "@/src/assets/icons/trash-icon.svg";

interface BookMemoCard {
  bookMemo: bookMemo_;
  type: "title" | "default";
  removable: boolean;
  onDelete?: (id: string) => void;
}

export default function BookMemoCard({
  bookMemo,
  type,
  removable,
  onDelete,
}: BookMemoCard) {
  const { id, date, bookTitle, content } = bookMemo;
  return (
    <div className="relative w-full rounded-lg bg-white p-4 shadow">
      <div className="text-small-regular mb-2 text-gray-300">
        {getMindateString(date)}
      </div>
      {type === "title" && (
        <div className="text-small-bold mb-2 truncate">{bookTitle}</div>
      )}
      <div className="text-medium-regular h-24 w-full">{content}</div>
      {removable && !!onDelete && (
        <button className="absolute right-4 top-4" onClick={() => onDelete(id)}>
          <TrashIcon width={16} height={16} fill="#D1D5DB" />
        </button>
      )}
    </div>
  );
}
