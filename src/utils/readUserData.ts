// utils/readUserData.ts
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase.ts";

export async function getUserData(userID: string) {
  const userRef = doc(db, "users", userID);
  const docSnap = await getDoc(userRef);
  if (docSnap.exists()) {
    return docSnap.data().skills;
  } else {
    console.log("No such document!");
    return null;
  }
}
