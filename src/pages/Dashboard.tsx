import { useEffect, useState } from "react";
import SkillCard from "./SkillCard";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const styles = {
  dashboard: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    // gap: "20px", // This creates a gap betwen each grid within the column
    // padding: "20px", // This creates a 20px white border around all sides.
  },
};

export type SkillData = {
  numberCorrect: number;
  totalAttempted: number;
};

function Dashboard({ userID }: { userID: string }) {
  const [userSkills, setUserSkills] = useState<Record<string, SkillData>>({});
  const [sessionStats, setSessionStats] = useState<Record<string, SkillData>>(
    {}
  ); // use with userSkills for live updating + pushing

  const getUserSkills = async () => {
    const docRef = doc(db, "users", userID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      setUserSkills(data.skills || {});
      setSessionStats(data.skills || {});
    } else {
      console.warn("No document found for this user ID!");
      setUserSkills({});
      setSessionStats({});
    }
  };

  //console.log(skills);
  useEffect(() => {
    getUserSkills();
  }, [userID]);

  useEffect(() => {
    console.log(userSkills);
  }, [userSkills]);

  function updateSessionStats(skillName: string, skillData: SkillData) {
    setSessionStats((prev) => {
      return {
        ...prev,
        [skillName]: {
          numberCorrect:
            prev[skillName].numberCorrect + skillData.numberCorrect,
          totalAttempted:
            prev[skillName].totalAttempted + skillData.totalAttempted,
        },
      };
    });
  }

  // Need to write to database
  // updateSkillProgress(
  //   userID,
  //   activeSkill,
  //   numCorrectThisSessionBySkill.count,
  //   correctCount + incorrectCount
  // );
  // // session(skill).correctCount++

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Welcome, {userID}!</h1>
      <div style={styles.dashboard}>
        {Object.entries(userSkills).map(([skillName, skillData]) => (
          <div key={skillName}>
            <SkillCard
              key={skillName}
              skillName={skillName}
              skillData={skillData}
              updateSessionStats={updateSessionStats}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
