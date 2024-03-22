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

  const q = query(
    collectionRef,
    where("date", ">=", start),
    where("date", "<", end),
  );
  const querySnapshots = await getDocs(q);
  const data: readingRecord[] = [];
  querySnapshots.forEach((snapshot) => {
    const readingRecord = snapshot.data();
    data.push({
      ...readingRecord,
      id: snapshot.id,
      date: readingRecord.date.toDate(),
    } as readingRecord);
  });

  return Response.json({ status: "success", data });
}
