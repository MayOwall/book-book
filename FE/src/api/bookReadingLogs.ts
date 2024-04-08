export async function getBookReadingLogs(params: {
  bookId?: string;
  year?: number;
  month?: number;
}) {
  try {
    const { bookId, year, month } = params;
    const url = `/api/book-reading-logs?${!!bookId ? `bookId=${bookId}&` : ""}${!!year ? `year=${year}&` : ""}${!!month ? `month=${month}` : ""}`;
    const res = await fetch(url);
    const { status, data } = await res.json();
    if (status !== "success") throw new Error();
    return data;
  } catch (e) {
    createError(e, "getBookReadingLogs");
  }
}

function createError(e: unknown, place: string) {
  console.log(`❌ Error from ${place}`);
  console.error(e);
}
