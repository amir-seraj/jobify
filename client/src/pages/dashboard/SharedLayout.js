import React from "react";
import Wrapper from "../../assets/wrappers/SharedLayout";
import { Outlet, Link } from "react-router-dom";
import { AllJobs } from "./index";
function SharedLayout() {
  return (
    <Wrapper>
      <nav>
        <Link to="add-job">AddJobs</Link>
        <Link to="all-jobs">all jobs</Link>
      </nav>
      <Outlet />
    </Wrapper>
  );
}

export default SharedLayout;
