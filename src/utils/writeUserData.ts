// utils/writeUserData.ts
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase.ts";

export async function updateSkillProgress(userID: string, skillName: string, numCorrectInSession: number, numAttemptedInSession: number) {
  const userRef = doc(db, "users", userID); // users collection, userId as document ID
  const skillPath = `skills.${skillName}`;
  const userSnap = await getDoc(userRef);

  let existingData = {}

  if (userSnap.exists()) {
    existingData = userSnap.data().skills;
    console.log(existingData)
  }

  // Get current skill data or initialize it
  const current = existingData[skillName] || {
    numberCorrect: 0,
    totalAttempted: 0
  };

    // Update with session results
  const updated = {
    numberCorrect: current.numberCorrect + numCorrectInSession,
    totalAttempted: current.totalAttempted + numAttemptedInSession
  }

  // Save back to Firestore
  // await setDoc(userRef, {
  //   [skillName]: updated
  // }, { merge: true }); // merge so we don't overwrite other skills

  await updateDoc(userRef, {
    [`${skillPath}.numberCorrect`]: updated.numberCorrect,
    [`${skillPath}.totalAttempted`]: updated.totalAttempted,
  });
}
