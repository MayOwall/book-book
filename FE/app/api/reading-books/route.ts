import db from "@/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
export const dynamic = "force-dynamic";
const TEST_USER_ID = process.env.FIREBASE_TEST_USER_ID!;

// ✅
export async function GET() {
  const q = query(
    collection(db, "users", TEST_USER_ID, "books"),
    where("isFinished", "!=", true),
  );

  const querySnapshot = await getDocs(q);
  const data: book[] = [];
  querySnapshot.forEach((doc) => {
    const book = {
      ...doc.data(),
      id: doc.id,
    } as book;
    data.push(book);
  });

  return Response.json({
    status: "success",
    data,
  });
}
