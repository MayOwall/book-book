import db from "@/firebase";
import { collection, getDocs, query } from "firebase/firestore";

const TEST_USER_ID = process.env.FIREBASE_TEST_USER_ID!;

// ✅
export async function GET() {
  const querySnapshot = await getDocs(
    query(collection(db, "users", TEST_USER_ID, "books")),
  );
  const data: bookInfo[] = [];
  querySnapshot.forEach((doc) => data.push(doc.data() as bookInfo));
  return Response.json({ status: "success", data });
}
