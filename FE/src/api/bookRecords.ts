import { isSameDate } from "../utils";

// ✅ 한 책의 전체 독서 기록을 가져오는 API
export async function getBookReadingRecords(
  id: string,
): Promise<readingRecord[]> {
  try {
    return await getBookReadingRecordsFromDB();
  } catch (e) {
    createError(e, "getBookRecords");
    return [];
  }

  async function getBookReadingRecordsFromDB() {
    const res = await fetch(`/api/book-reading-records?id=${id}`);
    const { status, data } = await res.json();
    if (status !== "success") throw new Error();
    return data.map((readingRecord: any) => {
      return {
        ...readingRecord,
        date: new Date(readingRecord.date),
      };
    });
  }
}

// ✅ 하나의 월의 전체 독서 기록을 가져오는 API
export async function getMonthRecords(year: number, month: number) {
  try {
    const data = await getMonthRecordsFromDB();
    return data.map((v: any) => {
      return {
        ...v,
        date: new Date(v.date),
      };
    });
  } catch (e) {
    createError(e, "getMonthRecords");
    return [];
  }

  async function getMonthRecordsFromDB() {
    const res = await fetch(`/api/month-records?year=${year}&month=${month}`);
    const { status, data } = await res.json();
    if (status !== "success") throw new Error();
    return data;
  }
}

// TODO: 하나의 날짜의 전체 독서 기록을 가져오는 API

// ✅ 독서 기록을 생성하는 API
export async function postBookRecord(
  title: string,
  isbn: string,
  startPage: number,
  endPage: number,
): Promise<void> {
  try {
    const body = createBody();
    await postBookRecordToDB(body);
  } catch (e) {
    createError(e, "postBookRecord");
  }

  function createBody() {
    const date = new Date();
    const bookInfo = { title, isbn };
    return { bookInfo, startPage, endPage, date };
  }
  async function postBookRecordToDB(bookRecord: unknown) {
    const options = {
      method: "POST",
      body: JSON.stringify(bookRecord),
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    };

    const res = await fetch(`/api/book-records`, options);
    const { status } = await res.json();
    if (status !== "success") throw new Error();
  }
}

// TODO: 전체 독서 기록을 가져오는 API
export async function getAllBookRecords() {
  try {
    return (await getAllBookRecordsFromDB()) as bookRecord[];
  } catch (e) {
    createError(e, "getMonthRecords");
    return [];
  }

  async function getAllBookRecordsFromDB() {
    const res = await fetch("/api/all-records");
    const { status, data } = await res.json();
    if (status !== "success") throw new Error();
    return data.map((v: any) => {
      return {
        ...v,
        date: new Date(v.date),
      };
    });
  }
}

export async function getIsTodayBookRecordExist() {
  const data = await getAllBookRecords();
  const date = data[data.length - 1].date;

  return isSameDate(date, new Date());
}

function createError(e: unknown, place: string) {
  console.log(`❌ Error from ${place}`);
  console.error(e);
}
