import axios from "axios";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { baseUrl } from "../../axios";
import { useNavigate } from "react-router-dom";
import IAddSkillForm from "../../interfaces/form/IAddSkillForm";

type SkillInputs = {
  name: string;
};

const AddSkill = ({ setNeedUpdateAfterCreation }: IAddSkillForm) => {
  const [postError, setPostError] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SkillInputs>();
  let navigate = useNavigate();

  const onSubmit: SubmitHandler<SkillInputs> = async (data) => {
    try {
      await axios.post(`${baseUrl}/skills`, {
        name: data,
      });
      setPostError(false);
      reset();
      setNeedUpdateAfterCreation(true);
      navigate("/");
    } catch (error) {
      setPostError(true);
    }
  };

  return (
    <div className="formWrapper">
      <h3>Create New Skill</h3>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <label className="label" htmlFor="name">
          Skill name:
        </label>
        <input className="input" {...register("name", { required: true })} />
        <br />
        {Object.keys(errors).length !== 0 && (
          <span className="error">This field is required</span>
        )}
        {postError && (
          <span className="error">
            An error occured while sending the data to the server.
          </span>
        )}
        <button type="submit" className="button button-right">
          Create New Skill
        </button>
      </form>
    </div>
  );
};

export default AddSkill;
