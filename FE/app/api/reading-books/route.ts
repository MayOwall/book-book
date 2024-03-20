import db from "@/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import type { bookInfo } from "@/src/types";

const TEST_USER_ID = process.env.FIREBASE_TEST_USER_ID!;

export async function GET() {
  const q = query(
    collection(db, "users", TEST_USER_ID, "books"),
    where("finishedDate", "==", ""),
  );
  const querySnapshot = await getDocs(q);
  const data: bookInfo[] = [];
  querySnapshot.forEach((doc) => data.push(doc.data() as bookInfo));

  return Response.json({
    status: "success",
    data,
  });
}
