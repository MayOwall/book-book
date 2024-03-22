import { ReactNode } from "react";

export default function Modal({ children }: { children: ReactNode }) {
  return (
    <div className="fixed left-0 top-0 z-10 flex h-lvh w-lvw items-center justify-center bg-black/[.2] p-4">
      <div className="w-full rounded-xl bg-white p-4 py-8">{children}</div>
    </div>
  );
}
