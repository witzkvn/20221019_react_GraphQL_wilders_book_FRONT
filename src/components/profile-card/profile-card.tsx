import axios from "axios";
import { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import image from "../../assets/profile.png";
import { baseUrl } from "../../axios";
import Skill from "../skill/skill";
import styles from "./profile-card.module.css";
import IProfileCard from "../../interfaces/wilder/IProfileCard";

const ProfileCard = ({
  id,
  name,
  city,
  description,
  avatar,
  wilderObj,
  grades,
  setNeedUpdateAfterCreation,
  setWilderToEdit,
}: IProfileCard) => {
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [wilderNameToDelete, setWilderNameToDelete] = useState("");
  let navigate = useNavigate();

  const handleSelectDelete = () => {
    setWilderNameToDelete(name);
    setDeleteConfirmOpen(true);
  };

  const deleteConfirmation = async () => {
    await axios.delete(`${baseUrl}/wilders/${id}`);
    setDeleteConfirmOpen(false);
    setNeedUpdateAfterCreation(true);
  };

  const cancelDelete = () => {
    setDeleteConfirmOpen(false);
    setWilderNameToDelete("");
  };

  const handleSelectEdit = () => {
    setWilderToEdit(wilderObj);
    navigate("/update-wilder");
  };

  return (
    <>
      {deleteConfirmOpen && (
        <div className={styles.overlay}>
          <div className={styles.popup}>
            <h2>
              Are you sure you want to delete the wilder {wilderNameToDelete} ?
            </h2>
            <div className={styles.actionButtonsWrapper}>
              <button className="button cancelBtn" onClick={cancelDelete}>
                Cancel
              </button>
              <button
                className={`button ${styles.deleteBtn}`}
                onClick={deleteConfirmation}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      <article className={styles.card}>
        <img
          className={styles.profileImage}
          src={avatar ? avatar : image}
          alt={name + " Profile"}
        />
        <h3>{name || "Wilder"}</h3>
        <p className={styles.city}>{city || "No city specified."}</p>
        <p>{description || "No description yet."}</p>
        <h4>Wild Skills</h4>
        <ul className={styles.skills}>
          {grades && grades.length > 0
            ? grades.map((grade, index) => (
                <Skill
                  key={index}
                  skillId={grade.skillId}
                  name={grade.name}
                  grades={grade.grades}
                />
              ))
            : "No grades yet"}
        </ul>
        <div
          className={`${styles.profileCardButtonsWrapper} button-wrapper-center`}
        >
          <button className="button" onClick={handleSelectEdit}>
            Edit
          </button>
          <button
            className={`${styles.deleteBtn} button`}
            onClick={handleSelectDelete}
          >
            Delete
          </button>
        </div>
      </article>
    </>
  );
};

ProfileCard.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  description: PropTypes.string,
  city: PropTypes.string,
  wilderSkills: PropTypes.array,
  setNeedUpdateAfterCreation: PropTypes.func,
};

export default ProfileCard;
