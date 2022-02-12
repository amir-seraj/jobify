import React, { useState, useEffect } from "react";
import { Alert, Logo, FormRow } from "../components/index";
import Wrapper from "../assets/wrappers/RegisterPage";
import { useAppContext } from "../context/appContext";

const initialState = {
  name: "",
  password: "",
  email: "",
  isMember: false,
};

export default function Register() {
  const [values, setValues] = useState(initialState);
  const { isLoading, showAlert } = useAppContext();
  const onSubmit = (e) => {
    e.preventDefault();
  };
  const handleChange = (e) => {
    console.log(e);
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
        <button type="submit" className="btn btn-block">
          Submit
        </button>
      </form>
      <p>
        {values.isMember ? "Not a member yet ?" : "Already a member ?"}

        <button className="btn member-btn" onClick={toggleMember} type="button">
          {values.isMember ? "Register" : "Login"}
        </button>
      </p>
    </Wrapper>
  );
}
