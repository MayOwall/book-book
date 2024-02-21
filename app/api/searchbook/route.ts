import { NextRequest, NextResponse } from "next/server";

const naverClientId = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID!;
const naverClientSecret = process.env.NEXT_PUBLIC_NAVER_CLIENT_SECRET!;
const getHeaders = {
  "X-Naver-Client-Id": naverClientId,
  "X-Naver-Client-Secret": naverClientSecret,
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const keyword = searchParams.get("keyword");

  const res = await fetch(
    `https://openapi.naver.com/v1/search/book.json?display=50&query=${keyword}`,
    { headers: getHeaders },
  );

  const { items } = await res.json();
  const bookitems = items.map(
    ({ title, image, author, publisher, isbn }: any) => {
      return { title, image, author, publisher, isbn };
    },
  );

  return NextResponse.json({ bookitems });
}
