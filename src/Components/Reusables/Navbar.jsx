import React from "react";
import Sidebar from "./sidebar";

const Navbar = () => {
  return (
    <>
      <ul className="nav nav-tabs d-flex justify-content-between align-items-center">
        {/* Left Nav Items */}
        <div className="left-nav d-flex align-items-center">
          <Sidebar />
          <li className="nav-item mx-4">
            <a className="link active" aria-current="page" href="/dashboard">
              Dashboard
            </a>
          </li>
          <li className="nav-item mx-4">
            <a className="link" href="/home">
              Home
            </a>
          </li>
          <li className="nav-item mx-4">
            <a className="link" href="/about">
              About Us
            </a>
          </li>
          <li className="nav-item mx-4">
            <a className="link" href="/blogs">
              Blogs
            </a>
          </li>
        </div>

        {/* Right Nav Items */}
        <div className="right-nav d-flex align-items-center">
          <li className="nav-item mx-4">
            <a className="link" href="/profile">
              <i className="bi bi-person-circle fs-4"></i>
            </a>
          </li>
        </div>
      </ul>
    </>
  );
};

export default Navbar;
