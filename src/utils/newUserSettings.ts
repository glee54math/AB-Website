import { doc, getDoc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../firebase";

export async function ensureUserDocumentExists() {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    const userDocRef = doc(db, "users", user.uid);
    const userDocSnap = await getDoc(userDocRef);

    if (!userDocSnap.exists()) {
      // Default structure you want when new users are created
      await setDoc(userDocRef, {
        email: user.email,
        skills: {
          Addition: { numberCorrect: 0, totalAttempted: 0 },
          Subtraction: { numberCorrect: 0, totalAttempted: 0 },
        },
      });
      console.log("Created new Firestore user doc");
    } else {
      console.log("User doc already exists");
    }
  }
}
