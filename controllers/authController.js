const register = async (req, res) => {
  try {
    await res.send("register");
  } catch (error) {
    console.log(error);
  }
};
const login = async (req, res) => {
  try {
    await res.send("login");
  } catch (error) {
    console.log(error);
  }
};
const updateUser = async (req, res) => {
  try {
    await res.send("updateUser");
  } catch (error) {
    console.log(error);
  }
};
export { register, login, updateUser };
