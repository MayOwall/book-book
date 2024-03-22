import db from "@/firebase";
import {
  collection,
  getDocs,
  query,
  where,
  Timestamp,
} from "firebase/firestore";
import { NextRequest } from "next/server";
const TEST_USER_ID = process.env.FIREBASE_TEST_USER_ID!;

// ✅
export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const year = Number(params.get("year")!);
  const month = Number(params.get("month")!);

  const collectionRef = collection(
    db,
    "users",
    TEST_USER_ID,
    "reading-records",
  );

  const start = Timestamp.fromDate(new Date(year, month, 1));
  const end = Timestamp.fromDate(new Date(year, month + 1, 1));
  const lastDate = new Date(year, month + 1, 0).getDate();

  const q = query(
    collectionRef,
    where("date", ">=", start),
    where("date", "<", end),
  );
  const querySnapshots = await getDocs(q);
  const calendar: { date: Date; readingRecords: readingRecord[] }[] =
    Array.from({ length: lastDate }, (_, i) => {
      const date = new Date(year, month, i + 1);
      return {
        date,
        readingRecords: [],
      };
    });

  querySnapshots.forEach((snapshot) => {
    const data = snapshot.data();
    const id = snapshot.id;
    const date = data.date.toDate();
    const readingRecord = {
      ...data,
      id,
      date,
    } as readingRecord;
    calendar[date.getDate() - 1].readingRecords.push(readingRecord);
  });

  return Response.json({ status: "success", data: calendar });
}
