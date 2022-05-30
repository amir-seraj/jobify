import React from "react";
import { NavLink } from "react-router-dom";
import Wrapper from "../assets/wrappers/SmallSidebar";
import { FaTimes } from "react-icons/fa";
import { useAppContext } from "../context/appContext";
import Links from "../utils/Links";
import Logo from "./Logo";

export default function SmallSidebar() {
  const { toggleSidebar, showSidebar } = useAppContext();
  return (
    <Wrapper>
      <div
        className={
          showSidebar ? "sidebar-container show-sidebar" : "sidebar-container"
        }
      >
        <div className="content">
          <button className="close-btn" onClick={toggleSidebar}>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <div className="nav-links">
            {Links.map((link) => (
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                key={link.id}
              >
                <span className="icon">{link.icon}</span>
                {link.text}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
