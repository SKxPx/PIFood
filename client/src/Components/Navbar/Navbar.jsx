import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  return (
    <nav>
    <div className="nav-cont">
      <div className="img-cont">
        <Link to="/">
          {" "}
          <img
            src="https://cdn.theorg.com/d3119e0e-8202-4034-85ce-d0356382515e_thumb.jpg"
            alt="logoHenry"
          />
        </Link>
      </div>
      <div className="link-cont">
        <Link className="nav-link" to="/home">
          Home
        </Link>
        <Link className="nav-link" to="/create">
          Create
        </Link>
      </div>
    </div>
    </nav>
  );
};

export default Navbar;
