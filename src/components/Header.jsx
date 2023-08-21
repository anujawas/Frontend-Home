import React from 'react';
import './Header.css'; // You can create your own CSS file for styling
import logo from "./favicon-3.png"
const Header = ({ showCode, setShowCode }) => {
  const transition = () => {
    if (showCode) {
      setShowCode(false);
    } else {
      setShowCode(true);
    }
  }
  return (
    <header className="app-header">
      <div className="app-logo">
        <img src={logo} alt="Logo" />
        <span>Editor</span>
      </div>
      <div className="app-actions">
        <button className='action-button' onClick={transition} style={{ color: "white" }}>{showCode ? "Go Back to Layout" : "</>"}</button>
        <button className="action-button">Save</button>
        <button className="action-button">Preview</button>
        <button className="action-button">Export</button>
      </div>
    </header>
  );
};

export default Header;
