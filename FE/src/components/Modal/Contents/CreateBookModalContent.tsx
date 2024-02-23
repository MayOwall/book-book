import { useRouter } from "next/navigation";
import { useModalStore } from "@/src/stores";
import { BookInfoCard, LargeButton } from "@/src/components";
import type { bookinfo } from "@/src/types";

export default function CreateBookModalContent({
  bookinfo,
}: {
  bookinfo: bookinfo;
}) {
  const router = useRouter();
  const remoteModal = useModalStore((state) => state.remoteModal);

  const onSubmit = () => {
    handleReadingbooks(bookinfo);
    remoteModal();
    router.push("/");
  };

  const handleReadingbooks = (bookinfo: bookinfo) => {
    const localReadingBooks = localStorage.getItem("readingbooks");
    const readingBooks = localReadingBooks ? JSON.parse(localReadingBooks) : [];
    const nextReadingBooks = [...readingBooks, bookinfo];

    localStorage.setItem("readingbooks", JSON.stringify(nextReadingBooks));
  };

  return (
    <section className="flex flex-col items-center gap-8">
      <h1 className="text-xl font-bold">이 책을 등록할까요?</h1>
      <BookInfoCard type="large" bookinfo={bookinfo} />
      <div className="flex w-full flex-col items-center gap-2">
        <LargeButton onClick={onSubmit}>등록하기</LargeButton>
        <button className="text-neutral-500" onClick={remoteModal}>
          취소
        </button>
      </div>
    </section>
  );
}
