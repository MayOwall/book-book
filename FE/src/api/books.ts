// 검색어를 바탕으로 네이버의 책 검색 결과를 가져오는 API
export async function getSearchBooks(keyword: string, page: number) {
  try {
    return await getSearchBooksFromNaverAPI();
  } catch (e) {
    createError(e, "getSearchBooks");
    return { total: 0, books: [] };
  }

  async function getSearchBooksFromNaverAPI() {
    const res = await fetch(`/api/searchbook?keyword=${keyword}&page=${page}`);
    const { status, data } = await res.json();
    if (status !== "success") throw new Error();
    return data as { total: number; books: book[] };
  }
}

// 하나의 책 정보를 가져오는 API
export async function getBook(id: string): Promise<bookInfo | null> {
  try {
    return await getBookfromDB();
  } catch (e) {
    createError(e, "getBook");
    return null;
  }

  async function getBookfromDB() {
    const res = await fetch(`/api/book?id=${id}`);
    const { status, data } = await res.json();
    if (status !== "success") throw new Error();
    return data;
  }
}

// 읽고 있는 책 정보를 가져오는 API
export async function getReadingBooks() {
  try {
    return await getReadingBooksFromDB();
  } catch (e) {
    createError(e, "getReadingBooks");
    return [];
  }

  async function getReadingBooksFromDB() {
    const res = await fetch("/api/reading-books");
    const { status, data } = await res.json();
    if (status !== "success") throw new Error();
    return data as book[];
  }
}

// 다 읽은 책 정보를 가져오는 API
export async function getFinishedBooks() {
  try {
    return await getFinishedBooksFromDB();
  } catch (e) {
    createError(e, "getReadingBooks");
    return [];
  }

  async function getFinishedBooksFromDB() {
    const res = await fetch("/api/finished-books");
    const { status, data } = await res.json();
    if (status !== "success") throw new Error();
    return data as bookInfo[];
  }
}

// 새 책을 생성하는 API
export async function postBook(book: book): Promise<void> {
  try {
    await checkBookExistInDB();
    await postNewBookToDB();
  } catch (e) {
    createError(e, "postBook");
  }

  async function checkBookExistInDB() {
    const isBookExist = await getBook(book.id);
    if (isBookExist) {
      throw new Error("❌ Book is Alreay Exist");
    }
  }
  async function postNewBookToDB() {
    const options = {
      method: "POST",
      body: JSON.stringify(book),
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    };
    const res = await fetch("/api/book", options);
    const { status } = await res.json();
    if (status !== "success") throw new Error();
  }
}

// TODO: 책 정보를 업데이트하는 API

// TODO: 다 읽은 책 처리하는 API
export async function putFinishedDate(isbn: string, finishedDate: string) {
  try {
    await fetch("/api/book/finished-date", {
      method: "PUT",
      body: JSON.stringify({ isbn, finishedDate }),
    });
  } catch (e) {
    createError(e, "putFinishedDate");
  }
}

// TODO: 다 읽은 책을 다시 읽도록 처리하는 API

function createError(e: unknown, place: string) {
  console.log(`❌ Error from ${place}`);
  console.error(e);
}
