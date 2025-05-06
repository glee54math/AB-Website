// utils/writeUserData.ts
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase.ts";

export async function saveUserData(userId: string, data: any) {
  const userRef = doc(db, "users", userId); // users collection, userId as document ID
  await setDoc(userRef, data, { merge: true }); // merge: true keeps existing data
}
