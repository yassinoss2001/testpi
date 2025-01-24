import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h1>hospital management system</h1>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/" className="nav-link">liste des patients</Link>
        </li>
        <li>
          <Link to="/ListCategories" className="nav-link">liste des categories</Link>
        </li>
        <li>
          <Link to="/AddPatient" className="nav-link">ajouter patient</Link>
        </li>
        <li>
          <Link to="/AddCategory" className="nav-link">ajouter categorie</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
