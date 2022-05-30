import React from "react";
import { NavLink } from "react-router-dom";
import Links from "../utils/Links";

function NavLinks({ toggleSidebar }) {
  return (
    <div className="nav-links">
      {Links.map((link) => (
        <NavLink
          to={link.path}
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
          key={link.id}
          onClick={toggleSidebar}
        >
          <span className="icon">{link.icon}</span>
          {link.text}
        </NavLink>
      ))}
    </div>
  );
}

export default NavLinks;
