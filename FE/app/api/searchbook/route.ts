import { NextRequest, NextResponse } from "next/server";
import { SEARCH_BOOKITEMS_OFFSET, FIRST_PAGE } from "@/src/constants";

const naverClientId = process.env.NAVER_CLIENT_ID!;
const naverClientSecret = process.env.NAVER_CLIENT_SECRET!;
const headers = {
  "X-Naver-Client-Id": naverClientId,
  "X-Naver-Client-Secret": naverClientSecret,
};

const TEST_USER_ID = process.env.FIREBASE_TEST_USER_ID!;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const keyword = searchParams.get("keyword");
  const page = searchParams.get("page") || FIRST_PAGE;

  const start = (Number(page) - 1) * SEARCH_BOOKITEMS_OFFSET + 1;
  const res = await fetch(
    `https://openapi.naver.com/v1/search/book.json?display=${SEARCH_BOOKITEMS_OFFSET}&start=${start}&query=${keyword}`,
    { headers },
  );

  const { total, items } = await res.json();
  const books = items.map(({ title, image, author, publisher, isbn }: any) => {
    const book: book = {
      id: isbn,
      userId: TEST_USER_ID,
      bookInfo: {
        isbn,
        title,
        author,
        publisher,
        imageURL: image,
      },
      isFinished: false,
      finishedDate: null,
    };
    return book;
  });

  return NextResponse.json({ status: "success", data: { total, books } });
}
