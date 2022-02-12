import React, { useState, useEffect } from "react";
import { Alert, Logo, FormRow } from "../components/index";
import Wrapper from "../assets/wrappers/RegisterPage";

const initialState = {
  name: "",
  password: "",
  email: "",
  isMember: false,
  showAlert: true,
};

export default function Register() {
  const [values, setValues] = useState(initialState);
  const onSubmit = (e) => {
    e.preventDefault();
  };
  const handleChange = (e) => {
    console.log(e);
  };
  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h3>Login</h3>
        {values.showAlert && <Alert />}
        {/* name input */}
        <FormRow
          name="name"
          labelText="Name"
          type="text"
          handleChange={handleChange}
          value={values.name}
        />
        {/* email input */}
        <FormRow
          name="email"
          labelText="Email"
          type="text"
          handleChange={handleChange}
          value={values.email}
        />
        {/* password input */}
        <FormRow
          name="password"
          labelText="Password"
          type="password"
          handleChange={handleChange}
          value={values.password}
        />
        <button type="submit" className="btn btn-block">
          Submit
        </button>
      </form>
    </Wrapper>
  );
}
