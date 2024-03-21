import db from "@/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  Timestamp,
} from "firebase/firestore";
import { NextRequest } from "next/server";
const TEST_USER_ID = process.env.FIREBASE_TEST_USER_ID!;

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const bookId = params.get("id")!;

  const bookRef = doc(db, "users", TEST_USER_ID, "books", bookId);
  const { bookInfo } = (await getDoc(bookRef)).data() as book;
  const { title } = bookInfo;

  const collectionRef = collection(
    db,
    "users",
    TEST_USER_ID,
    "books",
    bookId,
    "reading-records",
  );
  const querySnapshots = await getDocs(collectionRef);

  const data: readingRecord[] = [];
  querySnapshots.forEach((snapshot) => {
    const { startPage, endPage, date } = snapshot.data();
    data.push({
      id: snapshot.id,
      title,
      date: new Date(date.toDate()),
      startPage,
      endPage,
    });
  });

  return Response.json({ status: "success", data });
}

export async function POST(req: NextRequest) {
  let body = await req.json();
  const date = Timestamp.now();
  body = {
    ...body,
    date,
  };
  await addDoc(collection(db, "users", TEST_USER_ID, "book-records"), body);
  return Response.json({ status: "success" });
}
