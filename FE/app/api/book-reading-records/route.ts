import db from "@/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { NextRequest } from "next/server";
const TEST_USER_ID = process.env.FIREBASE_TEST_USER_ID!;

// ✅
export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const bookId = params.get("id")!;

  const collectionRef = collection(
    db,
    "users",
    TEST_USER_ID,
    "reading-records",
  );
  const q = query(collectionRef, where("bookId", "==", bookId));
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
