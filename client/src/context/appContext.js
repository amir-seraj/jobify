import React, { useContext, useReducer } from "react";
import reducer from "./reducer";
import { DISPLAY_ALERT } from "./action";

const initialState = {
  showAlert: false,
  isLoading: false,
  alertText: "",
  alertType: "",
};
const AppContext = React.createContext();

export function AppProvider({ children }) {
  const [state, dispacth] = useReducer(reducer, initialState);
  const displayAlert = () => {
    dispacth({ type: DISPLAY_ALERT });
  };
  return (
    <AppContext.Provider value={{ ...state }}>{children}</AppContext.Provider>
  );
}

export const useAppContext = () => {
  return useContext(AppContext);
};
