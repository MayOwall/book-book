import type { Modal } from "@/src/types";

export default function Modal({ children }: Modal) {
  return (
    <div className="absolute left-0 top-0 z-10 flex h-lvh w-lvw items-center justify-center bg-black/[.2] p-4">
      <div className="w-full rounded-xl bg-white p-4 py-8">{children}</div>
    </div>
  );
}
