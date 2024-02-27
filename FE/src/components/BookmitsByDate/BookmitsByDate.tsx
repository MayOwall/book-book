import { BookmitCard, BookmitsByDate } from "@/src/types";

export default function BookmitsByDate({ date, bookmits }: BookmitsByDate) {
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="text-sm font-bold">{date}</div>
      {bookmits.map((bookmit) => (
        <BookmitCard key={bookmit._id} {...bookmit} />
      ))}
    </div>
  );
}

function BookmitCard({ _id, bookinfo, startPage, endPage }: BookmitCard) {
  return (
    <div
      className="rounded-lg border border-neutral-300 bg-white p-2 py-3 text-sm"
      data-id={_id}
    >
      <div data-isbn={bookinfo.isbn}>{bookinfo.title}</div>
      <div className="text-neutral-500">
        p.{startPage} - {endPage}
      </div>
    </div>
  );
}
