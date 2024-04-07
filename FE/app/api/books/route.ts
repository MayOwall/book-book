import db from "@/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { NextRequest } from "next/server";

const TEST_USER_ID = process.env.FIREBASE_TEST_USER_ID!;

// ✅
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const status = searchParams.get("status");

  let q;
  if (!status) {
    q = query(collection(db, "users", TEST_USER_ID, "books"));
  } else {
    q = query(
      collection(db, "users", TEST_USER_ID, "books"),
      where("status", "==", status),
    );
  }
  const querySnapshot = await getDocs(q);
  const data: book_[] = [];
  querySnapshot.forEach((doc) => {
    const id = doc.id;
    const docData = doc.data();
    const book = {
      ...docData,
      id,
      startDate :  docData.startDate
      ? docData.startDate.toDate()
      : docData.startDate,
      endDate : docData.endDate
      ? docData.endDate.toDate()
      : docData.endDate,
    } as book_;
    data.push(book);
  });
  return Response.json({ status: "success", data });
}
