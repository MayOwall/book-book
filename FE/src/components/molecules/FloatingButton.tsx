import { useState } from "react";
import PlusIcon from "@/src/assets/icons/plus-icon.svg";
import WriteIcon from "@/src/assets/icons/write-icon.svg";
import MemoIcon from "@/src/assets/icons/memo-icon.svg";
import { useRouter } from "next/navigation";

export default function FloatingButton() {
  const [isActive, setIsActive] = useState(false);
  const btnStyle = "flex justify-center items-center";
  const router = useRouter();

  return (
    <>
      <button
        className={`absolute bottom-16 right-4 h-16 w-16 bg-[theme(colors.primary.default)] ${btnStyle} z-10 rounded-full shadow-lg hover:bg-[theme(colors.primary.hover)] active:bg-[theme(colors.primary.active)] ${!isActive ? "opacity-100" : "inVisible opacity-0"}`}
        onClick={() => setIsActive(true)}
      >
        <PlusIcon width={32} height={32} stroke="#ffffff" />
      </button>
      <div
        className={`absolute bottom-16 right-4 z-30 ${isActive ? "opacity-100" : "pointer-events-none invisible opacity-0"} duration-500`}
      >
        <button
          className="group flex items-center gap-4"
          onClick={() => router.push("/book-reading-log/create")}
        >
          <span className="text-medium-bold flex-shrink-0 text-gray-700">
            독서 기록하기
          </span>
          <span
            className={`h-16 w-16 bg-white ${btnStyle} flex-shrink-0 rounded-full  shadow-lg group-hover:bg-gray-50 group-active:bg-gray-200`}
          >
            <WriteIcon width={32} height={32} fill="#FCD34D" />
          </span>
        </button>
        <button
          className={`group absolute bottom-0 flex items-center gap-6 ${isActive ? "-translate-y-20" : "pointer-events-none"}  duration-500`}
          onClick={() => router}
        >
          <div className="text-medium-bold text-gray-700">메모 작성하기</div>
          <div
            className={`h-12 w-12 bg-white ${btnStyle} rounded-full shadow-lg  group-hover:bg-gray-50  group-active:bg-gray-200`}
            onClick={() => router.push("/book-memo/create")}
          >
            <MemoIcon width={32} height={32} fill="#FCD34D" />
          </div>
        </button>
      </div>
      {isActive && (
        <div
          className="fixed bottom-0 right-0 z-10 h-dvh w-dvw bg-[#ffffffbb]"
          onClick={() => setIsActive(false)}
        />
      )}
    </>
  );
}
