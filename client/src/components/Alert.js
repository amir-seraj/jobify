import React from "react";
import { useAppContext } from "../context/appContext";

export default function Alert() {
  const { alertText, alertType } = useAppContext();

  return <div className={`alert alert-${alertType}`}>{alertText}</div>;
}
