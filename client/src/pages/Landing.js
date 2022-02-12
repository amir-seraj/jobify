import React from "react";
import logo from "../assets/images/logo.svg";
import { Link } from "react-router-dom";
function Landing() {
  return (
    <Link to="/register" className="btn btn-hero">
      Login / Register
    </Link>
  );
}

export default Landing;
