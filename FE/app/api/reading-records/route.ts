import { NextRequest } from "next/server";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import db from "@/firebase";
const TEST_USER_ID = process.env.FIREBASE_TEST_USER_ID!;

export async function POST(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const id = params.get("id")!;

  let body = await req.json();
  const date = Timestamp.now();
  body = {
    ...body,
    date: date,
  };

  const ref = collection(
    db,
    "users",
    TEST_USER_ID,
    "books",
    id,
    "reading-records",
  );
  await addDoc(ref, body);

  return Response.json({ status: "success" });
}
