import React from 'react';
import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import useViewport from '../utils/useViewport';

/**
 * Returns app header and navigation bar
 * @returns HTMLElement
 */
function Header() {
  var c = require('classnames');
  const { width } = useViewport();
  const isMdBp = width < 970;

  return (
    <div className={c({
      "text-xl text-tertiary px-6 py-4 border-b-2 border-tertiary flex justify-between": true,
      "flex-col": isMdBp,
    })}>
      <Link to="/">
        Loan Amortization App | Greystone Labs
      </Link>
      <Nav />
    </div>
  )
}

export default Header;
