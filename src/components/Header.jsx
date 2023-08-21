import React from 'react';
import './Header.css'; // You can create your own CSS file for styling
import logo from "./favicon-3.png"
const Header = () => {
  return (
    <header className="app-header">
      <div className="app-logo">
        <img src={logo} alt="Logo" />
        <span>Editor</span>
      </div>
      <div className="app-actions">
        <button className='action-button' style={{ backgroundColor: "black", color: "white" }}>{"</>"}</button>
        <button className="action-button">Save</button>
        <button className="action-button">Preview</button>
        <button className="action-button">Export</button>
      </div>
    </header>
  );
};

export default Header;