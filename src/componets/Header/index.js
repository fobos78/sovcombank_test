import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';

import ThemeContext from '../../context';
import './Header.css';

function Header() {
  const history = useHistory();
  const { focus } = useContext(ThemeContext);
  console.log('history>>>>>>>>>>>', history.location.pathname);
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
