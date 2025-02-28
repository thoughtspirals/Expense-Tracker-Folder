import React from "react";
import { Link } from "react-router-dom";
import "../../Styles/global.css";
import "../../Styles/Components/Reusables/header.css";

const Header = () => {
  return (
    <header className="custom-header">
      <Link className="links text-white text-lg font-bold" to="/">
        <h1 className="title">Expense Tracker</h1>
      </Link>
    </header>
  );
};

export default Header;
