import PropTypes from "prop-types";
import styles from "./skill.module.css";
import ISkillWithGrade from "../../interfaces/skills/ISkillWithGrade";

const Skill = ({ skillId, name, grades }: ISkillWithGrade) => {
  return (
    <li className={styles.listItem}>
      {name || "No Skill Yet"}
      <span className={styles.grades}>{grades || 0}</span>
    </li>
  );
};

Skill.propTypes = {
  name: PropTypes.string,
  grades: PropTypes.number,
};

export default Skill;
