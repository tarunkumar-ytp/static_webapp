import React, { useState } from "react";
import "./Header.css";
import logo from "../../Assets/Images/logo.png";
import { useNavigate, Link } from "react-router-dom";
import { NavLink } from 'react-router-dom'
import Hamburger from 'hamburger-react'
const pages = ['Etl', 'Datalibrary', 'ContractTracker', 'SourcingCalculator', 'BuyingPerformance'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
const Header = (props) => {
  const navigate = useNavigate();
  const [showNavbar, setShowNavbar] = useState(false)
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar)
  }
  const logout = () => {
    navigate("/");
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  return (
    <nav className="navbar">
      <div className="header-container">
        <Link as={Link} to="/Etl">
          <div className="logo">
            <img src={logo} className="logo" alt="logo" />
          </div>
        </Link>

        <div className="menu-icon" onClick={handleShowNavbar}>
          <Hamburger />
        </div>
        <div className={`nav-elements  ${showNavbar && 'active'}`}>
          <ul>
            <li>
              <NavLink to="/DataLibrary">Data Library</NavLink>
            </li>
            <li>
              <NavLink to="/ContractTracker">Contract Tracker</NavLink>
            </li>
            <li>
              <NavLink to="/SourcingCalculator">Sourcing Calculator</NavLink>
            </li>
            <li>
              <NavLink to="/BuyingPerformance">Buying Performance</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Header;
