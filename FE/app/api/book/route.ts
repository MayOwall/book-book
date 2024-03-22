import { NextRequest, NextResponse } from "next/server";
import db from "@/firebase";
import { doc, getDoc, addDoc, collection, updateDoc } from "firebase/firestore";

const TEST_USER_ID = process.env.FIREBASE_TEST_USER_ID!;

// ✅
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

// ✅
export async function POST(req: NextRequest) {
  const { isFinished, bookInfo }: book = await req.json();
  const newBook = {
    bookInfo,
    isFinished,
    finishedDate: null,
  };
  await addDoc(collection(db, "users", TEST_USER_ID, "books"), newBook);
  return NextResponse.json({ status: "success" });
}

// ✅
export async function PUT(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id")!;
  const body = await req.json();
  const docRef = doc(db, "users", TEST_USER_ID, "books", id);
  await updateDoc(docRef, body);
  return NextResponse.json({ status: "success" });
}
