import React, { useEffect } from "react";
import { useAppContext } from "../context/appContext";
import Loading from "./Loading";
import Job from "./Job";
import Wrapper from "../assets/wrappers/JobsContainer";

function JobsContainer() {
  const { getJobs, jobs, isLoading, page, totalJobs } = useAppContext();
  useEffect(() => {
    getJobs();
  }, []);
  if (isLoading) {
    return <Loading center />;
  }
  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>There's no job to display...</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <h3>
        {totalJobs} job{jobs.length > 1 ? "s" : ""} found
      </h3>
      {jobs.map((job) => {
        return <Job key={job._id} {...job} />;
      })}
      {/* Pagination */}
    </Wrapper>
  );
}

export default JobsContainer;
