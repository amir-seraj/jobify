import React, { useState, useEffect } from "react";
import { Alert, Logo, FormRow } from "../components/index";
import Wrapper from "../assets/wrappers/RegisterPage";
import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";
const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};

export default function Register() {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialState);
  const { user, isLoading, showAlert, displayAlert, setupUser } =
    useAppContext();
  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      displayAlert();
      return;
    }
    const currentUser = { name, email, password };
    if (isMember) {
      setupUser({ currentUser, endPoint: "login", alertText: "Logged in!" });
    } else {
      setupUser({
        currentUser,
        endPoint: "register",
        alertText: "Registered!",
      });
    }
  };
  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/stats");
      }, 3000);
    }
  }, [user, navigate]);
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h3> {values.isMember ? "Login" : "Register"}</h3>

        {showAlert && <Alert />}
        {/* name input */}
        {!values.isMember && (
          <FormRow
            name="name"
            type="text"
            handleChange={handleChange}
            value={values.name}
          />
        )}
        {/* email input */}
        <FormRow
          name="email"
          type="text"
          handleChange={handleChange}
          value={values.email}
        />
        {/* password input */}
        <FormRow
          name="password"
          type="password"
          handleChange={handleChange}
          value={values.password}
        />
        <button type="submit" className="btn btn-block" disabled={isLoading}>
          Submit
        </button>
        <p>
          {values.isMember ? "Not a member yet ?" : "Already a member ?"}

          <button
            className="btn member-btn"
            onClick={toggleMember}
            type="button"
          >
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
}
