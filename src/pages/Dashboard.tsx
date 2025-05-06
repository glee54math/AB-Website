import SkillCard from "./SkillCard";
import { skills } from "../components/User";

const styles = {
  dashboard: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    // gap: "20px", // This creates a gap betwen each grid within the column
    // padding: "20px", // This creates a 20px white border around all sides.
  },
};

function Dashboard() {
  console.log(skills);
  return (
    <div style={styles.dashboard}>
      {skills.map((element, index) => (
        <div key={index}>
          <SkillCard skillName={element.name} />
          <p>{element.name}</p>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
