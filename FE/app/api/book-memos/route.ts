import db from "@/firebase";
import {
  Timestamp,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { NextRequest } from "next/server";

const TEST_USER_ID = process.env.FIREBASE_TEST_USER_ID!;

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const bookId = searchParams.get("bookId");
  const year = searchParams.get("year");
  const month = searchParams.get("month");

  const collectionRef = collection(db, "users", TEST_USER_ID, "book-memos");
  const filters = [];

  if (bookId) {
    filters.push(where("bookId", "==", bookId));
  }
  if (year && month) {
    const start = new Date(`${year}.${month}.01`);
    const end = new Date(`${year}.${Number(month) + 1}.01`);
    filters.push(where("date", ">=", Timestamp.fromDate(start)));
    filters.push(where("date", "<", Timestamp.fromDate(end)));
  }

  const q = query(collectionRef, ...filters);
  const querySnapshots = await getDocs(q);

  const data: bookReadingLog_[] = [];
  querySnapshots.forEach((v) => {
    const bookReadingLog = v.data();
    data.push({
      ...bookReadingLog,
      id: v.id,
      date: bookReadingLog.date.toDate(),
    } as bookReadingLog_);
  });

  return Response.json({ status: "success", data });
}
