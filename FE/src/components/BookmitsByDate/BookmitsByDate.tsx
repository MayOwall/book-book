import { BookmitCard, BookmitsByDate } from "@/src/types";

export default function BookmitsByDate({ date, bookmits }: BookmitsByDate) {
  return (
    <div className="my-6 flex w-full flex-col gap-2">
      <div className="font-bold">{date}</div>
      {bookmits.map((bookmit) => (
        <BookmitCard key={bookmit._id} {...bookmit} />
      ))}
    </div>
  );
}

function BookmitCard({ _id, bookinfo, startPage, endPage }: BookmitCard) {
  return (
    <div
      className="rounded-lg border border-neutral-400 bg-white p-2"
      data-id={_id}
    >
      <div data-isbn={bookinfo.isbn}>{bookinfo.title}</div>
      <div className="text-sm">
        p.{startPage} - {endPage}
      </div>
    </div>
  );
}
