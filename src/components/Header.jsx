import React from 'react';
import './Header.css'; // You can create your own CSS file for styling
import { AiOutlineMenu } from 'react-icons/ai'
import { BsFillPlayFill } from 'react-icons/bs'
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
        <AiOutlineMenu />
        <span style={{ width: '10px' }}></span>
        <span>Design Board</span>
      </div>
      <div className="app-actions">
        <button className='action-button' onClick={transition}>{showCode ? "Go Back to Layout" : "</>"}</button>
        <button className="action-button"><BsFillPlayFill size={25} /><span>Preview</span></button>
      </div>
    </header>
  );
};

export default Header;
