import { NextRequest } from "next/server";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import db from "@/firebase";
const TEST_USER_ID = process.env.FIREBASE_TEST_USER_ID!;

// ✅
export async function POST(req: NextRequest) {
  const body = await req.json();
  const date = Timestamp.now();
  const newReadingRecord = {
    ...body,
    date,
  };

  const ref = collection(db, "users", TEST_USER_ID, "reading-records");
  await addDoc(ref, newReadingRecord);

  return Response.json({ status: "success" });
}
