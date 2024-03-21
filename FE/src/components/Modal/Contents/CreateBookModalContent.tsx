import { useRouter } from "next/navigation";
import { postBook } from "@/src/api";
import { BookInfoCard, Button } from "@/src/components";
import { useModalStore } from "@/src/stores";

export default function CreateBookModalContent({ book }: { book: book }) {
  const router = useRouter();
  const remoteModal = useModalStore((state: any) => state.remoteModal);

  const onSubmit = () => {
    postBook(book);
    remoteModal();
    router.push("/write");
  };

  return (
    <section className="flex flex-col items-center gap-6">
      <h1 className="text-xl font-bold">이 책을 등록할까요?</h1>
      <BookInfoCard type="large" bookInfo={book.bookInfo} />
      <div className="flex w-full flex-col items-center gap-2">
        <Button onClick={onSubmit}>네, 이 책을 등록할게요</Button>
        <button className="text-neutral-300" onClick={remoteModal}>
          등록 취소
        </button>
      </div>
    </section>
  );
}
