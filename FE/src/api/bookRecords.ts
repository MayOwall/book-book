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

// ✅ 독서 기록을 생성하는 API
export async function postReadingRecord(
  bookId: string,
  title: string,
  startPage: number,
  endPage: number,
): Promise<void> {
  try {
    await postReadingRecordToDB();
  } catch (e) {
    createError(e, "postBookRecord");
  }

  async function postReadingRecordToDB() {
    const options = {
      method: "POST",
      body: JSON.stringify({ bookId, title, startPage, endPage }),
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    };

    const res = await fetch(`/api/reading-records`, options);
    const { status } = await res.json();
    if (status !== "success") throw new Error();
  }
}

// ✅ 월 독서 기록을 가져오는 API
export async function getMonthReadingRecords(year: number, month: number) {
  try {
    return await getMonthReadingRecordsFromDB();
  } catch (e) {
    createError(e, "getMonthReadingRecords");
    return [];
  }

  async function getMonthReadingRecordsFromDB() {
    const res = await fetch(
      `/api/month-reading-records?year=${year}&month=${month}`,
    );
    const { status, data } = await res.json();
    if (status !== "success") throw new Error();
    return data.map((v: any) => {
      return { ...v, date: new Date(v.date) };
    }) as readingRecord[];
  }
}

// ✅ 캘린더 정보를 가져오는 API
export async function getCalendar(year: number, month: number) {
  try {
    return await getCalendarFromDB();
  } catch (e) {
    createError(e, "getCalendar");
    return [];
  }

  async function getCalendarFromDB() {
    const res = await fetch(`/api/calendar?year=${year}&month=${month}`);
    const { status, data } = await res.json();
    if (status !== "success") throw new Error();
    return data.map((v: any) => {
      return { ...v, date: new Date(v.date) };
    }) as { date: Date; readingRecords: readingRecord[] }[];
  }
}

// ✅ 특정 날짜의 독서 기록을 가져오는 API
export async function getDateReadingRecords(
  year: number,
  month: number,
  date: number,
) {
  try {
    return await getDateReadingRecordsFromDB();
  } catch (e) {
    createError(e, "getDateReadingRecords");
    return [];
  }

  async function getDateReadingRecordsFromDB() {
    const res = await fetch(
      `/api/date-reading-records?year=${year}&month=${month}&date=${date}`,
    );
    const { status, data } = await res.json();
    if (status !== "success") throw new Error();
    return data.map((v: any) => {
      return { ...v, date: new Date(v.date) };
    }) as readingRecord[];
  }
}

function createError(e: unknown, place: string) {
  console.log(`❌ Error from ${place}`);
  console.error(e);
}
