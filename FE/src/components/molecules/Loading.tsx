"use client";
import LoadingFace from "@/src/assets/loading-face.svg";

export default function Loading() {
  return (
    <div className="fixed left-0 top-0 flex h-svh w-svw flex-col items-center justify-center gap-2 bg-[#ffffffaa] ">
      <div className="animate-bounce">
        <LoadingFace />
      </div>
      <div className="text-medium-bold">로딩중</div>
    </div>
  );
}
