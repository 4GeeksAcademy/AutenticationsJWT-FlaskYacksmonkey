import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../index.css";

export const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        ORBIT
      </Link>
      <div className="navbar-links">
        <Link to="/auth" className={location.pathname === "/auth" ? "active" : ""}>Login / Register</Link>
      </div>
    </nav>
  );
};
