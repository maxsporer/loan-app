import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className="text-xl text-tertiary px-6 py-4 border-b-2 border-tertiary">
      <Link to="/">
        Loan Amortization App | Greystone Labs
      </Link>
    </div>
  )
}

export default Header;
