import React from "react";
import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/ErrorPage";
import img from "../assets/images/not-found.svg";

export default function Error() {
  return (
    <Wrapper>
      <div>
        <img src={img} alt="not-found" />
        <Link to="/">Go To Dashboard</Link>
      </div>
    </Wrapper>
  );
}
