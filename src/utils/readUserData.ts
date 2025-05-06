// utils/readUserData.ts
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase.ts";

export async function getUserData(userId: string) {
  const userRef = doc(db, "users", userId);
  const docSnap = await getDoc(userRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No such document!");
    return null;
  }
}
