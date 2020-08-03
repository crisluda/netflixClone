import "./nav.css";
import logo from "./logo.png";
import icon from "./icon1.png";

import React, { useState, useEffect } from "react";

function Nav() {
  const [show, handleShow] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else {
        handleShow(false);
      }
    });
    return () => {
      window.removeEventListener("scroll");
    };
  }, []);
  return (
    <div className={`nav ${show && "nav_black"}`}>
      <div className="nav_logo">
        <img className="nav_logo" src={logo} alt="logo" />
      </div>
      <div className="nav_icon">
        <img className="nav_icon" src={icon} alt="icon" />
      </div>
    </div>
  );
}

export default Nav;
