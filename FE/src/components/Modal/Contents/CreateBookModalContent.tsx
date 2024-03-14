import { useRouter } from "next/navigation";
import { useModalStore } from "@/src/stores";
import { BookInfoCard, Button } from "@/src/components";
import type { bookInfo } from "@/src/types";

export default function CreateBookModalContent({
  bookinfo,
}: {
  bookinfo: bookInfo;
}) {
  const router = useRouter();
  const remoteModal = useModalStore((state) => state.remoteModal);

  const onSubmit = () => {
    handleReadingbooks(bookinfo);
    remoteModal();
    router.push("/write");
  };

  const handleReadingbooks = (bookinfo: bookInfo) => {
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
        <Button onClick={onSubmit}>등록하기</Button>
        <button className="text-neutral-500" onClick={remoteModal}>
          취소
        </button>
      </div>
    </section>
  );
}
