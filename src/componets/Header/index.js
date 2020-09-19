import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import ThemeContext from '../../context';
import './Header.css';

function Header() {
  const { focus } = useContext(ThemeContext);
  return (
    <>
      <div className="Header">
        <Link to="/" className={focus && 'focus'}>WordKeeper</Link>
        <Link to="/star" className={!focus && 'focus'}>StarWords</Link>
      </div>
    </>
  );
}

export default Header;
