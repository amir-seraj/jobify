import React, { useContext, useReducer } from "react";
import reducer from "./reducer";
import axios from "axios";
import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
} from "./action";

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");
const userLocation = localStorage.getItem("location");

const initialState = {
  showAlert: false,
  isLoading: false,
  alertText: "",
  alertType: "",
  user: user ? JSON.parse(user) : null,
  token: token,
  userLocation: userLocation || "",
  showSidebar: false,
};
const AppContext = React.createContext();

function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Alert
  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };

  // clear alert after 3s
  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };
  // Sidebar
  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };
  // User
  const addUserToLocalStorage = ({ user, token, location }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    localStorage.setItem("location", location);
  };
  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("location");
  };
  const setupUser = async ({ currentUser, endPoint, alertText }) => {
    dispatch({ type: SETUP_USER_BEGIN });
    try {
      const { data } = await axios.post(
        `/api/v1/auth/${endPoint}`,
        currentUser
      );

      const { user, token, location } = data;

      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user, token, location, alertText },
      });
      addUserToLocalStorage({ user, token, location });
    } catch (error) {
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };
  // Logout
  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
  };
  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        setupUser,
        toggleSidebar,
        logoutUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

const useAppContext = () => {
  return useContext(AppContext);
};
export { AppProvider, initialState, useAppContext };
