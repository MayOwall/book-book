import { NextRequest, NextResponse } from "next/server";
import db from "@/firebase";
import {
  doc,
  getDoc,
  addDoc,
  collection,
  updateDoc,
  deleteDoc,
  where,
  query,
  writeBatch,
  getDocs,
} from "firebase/firestore";

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

  const d = docSnap.data();
  const data = {
    ...d,
    id: docSnap.id,
    startDate: d.startDate ? d.startDate.toDate() : d.startDate,
    endDate: d.endDate ? d.endDate.toDate() : d.endDate,
  };

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

export async function DELETE(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const bookId = searchParams.get("id")!;

  // 책 삭제
  const docRef = doc(db, "users", TEST_USER_ID, "books", bookId);
  await deleteDoc(docRef);

  const batch = writeBatch(db);

  // 독서 기록 삭제
  const logCollectionRef = collection(
    db,
    "users",
    TEST_USER_ID,
    "book-reading-logs",
  );
  const logQuery = query(logCollectionRef, where("bookId", "==", bookId));
  const logsToDelete = await getDocs(logQuery);
  logsToDelete.forEach((doc) => batch.delete(doc.ref));

  // 독서 메모 삭제
  const memoCollectionRef = collection(db, "users", TEST_USER_ID, "book-memos");
  const memoQuery = query(memoCollectionRef, where("bookId", "==", bookId));
  const memosToDelete = await getDocs(memoQuery);
  memosToDelete.forEach((doc) => batch.delete(doc.ref));

  await batch.commit();

  return NextResponse.json({ status: "success" });
}
