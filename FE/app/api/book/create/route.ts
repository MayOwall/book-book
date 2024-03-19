import db from "@/firebase";
import { doc, collection, setDoc } from "firebase/firestore";
const ID = process.env.FIREBASE_TEST_USER_ID!;

export async function POST(request: Request) {
  try {
    const book = await request.json();
    const booksCollectionRef = doc(collection(db, "users", ID, "books"));
    await setDoc(booksCollectionRef, book);
    return Response.json({ status: "success" });
  } catch (e) {
    console.error("Error adding document: ", e);
    return Response.json({ status: "error" });
  }
}
