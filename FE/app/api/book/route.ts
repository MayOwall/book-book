import { NextRequest, NextResponse } from "next/server";
import db from "@/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const TEST_USER_ID = process.env.FIREBASE_TEST_USER_ID!;

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id")!;

  const docRef = doc(db, "users", TEST_USER_ID, "books", id);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    return NextResponse.json({ status: "fail" });
  }

  const data = docSnap.data();
  return NextResponse.json({ status: "success", data });
}

export async function POST(req: NextRequest) {
  const { id, isFinished, bookInfo }: book = await req.json();
  const nextBody = {
    id,
    bookInfo,
    isFinished,
  };
  await setDoc(doc(db, "users", TEST_USER_ID, "books", id), nextBody);
  return NextResponse.json({ status: "success" });
}
