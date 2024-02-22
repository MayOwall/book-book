import Image from "next/image";
import type { BookInfoCard } from "@/src/types";

export default function BookInfoCard({
  bookinfo,
  type = "small",
  onClick,
}: BookInfoCard) {
  const { title, image, author, publisher } = bookinfo;

  const style = {
    container: {
      small: "flex h-28 w-full gap-2 border border-black",
      large: "w-full flex flex-col items-center gap-4 p-4 border border-black",
    },
    image: {
      small: "aspect-book relative h-full rounded",
      large: "aspect-book relative w-1/2 rounded",
    },
    textbox: {
      small:
        "flex w-full flex-col justify-center gap-1 overflow-hidden text-xs",
      large:
        "flex w-full flex-col items-center justify-center gap-1  overflow-hidden",
    },
    title: {
      small: "w-full truncate text-sm font-bold pr-4",
      large: "w-fit max-w-full text-center text-base font-bold",
    },
  };

  return (
    <div className={style.container[type]} onClick={onClick}>
      <div className={style.image[type]}>
        <Image
          src={image}
          alt={title}
          sizes="100px"
          fill
          style={{ objectFit: "fill" }}
        />
      </div>
      <div className={style.textbox[type]}>
        <div className={style.title[type]}>{title}</div>
        <div className="truncate">{author}</div>
        <div className="truncate">{publisher}</div>
      </div>
    </div>
  );
}
