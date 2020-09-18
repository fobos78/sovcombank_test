import React from 'react';
import { Link } from 'react-router-dom';

import './Header.css';

function Header() {
  return (
    <>
      <div className="Header">
        <Link to="/">WordKeeper</Link>
        <Link to="/star">StarWords</Link>
      </div>
    </>
  );
}

export default Header;
