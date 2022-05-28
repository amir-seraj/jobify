import React from "react";
import Wrapper from "../../assets/wrappers/SharedLayout";
import { Outlet, Link } from "react-router-dom";
import { AllJobs } from "./index";
import { SmallSidebar, BigSidebar, Navbar } from "./../../components";
function SharedLayout() {
  return (
    <Wrapper>
      <main className="dashboard">
        <SmallSidebar />
        <BigSidebar />
        <div>
          <Navbar />
          <div className="dashboard-page">
            <Outlet />
          </div>
        </div>
      </main>
    </Wrapper>
  );
}

export default SharedLayout;
