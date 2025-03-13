import React, { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { FaUserShield } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import "./Navbar.css";

const Navbar = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleAdminClick = () => setShowLoginModal(true);

  const handleLogin = () => {
    if (credentials.username === "admin" && credentials.password === "admin123") {
      setShowLoginModal(false);
      setErrorMessage("");
      navigate("/admin");
    } else {
      setErrorMessage("Invalid username or password.");
    }
  };

  const handleModalClose = () => {
    setShowLoginModal(false);
    setCredentials({ username: "", password: "" });
    setErrorMessage("");
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const isHomePage = location.pathname === "/";

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <NavLink className="navbar-brand" to="/">
            DevIQ<span className="dot">.</span>
          </NavLink>
          <div className="nav-links">
            <span className="nav-link admin-link" onClick={handleAdminClick}>
              <FaUserShield /> Admin
            </span>
            <NavLink className="nav-link quiz-link" to="/quiz-stepper">
              Take Quiz
            </NavLink>
          </div>
        </div>
      </nav>
      {showLoginModal && isHomePage && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="modal-header">
              <h2>Admin Login</h2>
              <button className="close-btn" onClick={handleModalClose}>
                <MdClose />
              </button>
            </div>
            <div className="modal-body">
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                placeholder="Enter your username"
              />
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                placeholder="Enter your password"
              />
              {errorMessage && <p className="error-message">{errorMessage}</p>}
            </div>
            <div className="modal-footer">
              <button className="btn cancel" onClick={handleModalClose}>
                Cancel
              </button>
              <button className="btn login" onClick={handleLogin}>
                Login
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
