const createJob = async (req, res) => {
  try {
    await res.send("createJob");
  } catch (error) {
    console.log(error);
  }
};
const deleteJob = async (req, res) => {
  try {
    await res.send("deleteJob");
  } catch (error) {
    console.log(error);
  }
};
const getAllJobs = async (req, res) => {
  try {
    await res.send("getAllJobs");
  } catch (error) {
    console.log(error);
  }
};
const updateJob = async (req, res) => {
  try {
    await res.send("updateJob");
  } catch (error) {
    console.log(error);
  }
};
const showStats = async (req, res) => {
  try {
    await res.send("showStats");
  } catch (error) {
    console.log(error);
  }
};
export { createJob, deleteJob, getAllJobs, updateJob, showStats };
