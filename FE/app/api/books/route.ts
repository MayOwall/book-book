import db from "@/firebase";
import { collection, getDocs } from "firebase/firestore";
import type { bookInfo } from "@/src/types";

const ID = process.env.FIREBASE_TEST_USER_ID!;

export async function GET() {
  const querySnapshot = await getDocs(collection(db, "users", ID, "books"));
  const data: bookInfo[] = [];
  querySnapshot.forEach((doc) => data.push(doc.data() as bookInfo));
  return Response.json({ status: "success", data });
}
