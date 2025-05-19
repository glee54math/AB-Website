import { useEffect, useState } from "react";
import SkillCard from "./SkillCard";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import AppSidebar from "../components/SideNavBar";
import { SidebarProvider } from "../components/ui/sidebar";

export type SkillData = {
  numberCorrect: number;
  totalAttempted: number;
};

function Dashboard({ userID }: { userID: string }) {
  const [userSkills, setUserSkills] = useState<Record<string, SkillData>>({}); // [skillName, skillData]
  const [sessionStats, setSessionStats] = useState<Record<string, SkillData>>(
    {}
  ); // use with userSkills for live updating + pushing
  const [sidebarIsOpen, setSideBarIsOpen] = useState(true);
  const [activeSkillCard, setActiveSkillCard] = useState("");

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
    <SidebarProvider>
      <div className="flex min-h-screen">
        {sidebarIsOpen && (
          <AppSidebar
            userSkills={userSkills}
            setActiveSkillCard={setActiveSkillCard}
          />
        )}
        <main className="flex-1 p-6">
          <h1 className="text-2xl font-bold">Welcome, {userID}!</h1>
          {
            <div className="flex flex-wrap gap-4 mt-6">
              {
                activeSkillCard && (
                  <SkillCard
                    key={activeSkillCard}
                    skillName={activeSkillCard}
                    skillData={userSkills[activeSkillCard]}
                    updateSessionStats={updateSessionStats}
                  />
                )
                /* {Object.entries(userSkills).map(([skillName, skillData]) => (
              <div key={skillName} className="p-4">
                <SkillCard
                  key={skillName}
                  skillName={skillName}
                  skillData={skillData}
                  updateSessionStats={updateSessionStats}
                />
              </div>
            ))} */
              }
            </div>
          }
        </main>
      </div>
    </SidebarProvider>
  );
}

export default Dashboard;
