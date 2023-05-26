import React from 'react';
import NavItem from './NavItem';

function Nav() {
  return (
    <div className="flex text-base">
      <NavItem verb="Create User" link="/create-user" />
      <NavItem verb="Create Loan" link="/create-loan" />
      <NavItem verb="Get User Loans" link="/fetch-user" />
      <NavItem verb="Get Loan Data" link="/fetch-loan" />
      <NavItem verb="Share Loan" link="/share-loan" />
    </div>
  )
}

export default Nav;
