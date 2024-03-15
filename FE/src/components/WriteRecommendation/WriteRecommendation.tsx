import Link from "next/link";
import Image from "next/image";

export default function WriteRecommendation() {
  return (
    <Link href="/write">
      <div className="mb-4 flex w-full flex-col rounded-lg bg-white p-4 pb-3">
        <span className="text-sm text-neutral-300">
          아직 오늘의 독서를 기록하지 않았어요.
        </span>
        <div className="flex items-center gap-1 text-lg font-bold text-emerald-400">
          <span>오늘의 독서 기록하러 가기</span>
          <Image
            src="/icons/arrowdown-icon-default.svg"
            width={15}
            height={15}
            style={{ transform: "rotate(-90deg)" }}
            alt="오늘의 독서 기록하러 가기"
          />
        </div>
      </div>
    </Link>
  );
}
