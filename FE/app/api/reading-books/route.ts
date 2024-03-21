import db from "@/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

const TEST_USER_ID = process.env.FIREBASE_TEST_USER_ID!;

export async function GET() {
  const q = query(
    collection(db, "users", TEST_USER_ID, "books"),
    where("isFinished", "!=", true),
  );
  const querySnapshot = await getDocs(q);
  const data: book[] = [];
  querySnapshot.forEach((doc) => data.push(doc.data() as book));

  return Response.json({
    status: "success",
    data,
  });
}
